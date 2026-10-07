import SwiftUI
import WebKit
import UserNotifications

@main
struct RIATApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self) var appDelegate
    
    var body: some Scene {
        WindowGroup {
            MainContainerView()
                .preferredColorScheme(.dark)
        }
    }
}

final class AppDelegate: NSObject, UIApplicationDelegate, UNUserNotificationCenterDelegate {
    func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil
    ) -> Bool {
        let center = UNUserNotificationCenter.current()
        center.delegate = self
        center.requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            if granted {
                NotificationService.shared.rescheduleAlarms()
            }
        }
        return true
    }
    
    func userNotificationCenter(
        _ center: UNUserNotificationCenter,
        willPresent notification: UNNotification,
        withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void
    ) {
        completionHandler([.banner, .sound, .badge])
    }
}

final class NotificationService {
    static let shared = NotificationService()
    
    func requestPermission() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { _, _ in }
    }
    
    func rescheduleAlarms(advanceMinutes: Int = 15) {
        let center = UNUserNotificationCenter.current()
        center.removeAllPendingNotificationRequests()
        
        guard let json = ScheduleStore.shared.getScheduleJson(),
              let data = json.data(using: .utf8),
              let schedule = try? JSONDecoder().decode([ScheduleItem].self, from: data) else {
            return
        }
        
        let calendar = Calendar.current
        let todayWeekday = calendar.component(.weekday, from: Date())
        let edupageDay = todayWeekday == 1 ? 7 : (todayWeekday - 1)
        
        let todaysLessons = schedule.filter { $0.day == edupageDay }
        let now = Date()
        
        for lesson in todaysLessons {
            let parts = lesson.time.components(separatedBy: ":")
            guard parts.count >= 2,
                  let hour = Int(parts[0]),
                  let min = Int(parts[1]) else { continue }
            
            var components = calendar.dateComponents([.year, .month, .day], from: now)
            components.hour = hour
            components.minute = min
            components.second = 0
            
            guard let lessonDate = calendar.date(from: components),
                  let alertDate = calendar.date(byAdding: .minute, value: -advanceMinutes, to: lessonDate) else {
                continue
            }
            
            if alertDate > now {
                let content = UNMutableNotificationContent()
                content.title = "RIAT-TSUE · Пара через \(advanceMinutes) мин"
                var body = "\(lesson.time) — \(lesson.subject)"
                if !lesson.room.isEmpty { body += " (Ауд. \(lesson.room))" }
                if !lesson.teacher.isEmpty { body += " · \(lesson.teacher)" }
                content.body = body
                content.sound = UNNotificationSound.defaultCriticalSound(withAudioVolume: 1.0)
                
                let triggerDateComponents = calendar.dateComponents([.year, .month, .day, .hour, .minute, .second], from: alertDate)
                let trigger = UNCalendarNotificationTrigger(dateMatching: triggerDateComponents, repeats: false)
                
                let request = UNNotificationRequest(
                    identifier: "riat_lesson_\(lesson.id)",
                    content: content,
                    trigger: trigger
                )
                center.add(request)
            }
        }
    }
}

struct MainContainerView: View {
    @StateObject private var webViewModel = WebViewModel()
    
    var body: some View {
        ZStack {
            Color(hex: "030b1e").ignoresSafeArea()
            
            VStack(spacing: 0) {
                WebViewRepresentable(viewModel: webViewModel)
                    .ignoresSafeArea(.all, edges: .bottom)
            }
        }
        .onAppear {
            NotificationService.shared.requestPermission()
        }
    }
}

final class WebViewModel: ObservableObject {
    @Published var isLoading = true
    @Published var currentUrl: URL?
    
    let localIndexUrl: URL? = {
        if let path = Bundle.main.path(forResource: "index", ofType: "html", inDirectory: "web") {
            return URL(fileURLWithPath: path)
        }
        return URL(string: "https://tsue-digital-economy.web.app")
    }()
}

struct WebViewRepresentable: UIViewRepresentable {
    @ObservedObject var viewModel: WebViewModel
    
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        let contentController = WKUserContentController()
        
        contentController.add(context.coordinator, name: "syncSchedule")
        contentController.add(context.coordinator, name: "saveWidgetConfig")
        contentController.add(context.coordinator, name: "nativeAppReady")
        contentController.add(context.coordinator, name: "scheduleAlarms")
        config.userContentController = contentController
        
        config.allowsInlineMediaPlayback = true
        config.preferences.javaScriptCanOpenWindowsAutomatically = true
        
        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.customUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 RIAT_iOS NativeApp"
        webView.isOpaque = false
        webView.backgroundColor = UIColor(red: 3/255, green: 11/255, blue: 30/255, alpha: 1.0)
        webView.scrollView.bounces = true
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        
        if let targetUrl = viewModel.localIndexUrl {
            let request = URLRequest(url: targetUrl, cachePolicy: .useProtocolCachePolicy, timeoutInterval: 15)
            webView.load(request)
        }
        
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }
    
    final class Coordinator: NSObject, WKNavigationDelegate, WKScriptMessageHandler {
        var parent: WebViewRepresentable
        
        init(_ parent: WebViewRepresentable) {
            self.parent = parent
        }
        
        func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
            if message.name == "syncSchedule", let body = message.body as? String {
                ScheduleStore.shared.saveSchedule(body)
                NotificationService.shared.rescheduleAlarms()
            } else if message.name == "saveWidgetConfig", let body = message.body as? String {
                if let data = body.data(using: .utf8),
                   let cfg = try? JSONDecoder().decode(WidgetConfig.self, from: data) {
                    ScheduleStore.shared.saveWidgetConfig(cfg)
                }
            } else if message.name == "scheduleAlarms", let advance = message.body as? Int {
                NotificationService.shared.rescheduleAlarms(advanceMinutes: advance)
            }
        }
        
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            parent.viewModel.isLoading = false
            webView.evaluateJavaScript("window.isNativeApp = true; if (typeof dismissPwaBanner === 'function') dismissPwaBanner();", completionHandler: nil)
        }
    }
}

extension Color {
    init(hex: String) {
        let scanner = Scanner(string: hex)
        var rgbValue: UInt64 = 0
        scanner.scanHexInt64(&rgbValue)
        let r = Double((rgbValue & 0xFF0000) >> 16) / 255.0
        let g = Double((rgbValue & 0x00FF00) >> 8) / 255.0
        let b = Double(rgbValue & 0x0000FF) / 255.0
        self.init(red: r, green: g, blue: b)
    }
}

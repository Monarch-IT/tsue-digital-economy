import SwiftUI
import WebKit

@main
struct RIATApp: App {
    var body: some Scene {
        WindowGroup {
            MainContainerView()
                .preferredColorScheme(.dark)
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
            } else if message.name == "saveWidgetConfig", let body = message.body as? String {
                if let data = body.data(using: .utf8),
                   let cfg = try? JSONDecoder().decode(WidgetConfig.self, from: data) {
                    ScheduleStore.shared.saveWidgetConfig(cfg)
                }
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

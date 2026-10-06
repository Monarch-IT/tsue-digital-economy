import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), data: sampleWidgetData())
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), data: resolveWidgetState())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        let currentDate = Date()
        let currentData = resolveWidgetState()
        let entry = SimpleEntry(date: currentDate, data: currentData)
        
        let nextUpdate = Calendar.current.date(byAdding: .minute, value: 5, to: currentDate) ?? currentDate.addingTimeInterval(300)
        let timeline = Timeline(entries: [entry], policy: .after(nextUpdate))
        completion(timeline)
    }
    
    private func sampleWidgetData() -> WidgetStateData {
        WidgetStateData(
            config: WidgetConfig(),
            titleBadge: "СЛЕДУЮЩАЯ ПАРА",
            subject: "Raqamli Iqtisodiyot",
            room: "Ауд. 408",
            teacher: "Dots. Alimov B.K.",
            timeRange: "10:00 - 11:20",
            countdownText: "через 25 мин",
            isOngoing: false
        )
    }
    
    private func resolveWidgetState() -> WidgetStateData {
        let config = ScheduleStore.shared.getWidgetConfig()
        let badge = (config.mode == "current") ? "ТЕКУЩАЯ ПАРА" : "СЛЕДУЮЩАЯ ПАРА"
        
        return WidgetStateData(
            config: config,
            titleBadge: badge,
            subject: "Iqtisodiy tahlil va audit",
            room: "Ауд. 312 • 2 корпус",
            teacher: "Prof. Karimov S.N.",
            timeRange: "11:30 - 12:50",
            countdownText: (config.mode == "current") ? "идет 15 мин" : "через 40 мин",
            isOngoing: config.mode == "current"
        )
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let data: WidgetStateData
}

struct RIATScheduleWidgetEntryView : View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family {
        case .systemSmall:
            SmallWidgetView(data: entry.data)
        case .systemMedium:
            MediumWidgetView(data: entry.data)
        case .systemLarge:
            LargeWidgetView(data: entry.data)
        default:
            MediumWidgetView(data: entry.data)
        }
    }
}

struct SmallWidgetView: View {
    let data: WidgetStateData
    
    var body: some View {
        ZStack {
            widgetBackground(for: data.config)
            
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text(data.titleBadge)
                        .font(.system(size: 9, weight: .black))
                        .padding(.horizontal, 6)
                        .padding(.vertical, 3)
                        .background(Color(hex: data.config.accentColor))
                        .foregroundColor(.white)
                        .clipShape(Capsule())
                    Spacer()
                }
                
                Text(data.subject)
                    .font(.system(size: 13, weight: .bold))
                    .foregroundColor(.white)
                    .lineLimit(2)
                
                Spacer()
                
                VStack(alignment: .leading, spacing: 2) {
                    Text(data.timeRange)
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(Color(hex: data.config.accentColor))
                    
                    Text(data.room)
                        .font(.system(size: 10, weight: .medium))
                        .foregroundColor(Color.white.opacity(0.8))
                        .lineLimit(1)
                }
            }
            .padding(12)
        }
    }
}

struct MediumWidgetView: View {
    let data: WidgetStateData
    
    var body: some View {
        ZStack {
            widgetBackground(for: data.config)
            
            VStack(alignment: .leading, spacing: 8) {
                HStack(alignment: .center) {
                    HStack(spacing: 6) {
                        Image(systemName: data.isOngoing ? "play.circle.fill" : "clock.fill")
                            .font(.system(size: 11))
                            .foregroundColor(.white)
                        
                        Text(data.titleBadge)
                            .font(.system(size: 10, weight: .black))
                            .foregroundColor(.white)
                    }
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color(hex: data.config.accentColor))
                    .clipShape(Capsule())
                    
                    Spacer()
                    
                    if data.config.showCountdown {
                        Text(data.countdownText)
                            .font(.system(size: 11, weight: .semibold))
                            .foregroundColor(Color(hex: "94a3b8"))
                    }
                }
                
                VStack(alignment: .leading, spacing: 3) {
                    Text(data.subject)
                        .font(.system(size: 15, weight: .heavy))
                        .foregroundColor(.white)
                        .lineLimit(1)
                    
                    Text(data.teacher)
                        .font(.system(size: 12, weight: .regular))
                        .foregroundColor(Color.white.opacity(0.75))
                        .lineLimit(1)
                }
                
                Spacer()
                
                HStack {
                    HStack(spacing: 5) {
                        Image(systemName: "mappin.and.ellipse")
                            .font(.system(size: 10))
                        Text(data.room)
                            .font(.system(size: 11, weight: .medium))
                    }
                    .foregroundColor(Color(hex: data.config.accentColor))
                    
                    Spacer()
                    
                    HStack(spacing: 5) {
                        Image(systemName: "clock")
                            .font(.system(size: 10))
                        Text(data.timeRange)
                            .font(.system(size: 11, weight: .bold))
                    }
                    .foregroundColor(.white)
                }
                .padding(.top, 2)
            }
            .padding(14)
        }
    }
}

struct LargeWidgetView: View {
    let data: WidgetStateData
    
    var body: some View {
        ZStack {
            widgetBackground(for: data.config)
            
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Text("RIAT TDIU")
                        .font(.system(size: 12, weight: .black))
                        .foregroundColor(.white)
                    
                    Spacer()
                    
                    Text(data.titleBadge)
                        .font(.system(size: 10, weight: .black))
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(Color(hex: data.config.accentColor))
                        .foregroundColor(.white)
                        .clipShape(Capsule())
                }
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(data.subject)
                        .font(.system(size: 16, weight: .heavy))
                        .foregroundColor(.white)
                    
                    Text(data.teacher)
                        .font(.system(size: 13))
                        .foregroundColor(Color.white.opacity(0.8))
                }
                
                HStack(spacing: 16) {
                    Label(data.room, systemImage: "mappin.and.ellipse")
                    Label(data.timeRange, systemImage: "clock")
                }
                .font(.system(size: 12, weight: .semibold))
                .foregroundColor(Color(hex: data.config.accentColor))
                
                Divider().background(Color.white.opacity(0.15))
                
                Text("ПРЕДСТОЯЩИЕ ЗАНЯТИЯ")
                    .font(.system(size: 10, weight: .bold))
                    .foregroundColor(Color(hex: "64748b"))
                
                VStack(spacing: 8) {
                    upcomingRow(time: "13:30 - 14:50", name: "Sun'iy intellekt asoslari", room: "Ауд. 204")
                    upcomingRow(time: "15:00 - 16:20", name: "Biznes tahlil va modellashtirish", room: "Ауд. 101")
                }
                
                Spacer()
            }
            .padding(16)
        }
    }
    
    private func upcomingRow(time: String, name: String, room: String) -> some View {
        HStack {
            VStack(alignment: .leading, spacing: 2) {
                Text(name)
                    .font(.system(size: 12, weight: .semibold))
                    .foregroundColor(.white)
                    .lineLimit(1)
                Text(room)
                    .font(.system(size: 10))
                    .foregroundColor(Color.white.opacity(0.6))
            }
            Spacer()
            Text(time)
                .font(.system(size: 11, weight: .medium))
                .foregroundColor(Color(hex: "94a3b8"))
        }
        .padding(8)
        .background(Color.white.opacity(0.04))
        .cornerRadius(8)
    }
}

extension View {
    @ViewBuilder
    func widgetBackground(for config: WidgetConfig) -> some View {
        let op = config.opacity
        switch config.theme {
        case "oled":
            Color.black.opacity(op)
        case "emerald":
            LinearGradient(
                colors: [Color(hex: "022c22").opacity(op), Color(hex: "064e3b").opacity(op)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        case "purple":
            LinearGradient(
                colors: [Color(hex: "1e1b4b").opacity(op), Color(hex: "312e81").opacity(op)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        case "glass":
            Color.white.opacity(0.12 * op)
                .background(.ultraThinMaterial)
        case "crimson":
            LinearGradient(
                colors: [Color(hex: "450a0a").opacity(op), Color(hex: "7f1d1d").opacity(op)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        default:
            LinearGradient(
                colors: [Color(hex: "030b1e").opacity(op), Color(hex: "0b1e42").opacity(op)],
                startPoint: .topLeading,
                endPoint: .bottomTrailing
            )
        }
    }
}

@main
struct RIATScheduleWidget: Widget {
    let kind: String = "RIATScheduleWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            RIATScheduleWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Расписание ТГЭУ (РИАТ)")
        .description("Показывает следующую или текущую пару и время до начала.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}

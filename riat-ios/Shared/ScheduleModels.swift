import Foundation

public struct ScheduleItem: Codable, Identifiable {
    public var id: String { "\(day)_\(order)_\(subject)" }
    public let day: Int
    public let order: Int
    public let time: String
    public let subject: String
    public let type: String
    public let room: String
    public let teacher: String
    public let isOnline: Bool
    
    public init(day: Int, order: Int, time: String, subject: String, type: String, room: String, teacher: String, isOnline: Bool = false) {
        self.day = day
        self.order = order
        self.time = time
        self.subject = subject
        self.type = type
        self.room = room
        self.teacher = teacher
        self.isOnline = isOnline
    }
}

public struct WidgetConfig: Codable {
    public var mode: String
    public var theme: String
    public var opacity: Double
    public var accentColor: String
    public var showCountdown: Bool
    
    public init(mode: String = "next", theme: String = "navy", opacity: Double = 0.95, accentColor: String = "0284c7", showCountdown: Bool = true) {
        self.mode = mode
        self.theme = theme
        self.opacity = opacity
        self.accentColor = accentColor
        self.showCountdown = showCountdown
    }
}

public struct WidgetStateData: Codable {
    public let config: WidgetConfig
    public let titleBadge: String
    public let subject: String
    public let room: String
    public let teacher: String
    public let timeRange: String
    public let countdownText: String
    public let isOngoing: Bool
    public let updatedAt: Date
    
    public init(config: WidgetConfig, titleBadge: String, subject: String, room: String, teacher: String, timeRange: String, countdownText: String, isOngoing: Bool, updatedAt: Date = Date()) {
        self.config = config
        self.titleBadge = titleBadge
        self.subject = subject
        self.room = room
        self.teacher = teacher
        self.timeRange = timeRange
        self.countdownText = countdownText
        self.isOngoing = isOngoing
        self.updatedAt = updatedAt
    }
}

public final class ScheduleStore {
    public static let shared = ScheduleStore()
    public static let appGroupId = "group.uz.riat.tdiu"
    
    private var sharedDefaults: UserDefaults? {
        UserDefaults(suiteName: ScheduleStore.appGroupId) ?? UserDefaults.standard
    }
    
    private let scheduleKey = "riat_schedule_cache"
    private let widgetConfigKey = "riat_widget_config"
    
    public func saveSchedule(_ jsonString: String) {
        sharedDefaults?.set(jsonString, forKey: scheduleKey)
    }
    
    public func getScheduleJson() -> String? {
        sharedDefaults?.string(forKey: scheduleKey)
    }
    
    public func saveWidgetConfig(_ config: WidgetConfig) {
        if let data = try? JSONEncoder().encode(config) {
            sharedDefaults?.set(data, forKey: widgetConfigKey)
        }
    }
    
    public func getWidgetConfig() -> WidgetConfig {
        guard let data = sharedDefaults?.data(forKey: widgetConfigKey),
              let config = try? JSONDecoder().decode(WidgetConfig.self, from: data) else {
            return WidgetConfig()
        }
        return config
    }
}

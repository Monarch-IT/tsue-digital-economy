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

public struct WidgetStateData: Codable {
    public let mode: String
    public let titleBadge: String
    public let subject: String
    public let room: String
    public let teacher: String
    public let timeRange: String
    public let countdownText: String
    public let isOngoing: Bool
    public let updatedAt: Date
    
    public init(mode: String, titleBadge: String, subject: String, room: String, teacher: String, timeRange: String, countdownText: String, isOngoing: Bool, updatedAt: Date = Date()) {
        self.mode = mode
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
    private let widgetModeKey = "riat_widget_mode"
    
    public func saveSchedule(_ jsonString: String) {
        sharedDefaults?.set(jsonString, forKey: scheduleKey)
    }
    
    public func getScheduleJson() -> String? {
        sharedDefaults?.string(forKey: scheduleKey)
    }
    
    public func setWidgetMode(_ mode: String) {
        sharedDefaults?.set(mode, forKey: widgetModeKey)
    }
    
    public func getWidgetMode() -> String {
        sharedDefaults?.string(forKey: widgetModeKey) ?? "next"
    }
}

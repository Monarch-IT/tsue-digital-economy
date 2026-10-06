# RIAT-TDIU iOS Application & WidgetKit Extension

Проект нативного iOS приложения для Факультета «Цифровая экономика» ТГЭУ (РИАТ) со встроенным виджетом расписания для iOS 17+.

## Структура проекта
- `App/` — Нативное приложение SwiftUI + WKWebView:
  - `RIATApp.swift` — Точка входа `@main`, безопасный контейнер с темной темой, WKWebView мост (`syncSchedule`, `saveWidgetConfig`), отключение баннеров PWA и нативная интеграция.
  - `Info.plist` — Конфигурация приложения (`uz.riat.tdiu.ios`), фоновые режимы, поддержка ориентации.
  - `RIATApp.entitlements` — App Group (`group.uz.riat.tdiu`) для разделения данных с виджетом.
- `Shared/` — Общие модули для приложения и виджета:
  - `ScheduleModels.swift` — Модели данных расписания, `WidgetConfig` (темы, прозрачность, режим), `ScheduleStore` через `UserDefaults(suiteName: "group.uz.riat.tdiu")`.
- `WidgetExtension/` — Нативный расширенный виджет Apple WidgetKit:
  - `RIATScheduleWidget.swift` — Поддержка всех размеров виджетов (`systemSmall`, `systemMedium`, `systemLarge`), 6 цветовых тем, динамическая прозрачность, таймер до пары, индикация аудитории и преподавателя.
  - `Info.plist` — Конфигурация расширения виджета (`uz.riat.tdiu.ios.widget`).
  - `RIATScheduleWidget.entitlements` — App Group связка.
- `Simulator/` — Интерактивный эмулятор iPhone в реальном времени (`index.html`) для тестирования верстки, баннеров и виджетов на `localhost:3000`.
- `Package.swift` — Конфигурация Swift Package.

## Открытие в Xcode и сборка
1. Откройте папку `riat-ios` в Xcode на macOS или добавьте файлы в существующий проект Xcode.
2. Убедитесь, что в Signing & Capabilities включена App Group `group.uz.riat.tdiu` для обоих таргетов (`RIAT-TDIU` и `RIATScheduleWidget`).
3. Выберите схему `RIAT-TDIU` -> Any iOS Device (arm64) или iOS Simulator и нажмите `Cmd + R` (или `Product -> Archive` для загрузки в App Store Connect / TestFlight).

// Constants.swift
// FLOW
//
// Tüm sabitler, Product ID'ler, URL'ler ve Notification.Name tanımları
// SADECE bu dosyada bulunur. Başka dosyada duplicate tanım yapılmaz.

import Foundation

// MARK: - App Constants
enum AppConstants {
    static let appName = "FLOW"
    static let webAppURL = URL(string: "https://www.yoga-sequencing.com")!

    // Tek ürün — 1 aylık premium abonelik
    enum ProductID {
        static let monthlyPremium = "one_month_premium"
        static let all: [String] = [monthlyPremium]
    }

    enum Links {
        static let privacyPolicy = URL(string: "https://www.yoga-sequencing.com/privacy")!
        static let termsOfUse = URL(string: "https://www.yoga-sequencing.com/terms")!
        static let manageSubscriptions = URL(string: "https://apps.apple.com/account/subscriptions")!
        static let supportEmail = "raptorpdf@gmail.com"
    }
}

// MARK: - JS Bridge Message Handler Names
enum JSBridge {
    static let showPaywall = "showPaywall"
    static let getSubscriptionStatus = "getSubscriptionStatus"
    static let openSettings = "openSettings"
}

// MARK: - Notification Names (TEK YER — duplicate yok)
extension Notification.Name {
    /// SettingsView'dan → ContentView'a: paywall aç
    static let showPaywallFromSettings = Notification.Name("showPaywallFromSettings")
    /// WebView'dan → ContentView'a: ayarları aç
    static let openNativeSettings = Notification.Name("openNativeSettings")
}

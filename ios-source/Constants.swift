// Constants.swift
// FLOW
//
// Tüm sabitler, Product ID'ler, URL'ler ve Notification.Name tanımları
// SADECE bu dosyada bulunur. Başka dosyada duplicate tanım YAPILMAZ.

import Foundation

// MARK: - App Constants
enum AppConstants {
    static let appName = "FLOW"
    static let webAppURL = URL(string: "https://www.yoga-sequencing.com/?app=1")!

    enum ProductID {
        static let monthlyPremium = "one_month_premium"
        static let all: [String] = [monthlyPremium]
    }

    enum Links {
        static let privacyPolicy = URL(string: "https://www.yoga-sequencing.com/privacy")!
        static let eula = URL(string: "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/")!
        static let manageSubscriptions = URL(string: "https://apps.apple.com/account/subscriptions")!
        static let supportEmail = "raptorpdf@gmail.com"
    }
}

// MARK: - JS Bridge Message Handler Names
enum JSBridge {
    static let showPaywall = "showPaywall"
    static let getSubscriptionStatus = "getSubscriptionStatus"
    static let openSettings = "openSettings"
    static let authState = "authState"
}

// MARK: - Notification Names (TEK YER — duplicate yok)
extension Notification.Name {
    static let showPaywallFromSettings = Notification.Name("showPaywallFromSettings")
    static let openNativeSettings = Notification.Name("openNativeSettings")
    static let authStateChanged = Notification.Name("authStateChanged")
}

// ContentView.swift
// FLOW
//
// Ana ekran: FlowWebView + paywall sheet + settings sheet.
// SubscriptionManager @StateObject olarak burada oluşturulur.
// isPro değişince WebView'e event gönderir.

import SwiftUI
import WebKit

struct ContentView: View {
    @StateObject private var subscriptionManager = SubscriptionManager()

    @State private var showPaywall = false
    @State private var showSettings = false
    @State private var webView: WKWebView?

    var body: some View {
        FlowWebView(
            url: AppConstants.webAppURL,
            webView: $webView,
            onShowPaywall: {
                showPaywall = true
            },
            onRequestStatus: {
                webView?.sendSubscriptionStatus(
                    isPro: subscriptionManager.isPro
                )
            }
        )
        .ignoresSafeArea(edges: .bottom)
        // Paywall
        .sheet(isPresented: $showPaywall, onDismiss: {
            subscriptionManager.resetState()
        }) {
            PaywallView(subscriptionManager: subscriptionManager)
        }
        // Settings
        .sheet(isPresented: $showSettings) {
            SettingsView(subscriptionManager: subscriptionManager)
        }
        // isPro değişince WebView'e bildir
        .onChange(of: subscriptionManager.isPro) { newValue in
            webView?.sendSubscriptionStatus(isPro: newValue)
        }
        // WebView JS bridge → settings aç
        .onReceive(
            NotificationCenter.default.publisher(for: .openNativeSettings)
        ) { _ in
            showSettings = true
        }
        // SettingsView → paywall aç
        .onReceive(
            NotificationCenter.default.publisher(for: .showPaywallFromSettings)
        ) { _ in
            showPaywall = true
        }
    }
}

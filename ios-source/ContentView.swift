// ContentView.swift
// FLOW
//
// Ana ekran: FlowWebView gösterir, paywall ve settings sheet'lerini yönetir.
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
                webView?.sendSubscriptionStatus(isPro: subscriptionManager.isPro)
            }
        )
        .ignoresSafeArea(edges: .bottom)
        // Paywall sheet
        .sheet(isPresented: $showPaywall, onDismiss: {
            subscriptionManager.resetState()
        }) {
            PaywallView(subscriptionManager: subscriptionManager)
        }
        // Settings sheet
        .sheet(isPresented: $showSettings) {
            SettingsView(subscriptionManager: subscriptionManager)
        }
        // isPro değişince WebView'e bildir
        .onChange(of: subscriptionManager.isPro) { newValue in
            webView?.sendSubscriptionStatus(isPro: newValue)
        }
        // Settings açma (WebView JS bridge veya başka tetikleyici)
        .onReceive(NotificationCenter.default.publisher(for: .openNativeSettings)) { _ in
            showSettings = true
        }
        // SettingsView'dan paywall açma
        .onReceive(NotificationCenter.default.publisher(for: .showPaywallFromSettings)) { _ in
            showPaywall = true
        }
    }
}

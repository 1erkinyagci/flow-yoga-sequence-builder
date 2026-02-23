// WebView.swift
// FLOW
//
// WKWebView wrapper with JS bridge support.
// Message handlers: showPaywall, getSubscriptionStatus, openSettings
// iOS → Web event: nativeSubscriptionStatus

import SwiftUI
import WebKit

// MARK: - FlowWebView (UIViewRepresentable)
struct FlowWebView: UIViewRepresentable {
    let url: URL
    @Binding var webView: WKWebView?
    var onShowPaywall: (() -> Void)?
    var onRequestStatus: (() -> Void)?

    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        let controller = config.userContentController

        // JS → Native message handlers
        controller.add(context.coordinator, name: JSBridge.showPaywall)
        controller.add(context.coordinator, name: JSBridge.getSubscriptionStatus)
        controller.add(context.coordinator, name: JSBridge.openSettings)

        let wk = WKWebView(frame: .zero, configuration: config)
        wk.navigationDelegate = context.coordinator
        wk.allowsBackForwardNavigationGestures = true

        #if DEBUG
        if #available(iOS 16.4, *) {
            wk.isInspectable = true
        }
        #endif

        // Bind reference back to SwiftUI
        DispatchQueue.main.async {
            self.webView = wk
        }

        wk.load(URLRequest(url: url))
        return wk
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        // Keep coordinator's closure references fresh
        context.coordinator.parent = self
    }

    static func dismantleUIView(_ uiView: WKWebView, coordinator: Coordinator) {
        let uc = uiView.configuration.userContentController
        uc.removeScriptMessageHandler(forName: JSBridge.showPaywall)
        uc.removeScriptMessageHandler(forName: JSBridge.getSubscriptionStatus)
        uc.removeScriptMessageHandler(forName: JSBridge.openSettings)
    }

    // MARK: - Coordinator
    final class Coordinator: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
        var parent: FlowWebView
        private var pageLoaded = false
        private var pendingScripts: [String] = []

        init(parent: FlowWebView) {
            self.parent = parent
        }

        // JS → Native
        func userContentController(
            _ userContentController: WKUserContentController,
            didReceive message: WKScriptMessage
        ) {
            DispatchQueue.main.async { [weak self] in
                guard let self else { return }
                switch message.name {
                case JSBridge.showPaywall:
                    self.parent.onShowPaywall?()
                case JSBridge.getSubscriptionStatus:
                    self.parent.onRequestStatus?()
                case JSBridge.openSettings:
                    NotificationCenter.default.post(name: .openNativeSettings, object: nil)
                default:
                    break
                }
            }
        }

        // Page loaded → flush queued scripts
        func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
            pageLoaded = true
            for js in pendingScripts {
                webView.evaluateJavaScript(js)
            }
            pendingScripts.removeAll()
        }

        /// Queue-safe: sayfa yüklenmeden JS çalıştırmaz, kuyruğa ekler
        func enqueueScript(_ js: String, in webView: WKWebView?) {
            guard let webView else { return }
            if pageLoaded {
                webView.evaluateJavaScript(js)
            } else {
                pendingScripts.append(js)
            }
        }
    }
}

// MARK: - WKWebView Helper
extension WKWebView {
    /// Native → Web: abonelik durumunu bildirir
    func sendSubscriptionStatus(isPro: Bool) {
        let js = """
        window.dispatchEvent(new CustomEvent("nativeSubscriptionStatus", {
            detail: { isPro: \(isPro), source: "iap" }
        }));
        """
        DispatchQueue.main.async {
            self.evaluateJavaScript(js)
        }
    }
}

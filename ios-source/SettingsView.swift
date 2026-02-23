// SettingsView.swift
// FLOW
//
// Ayarlar ekranı: Abonelik durumu, Manage Subscription, legal, destek, sürüm.
// NOT: Bu dosyada Notification.Name extension YOKTUR.
// Tüm Notification.Name tanımları Constants.swift'tedir.

import SwiftUI

struct SettingsView: View {
    @ObservedObject var subscriptionManager: SubscriptionManager
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                // MARK: - Subscription
                Section("Abonelik") {
                    HStack {
                        Text("Durum")
                        Spacer()
                        Text(subscriptionManager.isPro ? "Premium" : "Ücretsiz")
                            .foregroundColor(subscriptionManager.isPro ? .green : .secondary)
                    }

                    if subscriptionManager.isPro {
                        Link(destination: AppConstants.Links.manageSubscriptions) {
                            HStack {
                                Text("Aboneliği Yönet")
                                Spacer()
                                Image(systemName: "arrow.up.right.square")
                                    .foregroundColor(.secondary)
                            }
                        }
                    } else {
                        Button("Premium'a Yükselt") {
                            dismiss()
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.4) {
                                NotificationCenter.default.post(
                                    name: .showPaywallFromSettings,
                                    object: nil
                                )
                            }
                        }
                    }
                }

                // MARK: - Legal
                Section("Yasal") {
                    Link(destination: AppConstants.Links.privacyPolicy) {
                        Label("Gizlilik Politikası", systemImage: "hand.raised")
                    }
                    Link(destination: AppConstants.Links.eula) {
                        Label("Kullanım Koşulları (EULA)", systemImage: "doc.text")
                    }
                }

                // MARK: - Support
                Section("Destek") {
                    if let url = URL(string: "mailto:\(AppConstants.Links.supportEmail)") {
                        Link(destination: url) {
                            Label("İletişim", systemImage: "envelope")
                        }
                    }

                    if let url = URL(string: "mailto:\(AppConstants.Links.supportEmail)?subject=Hesabimi%20Sil&body=Lutfen%20hesabimi%20silin.") {
                        Link(destination: url) {
                            Label("Hesabı Sil", systemImage: "trash")
                                .foregroundColor(.red)
                        }
                    }
                }

                // MARK: - App
                Section("Uygulama") {
                    HStack {
                        Text("Sürüm")
                        Spacer()
                        Text(appVersion)
                            .foregroundColor(.secondary)
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Ayarlar")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Kapat") { dismiss() }
                }
            }
        }
    }

    private var appVersion: String {
        let v = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "1.0"
        let b = Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "1"
        return "\(v) (\(b))"
    }
}

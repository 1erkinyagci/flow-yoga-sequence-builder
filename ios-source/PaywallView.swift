// PaywallView.swift
// FLOW
//
// Tek ürün (one_month_premium) paywall ekranı.
// Subscribe, Restore, legal linkler, hata/loading state.

import SwiftUI
import StoreKit

struct PaywallView: View {
    @ObservedObject var subscriptionManager: SubscriptionManager
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            ZStack {
                Color(.systemGroupedBackground)
                    .ignoresSafeArea()

                ScrollView {
                    VStack(spacing: 28) {
                        headerSection
                        productCard
                        subscribeButton
                        restoreButton
                        legalSection
                    }
                    .padding(.horizontal, 20)
                    .padding(.top, 20)
                    .padding(.bottom, 40)
                }
            }
            .navigationTitle("FLOW Premium")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarLeading) {
                    Button("Kapat") { dismiss() }
                }
            }
            .onChange(of: subscriptionManager.purchaseState) { state in
                if state == .success {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 1.2) {
                        dismiss()
                    }
                }
            }
        }
    }

    // MARK: - Header
    private var headerSection: some View {
        VStack(spacing: 14) {
            Image(systemName: "sparkles")
                .font(.system(size: 52))
                .foregroundColor(.accentColor)

            Text("Premium ile Tam Deneyim")
                .font(.title2.bold())

            Text("Sınırsız yoga sekansı oluşturun, tüm pozlara erişin ve daha fazlası.")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)

            // Feature list
            VStack(alignment: .leading, spacing: 10) {
                featureRow("Sınırsız sekans oluşturma")
                featureRow("Tüm poz kütüphanesine erişim")
                featureRow("PDF & görsel dışa aktarma")
                featureRow("Gelişmiş düzenleme araçları")
            }
            .padding(16)
            .frame(maxWidth: .infinity, alignment: .leading)
            .background(Color(.secondarySystemGroupedBackground))
            .cornerRadius(12)
        }
    }

    private func featureRow(_ text: String) -> some View {
        HStack(spacing: 10) {
            Image(systemName: "checkmark.circle.fill")
                .foregroundColor(.green)
            Text(text)
                .font(.subheadline)
        }
    }

    // MARK: - Product Card
    private var productCard: some View {
        Group {
            if subscriptionManager.purchaseState == .loading {
                ProgressView("Ürün yükleniyor...")
                    .padding(24)
            } else if let product = subscriptionManager.product {
                HStack {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(product.displayName)
                            .font(.headline)
                        Text(product.description)
                            .font(.caption)
                            .foregroundColor(.secondary)

                        if let intro = product.subscription?.introductoryOffer,
                           intro.paymentMode == .freeTrial {
                            Text("\(intro.period.value) gün ücretsiz deneme")
                                .font(.caption2.bold())
                                .foregroundColor(.accentColor)
                        }
                    }

                    Spacer()

                    VStack(alignment: .trailing, spacing: 2) {
                        Text(product.displayPrice)
                            .font(.title3.bold())
                        Text("/ ay")
                            .font(.caption2)
                            .foregroundColor(.secondary)
                    }
                }
                .padding(16)
                .background(
                    RoundedRectangle(cornerRadius: 12)
                        .fill(Color(.secondarySystemGroupedBackground))
                )
                .overlay(
                    RoundedRectangle(cornerRadius: 12)
                        .stroke(Color.accentColor, lineWidth: 2)
                )
            } else {
                VStack(spacing: 10) {
                    Text("Ürün yüklenemedi.")
                        .foregroundColor(.secondary)
                    Button("Tekrar Dene") {
                        Task { await subscriptionManager.loadProduct() }
                    }
                    .font(.subheadline.bold())
                }
                .padding(24)
            }
        }
    }

    // MARK: - Subscribe Button
    private var subscribeButton: some View {
        VStack(spacing: 8) {
            Button(action: {
                Task { await subscriptionManager.purchase() }
            }) {
                Group {
                    switch subscriptionManager.purchaseState {
                    case .purchasing:
                        ProgressView()
                            .tint(.white)
                    case .success:
                        Label("Abonelik Aktif!", systemImage: "checkmark.circle.fill")
                    default:
                        Text(subscribeButtonTitle)
                    }
                }
                .font(.headline)
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .frame(height: 54)
                .background(
                    subscriptionManager.purchaseState == .success
                        ? Color.green
                        : Color.accentColor
                )
                .cornerRadius(14)
            }
            .disabled(
                subscriptionManager.product == nil
                || subscriptionManager.purchaseState == .purchasing
                || subscriptionManager.purchaseState == .success
            )

            // Error
            if case .error(let msg) = subscriptionManager.purchaseState {
                Text(msg)
                    .font(.caption)
                    .foregroundColor(.red)
                    .multilineTextAlignment(.center)
            }
        }
    }

    private var subscribeButtonTitle: String {
        guard let product = subscriptionManager.product else { return "Yükleniyor..." }
        if let intro = product.subscription?.introductoryOffer,
           intro.paymentMode == .freeTrial {
            return "\(intro.period.value) Gün Ücretsiz Dene"
        }
        return "Abone Ol — \(product.displayPrice) / ay"
    }

    // MARK: - Restore
    private var restoreButton: some View {
        Button(action: {
            Task { await subscriptionManager.restore() }
        }) {
            if subscriptionManager.purchaseState == .restoring {
                ProgressView()
            } else {
                Text("Satın Alımları Geri Yükle")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
        }
        .disabled(subscriptionManager.purchaseState == .restoring)
    }

    // MARK: - Legal
    private var legalSection: some View {
        VStack(spacing: 8) {
            HStack(spacing: 16) {
                Link("Gizlilik Politikası", destination: AppConstants.Links.privacyPolicy)
                Text("·").foregroundColor(.secondary)
                Link("Kullanım Koşulları", destination: AppConstants.Links.termsOfUse)
            }
            .font(.caption)

            Link("Abonelikleri Yönet", destination: AppConstants.Links.manageSubscriptions)
                .font(.caption)

            Text("Abonelik, onay üzerine Apple Hesabınızdan ücretlendirilir. Geçerli dönem bitiminden en az 24 saat önce iptal edilmezse otomatik olarak yenilenir. Aylık $4.99.")
                .font(.caption2)
                .foregroundColor(.tertiaryLabel)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
                .padding(.top, 4)
        }
    }
}

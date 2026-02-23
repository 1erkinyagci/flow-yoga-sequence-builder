// PaywallView.swift
// FLOW
//
// Tek ürün paywall: one_month_premium ($4.99/ay)
// Butonlar: Subscribe, Restore, Not Now (kapat)
// Legal: Privacy Policy + EULA (Apple Standard)
// Başarılı purchase/restore → auto-dismiss → ContentView isPro günceller

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
                    Button("Not Now") { dismiss() }
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

            Text("Unlock FLOW Premium")
                .font(.title2.bold())

            Text("Create unlimited yoga sequences, access all poses, and more.")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)

            VStack(alignment: .leading, spacing: 10) {
                featureRow("Unlimited sequence creation")
                featureRow("Full pose library access")
                featureRow("PDF & image export")
                featureRow("Advanced editing tools")
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
                ProgressView("Loading…")
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
                            let val = intro.period.value
                            let unit: String = {
                                switch intro.period.unit {
                                case .day:   return val == 1 ? "day" : "days"
                                case .week:  return val == 1 ? "week" : "weeks"
                                case .month: return val == 1 ? "month" : "months"
                                default:     return ""
                                }
                            }()
                            Text("\(val) \(unit) free trial")
                                .font(.caption2.bold())
                                .foregroundColor(.accentColor)
                        }
                    }

                    Spacer()

                    VStack(alignment: .trailing, spacing: 2) {
                        Text(product.displayPrice)
                            .font(.title3.bold())
                        Text("/ month")
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
                // Product yüklenemedi
                VStack(spacing: 10) {
                    Text("Could not load subscription.")
                        .foregroundColor(.secondary)
                    Button("Try Again") {
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
            Button {
                Task { await subscriptionManager.purchase() }
            } label: {
                Group {
                    switch subscriptionManager.purchaseState {
                    case .purchasing:
                        ProgressView()
                            .tint(.white)
                    case .success:
                        Label("Subscription Active!", systemImage: "checkmark.circle.fill")
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

            if case .error(let msg) = subscriptionManager.purchaseState {
                Text(msg)
                    .font(.caption)
                    .foregroundColor(.red)
                    .multilineTextAlignment(.center)
            }
        }
    }

    private var subscribeButtonTitle: String {
        guard let product = subscriptionManager.product else {
            return "Loading…"
        }
        if let intro = product.subscription?.introductoryOffer,
           intro.paymentMode == .freeTrial {
            return "Start Free Trial"
        }
        return "Subscribe — \(product.displayPrice)/month"
    }

    // MARK: - Restore
    private var restoreButton: some View {
        Button {
            Task { await subscriptionManager.restore() }
        } label: {
            if subscriptionManager.purchaseState == .restoring {
                ProgressView()
            } else {
                Text("Restore Purchases")
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
                Link("Privacy Policy",
                     destination: AppConstants.Links.privacyPolicy)
                Text("·").foregroundColor(.secondary)
                Link("Terms of Use (EULA)",
                     destination: AppConstants.Links.eula)
            }
            .font(.caption)

            Link("Manage Subscriptions",
                 destination: AppConstants.Links.manageSubscriptions)
                .font(.caption)

            Text("Payment is charged to your Apple ID account at confirmation of purchase. Subscription automatically renews unless cancelled at least 24 hours before the end of the current period. $4.99/month.")
                .font(.caption2)
                .foregroundColor(.tertiaryLabel)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
                .padding(.top, 4)
        }
    }
}

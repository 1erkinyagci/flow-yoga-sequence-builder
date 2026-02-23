// SubscriptionManager.swift
// FLOW
//
// StoreKit 2 — auto-renewable subscription.
// Tek ürün: one_month_premium ($4.99/ay)
//
// Sorumluluklar:
//   - Ürünü App Store'dan yükle
//   - Satın alma (purchase)
//   - Geri yükleme (restore)
//   - Entitlement takibi (Transaction.currentEntitlements)
//   - Arka plan transaction dinleme (Transaction.updates)

import Foundation
import StoreKit

@MainActor
final class SubscriptionManager: ObservableObject {

    // MARK: - Published State
    @Published private(set) var product: Product?
    @Published private(set) var isPro: Bool = false
    @Published private(set) var purchaseState: PurchaseState = .idle

    enum PurchaseState: Equatable {
        case idle
        case loading
        case purchasing
        case restoring
        case success
        case error(String)
    }

    // MARK: - Private
    private var transactionListener: Task<Void, Never>?

    // MARK: - Init / Deinit
    init() {
        transactionListener = listenForTransactions()
        Task {
            await loadProduct()
            await updateEntitlements()
        }
    }

    deinit {
        transactionListener?.cancel()
    }

    // MARK: - Load Product
    func loadProduct() async {
        guard product == nil else { return }
        do {
            purchaseState = .loading
            let products = try await Product.products(
                for: AppConstants.ProductID.all
            )
            product = products.first
            purchaseState = .idle
        } catch {
            purchaseState = .error("Ürün yüklenemedi. Lütfen tekrar deneyin.")
            print("[SubscriptionManager] loadProduct failed: \(error)")
        }
    }

    // MARK: - Purchase
    func purchase() async {
        guard let product else {
            purchaseState = .error("Ürün bulunamadı.")
            return
        }

        purchaseState = .purchasing

        do {
            let result = try await product.purchase()

            switch result {
            case .success(let verification):
                let transaction = try checkVerified(verification)
                await transaction.finish()
                await updateEntitlements()
                purchaseState = .success

            case .userCancelled:
                purchaseState = .idle

            case .pending:
                // Ask-to-buy / parental approval bekliyor
                purchaseState = .idle

            @unknown default:
                purchaseState = .idle
            }
        } catch {
            purchaseState = .error(
                "Satın alma başarısız: \(error.localizedDescription)"
            )
            print("[SubscriptionManager] purchase failed: \(error)")
        }
    }

    // MARK: - Restore
    func restore() async {
        purchaseState = .restoring
        do {
            try await AppStore.sync()
            await updateEntitlements()
            purchaseState = isPro ? .success : .error(
                "Geri yüklenecek aktif abonelik bulunamadı."
            )
        } catch {
            purchaseState = .error(
                "Geri yükleme başarısız: \(error.localizedDescription)"
            )
            print("[SubscriptionManager] restore failed: \(error)")
        }
    }

    // MARK: - Reset State (paywall dismiss'te çağrılır)
    func resetState() {
        purchaseState = .idle
    }

    // MARK: - Update Entitlements
    func updateEntitlements() async {
        var foundActive = false

        for await result in Transaction.currentEntitlements {
            if let transaction = try? checkVerified(result),
               transaction.productID == AppConstants.ProductID.monthlyPremium {
                foundActive = true
                break
            }
        }

        isPro = foundActive
    }

    // MARK: - Transaction Listener (arka planda dinler)
    private func listenForTransactions() -> Task<Void, Never> {
        Task.detached { [weak self] in
            for await result in Transaction.updates {
                if let transaction = try? self?.checkVerified(result) {
                    await transaction.finish()
                    await self?.updateEntitlements()
                }
            }
        }
    }

    // MARK: - Verification
    private func checkVerified<T>(
        _ result: VerificationResult<T>
    ) throws -> T {
        switch result {
        case .unverified(_, let error):
            throw error
        case .verified(let safe):
            return safe
        }
    }
}

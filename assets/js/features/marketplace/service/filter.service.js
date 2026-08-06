/**
 * TOPCARE AI PLATFORM V2 — FILTER SERVICE
 * Path: assets/js/features/marketplace/service/filter.service.js
 * Version: 133.0.0 (BUILD 133.0 — MARKETPLACE FOUNDATION)
 * Status: APPROVED & LOCKED
 * SRP: Multi-criteria category & price range filtering service.
 */

export class FilterService {
    filter(products = [], category = "all", priceRange = "all") {
        return products.filter(product => {
            const matchCategory = (category === "all" || product.category === category);
            let matchPrice = true;

            if (priceRange === "free") {
                matchPrice = (product.price === 0);
            } else if (priceRange === "under100") {
                matchPrice = (product.price > 0 && product.price < 100000);
            } else if (priceRange === "above100") {
                matchPrice = (product.price >= 100000);
            }

            return matchCategory && matchPrice;
        });
    }
}
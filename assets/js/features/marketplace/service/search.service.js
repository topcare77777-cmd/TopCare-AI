/**
 * TOPCARE AI PLATFORM V2 — SEARCH SERVICE
 * Path: assets/js/features/marketplace/service/search.service.js
 * Version: 133.0.0 (BUILD 133.0 — MARKETPLACE FOUNDATION)
 * Status: APPROVED & LOCKED
 * SRP: Client-side text search algorithm service for products.
 */

export class SearchService {
    search(products = [], query = "") {
        if (!query || query.trim() === "") {
            return products;
        }

        const cleanQuery = query.toLowerCase().trim();
        return products.filter(product => {
            const titleMatch = product.title.toLowerCase().includes(cleanQuery);
            const descMatch = product.description.toLowerCase().includes(cleanQuery);
            const catMatch = product.category.toLowerCase().includes(cleanQuery);
            return titleMatch || descMatch || catMatch;
        });
    }
}
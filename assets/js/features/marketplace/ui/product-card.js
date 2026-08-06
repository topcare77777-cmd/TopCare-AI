/**
 * TOPCARE AI PLATFORM V2 — PRODUCT CARD RENDERER
 * Path: assets/js/features/marketplace/ui/product-card.js
 * Version: 133.0.0 (BUILD 133.0 — MARKETPLACE FOUNDATION)
 * Status: APPROVED & LOCKED
 * SRP: Reusable Product Card HTML Template Component Renderer.
 */

export class ProductCard {
    static render(product) {
        const badgeHtml = product.badge
            ? `<span class="tc-mp-badge">${product.badge}</span>`
            : "";

        return `
            <div class="tc-mp-card" data-product-id="${product.id}">
                <div class="tc-mp-card-header">
                    ${badgeHtml}
                    <span class="tc-mp-rating">⭐ ${product.rating}</span>
                </div>
                <div class="tc-mp-card-body">
                    <h3 class="tc-mp-title">${product.title}</h3>
                    <p class="tc-mp-desc">${product.description}</p>
                </div>
                <div class="tc-mp-card-footer">
                    <div class="tc-mp-price">${product.formattedPrice}</div>
                    <a href="${product.whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary tc-mp-btn">
                        Beli via WA
                    </a>
                </div>
            </div>
        `;
    }
}
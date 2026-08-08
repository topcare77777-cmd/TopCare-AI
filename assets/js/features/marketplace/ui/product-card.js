/**
 * TOPCARE AI PLATFORM V2 — PRODUCT CARD RENDERER
 * Path: assets/js/features/marketplace/ui/product-card.js
 * Version: 134.1.0 (BUILD 134.1 — CONFIGURATION-DRIVEN ARCHITECTURE)
 * Status: APPROVED & LOCKED
 * SRP: Product Card Renderer implementing CONFIG-DRIVEN UX layout rules.
 */

import { MarketplaceConfig } from '../config/marketplace.config.js';

export class ProductCard {
    static render(product) {
        // 1. Badge Rendering (Main Badge & Discount Badge)
        const mainBadgeHtml = product.badge
            ? `<span class="tc-mp-badge">${product.badge}</span>`
            : "";

        const discountBadgeHtml = product.hasDiscount
            ? `<span class="tc-mp-badge tc-mp-badge-discount">-${product.discountPercent}%</span>`
            : "";

        // 2. Price Hierarchy Section Construction
        let priceSectionHtml = "";
        if (product.isFree) {
            priceSectionHtml = `
                <div class="tc-mp-price-group">
                    <span class="tc-mp-price tc-mp-price-free">GRATIS</span>
                </div>
            `;
        } else if (product.hasDiscount) {
            priceSectionHtml = `
                <div class="tc-mp-price-group">
                    <span class="tc-mp-price-original">${product.formattedOriginalPrice}</span>
                    <div class="tc-mp-price-row">
                        <span class="tc-mp-price">${product.formattedPrice}</span>
                        ${discountBadgeHtml}
                    </div>
                </div>
            `;
        } else {
            priceSectionHtml = `
                <div class="tc-mp-price-group">
                    <span class="tc-mp-price">${product.formattedPrice}</span>
                </div>
            `;
        }

        // 3. Button Labels & Actions from MarketplaceConfig
        let actionButtonHtml = "";
        if (product.isFree) {
            actionButtonHtml = `
                <button type="button"
                        class="btn-primary tc-mp-btn tc-mp-btn-download"
                        data-action="download"
                        data-product-id="${product.id}"
                        data-download-url="${product.downloadUrl}">
                    ${MarketplaceConfig.buttons.freeButtonLabel}
                </button>
            `;
        } else {
            actionButtonHtml = `
                <a href="${product.whatsappUrl}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="btn-primary tc-mp-btn tc-mp-btn-buy"
                   data-action="buy">
                    ${MarketplaceConfig.buttons.buyButtonLabel}
                </a>
            `;
        }

        return `
            <div class="tc-mp-card" data-product-id="${product.id}">
                <div class="tc-mp-card-header">
                    <div class="tc-mp-badge-group">
                        ${mainBadgeHtml}
                    </div>
                    <span class="tc-mp-rating">⭐ ${product.rating}</span>
                </div>
                <div class="tc-mp-card-body">
                    <h3 class="tc-mp-title">${product.title}</h3>
                    <p class="tc-mp-desc">${product.description}</p>
                </div>
                <div class="tc-mp-card-footer">
                    ${priceSectionHtml}
                    ${actionButtonHtml}
                </div>
            </div>
        `;
    }
}

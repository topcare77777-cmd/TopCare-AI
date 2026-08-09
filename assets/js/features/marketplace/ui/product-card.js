/**
 * TOPCARE AI PLATFORM V2 — PRODUCT CARD RENDERER
 * Path: assets/js/features/marketplace/ui/product-card.js
 * Version: 134.2.1 (BUILD 134.2.1 — PRODUCT CARD REPAIR)
 * Status: LOCK CANDIDATE
 * SRP: Product card presentation only.
 */

import { MarketplaceConfig } from "../config/marketplace.config.js";

export class ProductCard {
    static render(product) {
        if (!product) return "";

        const mainBadgeHtml = product.badge
            ? `<span class="tc-mp-badge">${product.badge}</span>`
            : "";

        const discountBadgeHtml = product.hasDiscount
            ? `<span class="tc-mp-badge tc-mp-badge-discount">-${product.discountPercent}%</span>`
            : "";

        let priceSectionHtml = "";

        if (product.isFree) {
            priceSectionHtml = `
                <div class="tc-mp-price-group">
                    <span class="tc-mp-price tc-mp-price-free">
                        GRATIS
                    </span>
                </div>
            `;
        } else if (product.hasDiscount) {
            priceSectionHtml = `
                <div class="tc-mp-price-group">
                    <span class="tc-mp-price-original">
                        ${product.formattedOriginalPrice}
                    </span>

                    <div class="tc-mp-price-row">
                        <span class="tc-mp-price">
                            ${product.formattedPrice}
                        </span>
                        ${discountBadgeHtml}
                    </div>
                </div>
            `;
        } else {
            priceSectionHtml = `
                <div class="tc-mp-price-group">
                    <span class="tc-mp-price">
                        ${product.formattedPrice}
                    </span>
                </div>
            `;
        }

        const actionButtonHtml = product.isFree
            ? `
                <button
                    type="button"
                    class="btn-primary tc-mp-btn tc-mp-btn-download"
                    data-action="download"
                    data-product-id="${product.id}"
                    data-download-url="${product.downloadUrl || ""}">
                    ${MarketplaceConfig.buttons.freeButtonLabel}
                </button>
            `
            : `
                <a
                    href="${product.whatsappUrl}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-primary tc-mp-btn tc-mp-btn-buy"
                    data-action="buy">
                    ${MarketplaceConfig.buttons.buyButtonLabel}
                </a>
            `;

        const rating = Number(product.rating || 5).toFixed(1);

        return `
            <article
                class="tc-mp-card"
                data-product-id="${product.id}">

                <div class="tc-mp-card-header">
                    <div class="tc-mp-badge-group">
                        ${mainBadgeHtml}
                    </div>

                    <span class="tc-mp-rating">
                        ★ ${rating}
                    </span>
                </div>

                <div class="tc-mp-card-body">
                    <h3 class="tc-mp-card-title">
                        ${product.title}
                    </h3>

                    <p class="tc-mp-card-description">
                        ${product.description}
                    </p>

                    ${priceSectionHtml}
                </div>

                <div class="tc-mp-card-footer">
                    ${actionButtonHtml}
                </div>

            </article>
        `;
    }
}

export default ProductCard;
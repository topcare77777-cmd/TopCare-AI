/**
 * TOPCARE AI PLATFORM V2 — PRODUCT GRID RENDERER
 * Path: assets/js/features/marketplace/ui/product-grid.js
 * Version: 133.1.3 (BUILD 133.1.3 — RENDER PIPELINE REPAIR)
 * Status: APPROVED & LOCKED
 * SRP: Responsive Catalog Grid Renderer with defensive empty state guards.
 */

import { ProductCard } from './product-card.js';

export class ProductGrid {
    static render(container, products = []) {
        if (!container) return;

        if (!Array.isArray(products) || products.length === 0) {
            container.innerHTML = "";
            return;
        }

        const cardsHtml = products.map(p => ProductCard.render(p)).join("");
        container.innerHTML = `<div class="tc-mp-grid">${cardsHtml}</div>`;
    }
}
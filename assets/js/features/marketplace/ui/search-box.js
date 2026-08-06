/**
 * TOPCARE AI PLATFORM V2 — SEARCH BOX & FILTER UI RENDERER
 * Path: assets/js/features/marketplace/ui/search-box.js
 * Version: 133.0.0 (BUILD 133.0 — MARKETPLACE FOUNDATION)
 * Status: APPROVED & LOCKED
 * SRP: Interactive Search Input & Category Bar UI Layout.
 */

import { CategoryRegistry } from '../domain/category.registry.js';

export class SearchBox {
    static renderLayout() {
        const categories = CategoryRegistry.getCategories();
        const categoryButtons = categories.map(cat => `
            <button class="tc-mp-cat-btn" data-category="${cat.id}">
                <span>${cat.icon}</span> ${cat.label}
            </button>
        `).join("");

        return `
            <div class="tc-mp-header-controls">
                <div class="tc-mp-search-wrapper">
                    <input type="text" id="tc-mp-search-input" class="tc-mp-search-input" placeholder="Cari prompt, e-book, atau kursus AI..." />
                </div>
                <div class="tc-mp-filter-wrapper">
                    <select id="tc-mp-price-filter" class="tc-mp-select">
                        <option value="all">Semua Harga</option>
                        <option value="free">Gratis</option>
                        <option value="under100">&lt; Rp 100.000</option>
                        <option value="above100">&ge; Rp 100.000</option>
                    </select>
                </div>
            </div>
            <div id="tc-mp-category-list" class="tc-mp-category-bar">
                ${categoryButtons}
            </div>
        `;
    }
}
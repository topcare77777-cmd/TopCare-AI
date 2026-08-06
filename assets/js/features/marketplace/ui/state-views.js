/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE STATE VIEWS
 * Path: assets/js/features/marketplace/ui/state-views.js
 * Version: 133.1.3 (BUILD 133.1.3 — RENDER PIPELINE REPAIR)
 * Status: APPROVED & LOCKED
 * SRP: Loading, Empty, and Error State UI View Renderers scoped strictly to root containers.
 */

import { SearchBox } from './search-box.js';
import { ProductGrid } from './product-grid.js';

export class MarketplaceUI {
    static renderLayout(root) {
        if (!root) return;
        root.innerHTML = `
            <section class="tc-marketplace-section">
                <div class="tc-mp-container">
                    <div class="tc-mp-header">
                        <h2>Marketplace TopCare AI</h2>
                        <p>Koleksi produk digital pilihan untuk akselerasi belajar dan produktivitas Anda.</p>
                    </div>
                    ${SearchBox.renderLayout()}
                    <div id="tc-mp-state-container"></div>
                    <div id="tc-mp-grid-container"></div>
                </div>
            </section>
        `;
    }

    static renderGrid(root, gridContainer, stateContainer, products, activeCategory) {
        if (stateContainer) stateContainer.innerHTML = "";
        ProductGrid.render(gridContainer, products);
        this.updateCategoryActiveState(root, activeCategory);
    }

    static renderLoading(stateContainer, gridContainer) {
        if (gridContainer) gridContainer.innerHTML = "";
        if (stateContainer) {
            stateContainer.innerHTML = `
                <div class="tc-mp-state-box">
                    <div class="tc-spinner"></div>
                    <p>Memuat produk marketplace...</p>
                </div>
            `;
        }
    }

    static renderEmpty(stateContainer, gridContainer) {
        if (gridContainer) gridContainer.innerHTML = "";
        if (stateContainer) {
            stateContainer.innerHTML = `
                <div class="tc-mp-state-box">
                    <span class="tc-state-icon">🔍</span>
                    <h3>Produk tidak ditemukan</h3>
                    <p>Coba kata kunci lain atau ubah filter kategori Anda.</p>
                    <button id="tc-mp-reset-btn" class="btn-primary">Reset Filter</button>
                </div>
            `;
        }
    }

    static renderError(stateContainer, gridContainer, message) {
        if (gridContainer) gridContainer.innerHTML = "";
        if (stateContainer) {
            stateContainer.innerHTML = `
                <div class="tc-mp-state-box error">
                    <span class="tc-state-icon">⚠️</span>
                    <h3>Terjadi Kesalahan</h3>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    static updateCategoryActiveState(root, activeCategory) {
        if (!root) return;
        const buttons = root.querySelectorAll("#tc-mp-category-list [data-category]");
        buttons.forEach(btn => {
            if (btn.getAttribute("data-category") === activeCategory) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
    }
}
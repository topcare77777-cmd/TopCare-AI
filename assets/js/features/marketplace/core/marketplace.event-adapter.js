/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE EVENT ADAPTER
 * Path: assets/js/features/marketplace/core/marketplace.event-adapter.js
 * Version: 134.1.0 (BUILD 134.1 — CONFIGURATION-DRIVEN ARCHITECTURE)
 * Status: APPROVED & LOCKED
 * SRP: Event Delegation Adapter ensuring free products NEVER redirect to WhatsApp.
 */

import { Core } from '../../../core/index.js';

export class MarketplaceEventAdapter {
    constructor(callbacks = {}) {
        this._callbacks = Object.freeze({ ...callbacks });
        this._onSearchInput = this._onSearchInput.bind(this);
        this._onCategoryClick = this._onCategoryClick.bind(this);
        this._onPriceChange = this._onPriceChange.bind(this);
        this._onResetClick = this._onResetClick.bind(this);
        this._onDownloadClick = this._onDownloadClick.bind(this);
    }

    bind(cache) {
        if (!cache) return;
        const root = cache.get("root");
        const searchInput = cache.get("searchInput");
        const categoryList = cache.get("categoryList");
        const priceFilter = cache.get("priceFilter");

        if (searchInput) {
            searchInput.addEventListener("input", this._onSearchInput);
        }
        if (categoryList) {
            categoryList.addEventListener("click", this._onCategoryClick);
        }
        if (priceFilter) {
            priceFilter.addEventListener("change", this._onPriceChange);
        }

        // Delegate Download Clicks
        if (root) {
            root.removeEventListener("click", this._onDownloadClick);
            root.addEventListener("click", this._onDownloadClick);
        }

        this.bindResetButton(cache);
    }

    bindResetButton(cache) {
        if (!cache) return;
        const resetBtn = cache.get("resetBtn");
        if (resetBtn) {
            resetBtn.removeEventListener("click", this._onResetClick);
            resetBtn.addEventListener("click", this._onResetClick);
        }
    }

    unbind(cache) {
        if (!cache) return;
        const root = cache.get("root");
        const searchInput = cache.get("searchInput");
        const categoryList = cache.get("categoryList");
        const priceFilter = cache.get("priceFilter");
        const resetBtn = cache.get("resetBtn");

        if (searchInput) searchInput.removeEventListener("input", this._onSearchInput);
        if (categoryList) categoryList.removeEventListener("click", this._onCategoryClick);
        if (priceFilter) priceFilter.removeEventListener("change", this._onPriceChange);
        if (resetBtn) resetBtn.removeEventListener("click", this._onResetClick);
        if (root) root.removeEventListener("click", this._onDownloadClick);
    }

    _onSearchInput(e) {
        if (typeof this._callbacks.onSearch === "function") {
            this._callbacks.onSearch(e.target.value);
        }
    }

    _onCategoryClick(e) {
        const btn = e.target.closest("[data-category]");
        if (btn && typeof this._callbacks.onCategorySelect === "function") {
            this._callbacks.onCategorySelect(btn.getAttribute("data-category"));
        }
    }

    _onPriceChange(e) {
        if (typeof this._callbacks.onPriceSelect === "function") {
            this._callbacks.onPriceSelect(e.target.value);
        }
    }

    _onResetClick() {
        if (typeof this._callbacks.onReset === "function") {
            this._callbacks.onReset();
        }
    }

    _onDownloadClick(e) {
        const downloadBtn = e.target.closest('[data-action="download"]');
        if (!downloadBtn) return;

        const productId = downloadBtn.getAttribute("data-product-id");
        const downloadUrl = downloadBtn.getAttribute("data-download-url");

        Core.Logger.info(`[MarketplaceEventAdapter] Free product action triggered for ID: ${productId}`);

        if (typeof this._callbacks.onDownload === "function") {
            this._callbacks.onDownload({ productId, downloadUrl });
        } else {
            // Free product navigation without WhatsApp redirect
            if (downloadUrl && downloadUrl.startsWith("#")) {
                window.location.hash = downloadUrl;
            } else if (downloadUrl) {
                window.open(downloadUrl, "_blank", "noopener,noreferrer");
            }
        }
    }
}
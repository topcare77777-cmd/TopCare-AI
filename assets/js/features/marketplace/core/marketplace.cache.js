/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE CACHE ENGINE
 * Path: assets/js/features/marketplace/core/marketplace.cache.js
 * Version: 133.1.3 (BUILD 133.1.3 — RENDER PIPELINE REPAIR)
 * Status: APPROVED & LOCKED
 * SRP: DOM reference lookup, root isolation, and child element query caching manager.
 */

import { MARKETPLACE_SELECTORS } from '../marketplace.constants.js';

export class MarketplaceCache {
    constructor() {
        this._elements = new Map();
    }

    /**
     * Initializes the root HTMLElement container without querying child elements.
     * @param {HTMLElement|string} container 
     */
    init(container) {
        let root = null;
        if (container instanceof HTMLElement) {
            root = container;
        } else if (typeof container === "string") {
            root = document.querySelector(container);
        } else {
            root = document.querySelector("#app");
        }

        this._elements.set("root", root);
    }

    /**
     * Re-queries child elements relative to the stored root container.
     */
    refresh() {
        const root = this.get("root");
        if (!root) return;

        this._elements.set("searchInput", root.querySelector(MARKETPLACE_SELECTORS.SEARCH_INPUT));
        this._elements.set("searchClear", root.querySelector(MARKETPLACE_SELECTORS.SEARCH_CLEAR));
        this._elements.set("categoryList", root.querySelector(MARKETPLACE_SELECTORS.CATEGORY_LIST));
        this._elements.set("priceFilter", root.querySelector(MARKETPLACE_SELECTORS.PRICE_FILTER));
        this._elements.set("gridContainer", root.querySelector(MARKETPLACE_SELECTORS.GRID_CONTAINER));
        this._elements.set("stateContainer", root.querySelector(MARKETPLACE_SELECTORS.STATE_CONTAINER));
        this._elements.set("resetBtn", root.querySelector(MARKETPLACE_SELECTORS.RESET_BTN));
    }

    get(key) {
        return this._elements.get(key) || null;
    }

    has(key) {
        const element = this._elements.get(key);
        return Boolean(element && element.isConnected);
    }

    isReady() {
        return this.has("root") && this.has("gridContainer") && this.has("stateContainer");
    }

    clear() {
        this._elements.clear();
    }
}
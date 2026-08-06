/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE DOMAIN SERVICE
 * Path: assets/js/features/marketplace/service/marketplace.service.js
 * Version: 133.1.3 (BUILD 133.1.3 — RENDER PIPELINE REPAIR)
 * Status: APPROVED & LOCKED
 * SRP: Main Feature Orchestrator integrating repository, services, state, and UI with single-pass init.
 */

import { Core } from '../../../core/index.js';

export class MarketplaceService {
    constructor(dependencies = {}) {
        this._repository = dependencies.repository;
        this._searchService = dependencies.searchService;
        this._filterService = dependencies.filterService;
        this._state = dependencies.state;
        this._cache = dependencies.cache;
        this._eventAdapter = dependencies.eventAdapter;
        this._ui = dependencies.ui;

        this._allProducts = [];
        this._unsubscribeState = null;
        this._isMounted = false;
    }

    async init(container) {
        if (this._isMounted) return;

        Core.Logger.info('[MarketplaceService] Initializing Marketplace Feature...');

        // 1. Set root container in cache
        this._cache.init(container);
        const root = this._cache.get("root");

        if (!root) {
            Core.Logger.error('[MarketplaceService] Initialization failed: Root container is invalid.');
            return;
        }

        // 2. Render initial static HTML layout
        this._ui.renderLayout(root);

        // 3. Refresh child element references inside cache
        this._cache.refresh();

        // 4. Bind primary event listeners
        this._eventAdapter.bind(this._cache);

        // 5. Subscribe to reactive state store
        this._unsubscribeState = this._state.subscribe(currentState => {
            this._applyAndRender(currentState);
        });

        this._isMounted = true;

        // 6. Asynchronously load products from repository
        await this.loadProducts();
    }

    async loadProducts() {
        Core.Logger.info('[MarketplaceService] Loading products from repository...');
        this._state.setState({ isLoading: true, error: null });

        try {
            const products = await this._repository.getAllProducts();

            if (!Array.isArray(products)) {
                throw new TypeError("Repository did not return a valid products array.");
            }

            this._allProducts = products;
            Core.Logger.info(`[MarketplaceService] Successfully loaded ${products.length} products.`);
            this._state.setState({ isLoading: false });
        } catch (err) {
            Core.Logger.error(`[MarketplaceService] Error loading products: ${err.message}`);
            this._state.setState({ isLoading: false, error: "Gagal memuat produk marketplace." });
        }
    }

    refreshUI() {
        this._applyAndRender(this._state.state);
    }

    setSearchQuery(query) {
        this._state.setState({ searchQuery: query });
    }

    setCategory(category) {
        this._state.setState({ selectedCategory: category });
    }

    setPriceRange(priceRange) {
        this._state.setState({ selectedPriceRange: priceRange });
    }

    resetFilters() {
        this._state.reset();
    }

    getProducts() {
        return [...this._allProducts];
    }

    getState() {
        return this._state.state;
    }

    isMounted() {
        return this._isMounted;
    }

    _applyAndRender(state) {
        const root = this._cache.get("root");
        const gridContainer = this._cache.get("gridContainer");
        const stateContainer = this._cache.get("stateContainer");

        if (!gridContainer || !stateContainer) {
            Core.Logger.warn('[MarketplaceService] Cannot render: Containers missing from cache.');
            return;
        }

        if (state.isLoading) {
            this._ui.renderLoading(stateContainer, gridContainer);
            return;
        }

        if (state.error) {
            this._ui.renderError(stateContainer, gridContainer, state.error);
            return;
        }

        let result = this._searchService.search(this._allProducts, state.searchQuery);
        result = this._filterService.filter(result, state.selectedCategory, state.selectedPriceRange);

        if (result.length === 0) {
            this._ui.renderEmpty(stateContainer, gridContainer);
            this._cache.refresh();
            this._eventAdapter.bindResetButton(this._cache);
        } else {
            Core.Logger.info(`[MarketplaceService] Rendering grid with ${result.length} matching products.`);
            this._ui.renderGrid(root, gridContainer, stateContainer, result, state.selectedCategory);
        }
    }

    destroy() {
        if (!this._isMounted) return;

        Core.Logger.info('[MarketplaceService] Destroying Marketplace Feature Service...');

        // 1. Unsubscribe from state
        if (typeof this._unsubscribeState === "function") {
            this._unsubscribeState();
            this._unsubscribeState = null;
        }

        // 2. Unbind DOM listeners
        this._eventAdapter.unbind(this._cache);

        // 3. Clear DOM cache
        this._cache.clear();

        // 4. Clear internal product memory
        this._allProducts = [];

        // 5. Reset reactive state
        this._state.reset();

        this._isMounted = false;
    }
}
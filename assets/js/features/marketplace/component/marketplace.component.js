/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE FACADE COMPONENT
 * Path: assets/js/features/marketplace/component/marketplace.component.js
 * Version: 133.1.3 (BUILD 133.1.3 — RENDER PIPELINE REPAIR)
 * Status: APPROVED & LOCKED
 * SRP: Public Thin Facade implementing Universal Feature Contract Protocol.
 */

import { MarketplaceFactory } from '../factory/marketplace.factory.js';

export class MarketplaceComponent {
    constructor(factoryConfig = {}) {
        this._factory = new MarketplaceFactory(factoryConfig);
        const bundle = this._factory.create();

        this._service = bundle.service;
        this._state = bundle.state;
    }

    /**
     * Universal Feature Contract: Mounts marketplace into DOM container.
     * @param {HTMLElement|string} container 
     */
    async mount(container = "#app") {
        await this._service.init(container);
    }

    /**
     * Universal Feature Contract: Updates active UI state without re-fetching repository.
     */
    update() {
        this._service.refreshUI();
    }

    /**
     * Universal Feature Contract: Refreshes state and resets filters.
     */
    refresh() {
        this._service.resetFilters();
    }

    /**
     * Universal Feature Contract: Refreshes cached DOM references.
     */
    refreshCache() {
        // Handled internally by service
    }

    /**
     * Diagnostic API: Returns current state snapshot.
     */
    getState() {
        return this._service.getState();
    }

    /**
     * Diagnostic API: Returns current loaded products copy.
     */
    getProducts() {
        return this._service.getProducts();
    }

    /**
     * Diagnostic API: Checks if feature is currently mounted.
     */
    isMounted() {
        return this._service.isMounted();
    }

    /**
     * Universal Feature Contract: Destroys component and unbinds listeners.
     */
    destroy() {
        this._service.destroy();
    }

    /**
     * Universal Feature Contract: Returns public API object.
     */
    getPublicAPI() {
        return {
            mount: (c) => this.mount(c),
            update: () => this.update(),
            refresh: () => this.refresh(),
            destroy: () => this.destroy(),
            getState: () => this.getState(),
            getProducts: () => this.getProducts(),
            isMounted: () => this.isMounted()
        };
    }
}

export default MarketplaceComponent;
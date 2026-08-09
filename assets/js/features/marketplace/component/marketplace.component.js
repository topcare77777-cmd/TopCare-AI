/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE FACADE COMPONENT
 * Path: assets/js/features/marketplace/component/marketplace.component.js
 * Version: 134.2.1 (BUILD 134.2.1 — COMPONENT REPAIR)
 * Status: LOCK CANDIDATE
 * SRP: Public thin facade implementing Universal Feature Contract.
 */

import { MarketplaceFactory } from "../factory/marketplace.factory.js";

export class MarketplaceComponent {
    constructor(factoryConfig = {}) {
        this._factory = new MarketplaceFactory(factoryConfig);

        const bundle = this._factory.create();

        this._service = bundle.service;
        this._state = bundle.state;
    }

    async mount(container = "#app") {
        await this._service.init(container);
    }

    update() {
        this._service.refreshUI();
    }

    refresh() {
        this._service.resetFilters();
    }

    refreshCache() {
        // Cache lifecycle is managed internally by MarketplaceService.
    }

    getState() {
        return this._service.getState();
    }

    getProducts() {
        return this._service.getProducts();
    }

    isMounted() {
        return this._service.isMounted();
    }

    destroy() {
        this._service.destroy();
    }

    getPublicAPI() {
        return {
            mount: (container) => this.mount(container),
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
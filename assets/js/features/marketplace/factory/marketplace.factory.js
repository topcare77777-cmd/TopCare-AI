/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE FACTORY
 * Path: assets/js/features/marketplace/factory/marketplace.factory.js
 * Version: 133.0.1 (BUILD 133.0 — GOLDEN BASELINE)
 * Status: APPROVED & LOCKED
 * SRP: Instantiable Composition Root for Marketplace feature dependencies.
 */

import { ProductRepository } from '../domain/product.repository.js';
import { SearchService } from '../service/search.service.js';
import { FilterService } from '../service/filter.service.js';
import { MarketplaceState } from '../state/marketplace.state.js';
import { MarketplaceCache } from '../core/marketplace.cache.js';
import { MarketplaceEventAdapter } from '../core/marketplace.event-adapter.js';
import { MarketplaceUI } from '../ui/state-views.js';
import { MarketplaceService } from '../service/marketplace.service.js';

export class MarketplaceFactory {
    constructor(config = {}) {
        this.config = Object.freeze({ ...config });
    }

    create() {
        const repository = new ProductRepository(this.config.products);
        const searchService = new SearchService();
        const filterService = new FilterService();
        const state = new MarketplaceState();
        const cache = new MarketplaceCache();

        let serviceInstance = null;

        const eventAdapter = new MarketplaceEventAdapter({
            onSearch: (q) => serviceInstance.setSearchQuery(q),
            onCategorySelect: (cat) => serviceInstance.setCategory(cat),
            onPriceSelect: (p) => serviceInstance.setPriceRange(p),
            onReset: () => serviceInstance.resetFilters()
        });

        serviceInstance = new MarketplaceService({
            repository,
            searchService,
            filterService,
            state,
            cache,
            eventAdapter,
            ui: MarketplaceUI,
            config: this.config
        });

        return {
            service: serviceInstance,
            repository,
            state
        };
    }
}
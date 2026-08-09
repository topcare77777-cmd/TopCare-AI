/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE FACTORY
 * Path: assets/js/features/marketplace/factory/marketplace.factory.js
 * Version: 134.2.1 (BUILD 134.2.1 — FACTORY RUNTIME REPAIR)
 * Status: LOCK CANDIDATE
 * SRP: Composition root for Marketplace feature dependencies.
 */

import { ProductRepository } from "../domain/product.repository.js";
import { SearchService } from "../service/search.service.js";
import { FilterService } from "../service/filter.service.js";
import { MarketplaceState } from "../state/marketplace.state.js";
import { MarketplaceCache } from "../core/marketplace.cache.js";
import { MarketplaceEventAdapter } from "../core/marketplace.event-adapter.js";
import { MarketplaceUI } from "../ui/state-views.js";
import { MarketplaceService } from "../service/marketplace.service.js";

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
            onSearch: (query) => {
                serviceInstance?.setSearchQuery(query);
            },

            onCategorySelect: (category) => {
                serviceInstance?.setCategory(category);
            },

            onPriceSelect: (priceRange) => {
                serviceInstance?.setPriceRange(priceRange);
            },

            onReset: () => {
                serviceInstance?.resetFilters();
            }
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

export default MarketplaceFactory;
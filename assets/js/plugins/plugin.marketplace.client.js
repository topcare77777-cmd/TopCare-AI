/**
 * file: assets/js/plugins/plugin.marketplace.client.js (Excerpt updating search integration)
 */

import { GlobalMarketplaceSearchEngine } from './plugin.marketplace.indexer.js';

// Inside PluginMarketplaceClientBase:
    async searchPlugins(queryOptions = {}) {
        if (this._catalogCache.size === 0) {
            await this.fetchCatalog();
        }
        
        // Rebuild index if catalog updated
        GlobalMarketplaceSearchEngine.buildIndex(Array.from(this._catalogCache.values()));
        return GlobalMarketplaceSearchEngine.search(queryOptions);
    }
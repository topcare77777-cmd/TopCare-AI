/**
 * file: assets/js/plugins/plugin.load.orchestrator.js
 */

import { Core } from '../core/index.js';
import { PluginRegistry } from './plugin.registry.js';
import { PluginResolver } from './plugin.resolver.js';
import { PluginCacheManager } from './plugin.cache.manager.js';

export class PluginLoadOrchestrator {
    constructor() {
        this.cacheManager = new PluginCacheManager();
        this.loadingMap = new Map();
        Object.seal(this);
    }

    async loadPluginWithOrchestration(pluginId) {
        const cachedWrapper = this.cacheManager.get(pluginId);
        if (cachedWrapper) {
            return {
                wrapper: cachedWrapper,
                order: PluginResolver.resolveDependencyOrder(pluginId)
            };
        }

        if (this.loadingMap.has(pluginId)) {
            return await this.loadingMap.get(pluginId);
        }

        const pluginWrapper = PluginRegistry.get(pluginId);
        if (!pluginWrapper) {
            throw new Error(`Plugin not found in registry: ${pluginId}`);
        }

        const loadPromise = (async () => {
            Core.Logger.info(`PluginLoadOrchestrator executing for: ${pluginId}`);
            const order = PluginResolver.resolveDependencyOrder(pluginId);

            for (const pId of order) {
                const pWrapper = PluginRegistry.get(pId);
                if (pWrapper) {
                    const cachePolicy = pWrapper.manifest?.cachePolicy || 'unload';
                    this.cacheManager.set(pId, pWrapper, cachePolicy);
                }
            }

            return { wrapper: pluginWrapper, order };
        })();

        this.loadingMap.set(pluginId, loadPromise);
        try {
            return await loadPromise;
        } finally {
            this.loadingMap.delete(pluginId);
        }
    }

    evict(pluginId) {
        this.cacheManager.evictAndDispose(pluginId, 'dispose');
    }
}
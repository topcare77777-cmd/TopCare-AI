/**
 * file: assets/js/features/feature.loader.base.js
 */

import { Core } from '../core/index.js';
import { FeatureManifestRegistry } from './feature.manifest.registry.js';
import { FeatureBootstrap } from './feature.bootstrap.js';
import { DependencyGraphService } from './dependency.graph.service.js';
import { FeatureLoaderInterface } from './feature.loader.interface.js';
import { LOADER_STATES } from './feature.loader.types.js';

export class FeatureLoaderBase extends FeatureLoaderInterface {
    constructor(ttlMs = 30 * 60 * 1000, maxCacheSize = 50) {
        super();
        this._states = new Map();
        this._cache = new Map();
        this._loading = new Map();
        this._ttlMs = ttlMs;
        this._maxCacheSize = maxCacheSize;
        Object.seal(this);
    }

    _setState(featureId, state) {
        this._states.set(featureId, state);
    }

    getState(featureId) {
        return this._states.get(featureId) || LOADER_STATES.NOT_LOADED;
    }

    isLoaded(featureId) {
        const cached = this._cache.get(featureId);
        if (!cached) return false;

        if (Date.now() - cached.timestamp > this._ttlMs) {
            Core.Logger.info(`Feature cache expired due to TTL: ${featureId}`);
            this._evict(featureId);
            return false;
        }
        return true;
    }

    _evict(featureId) {
        this._cache.delete(featureId);
        this._states.set(featureId, LOADER_STATES.NOT_LOADED);
    }

    _enforceCacheLimit() {
        if (this._cache.size >= this._maxCacheSize) {
            let oldestKey = null;
            let oldestTime = Infinity;

            for (const [id, entry] of this._cache.entries()) {
                if (entry.timestamp < oldestTime) {
                    oldestTime = entry.timestamp;
                    oldestKey = id;
                }
            }

            if (oldestKey) {
                this._evict(oldestKey);
            }
        }
    }

    async prefetch(featureId) {
        if (this.isLoaded(featureId) || this._loading.has(featureId)) {
            return;
        }

        const manifest = FeatureManifestRegistry.get(featureId);
        if (!manifest) return;

        try {
            this._setState(featureId, LOADER_STATES.PREFETCHED);
            await this.load(featureId);
        } catch (e) {
            Core.Logger.warn(`Prefetch failed for feature '${featureId}': ${e.message}`);
        }
    }

    async load(featureId) {
        if (!featureId || typeof featureId !== 'string') {
            throw new TypeError("Feature load requires a valid feature ID string.");
        }

        if (this.isLoaded(featureId)) {
            const entry = this._cache.get(featureId);
            entry.timestamp = Date.now();
            entry.accessCount++;
            return entry.definition;
        }

        if (this._loading.has(featureId)) {
            return await this._loading.get(featureId);
        }

        const manifest = FeatureManifestRegistry.get(featureId);
        if (!manifest) {
            throw new Error(`Feature manifest not found for ID: ${featureId}`);
        }

        const loadPromise = (async () => {
            this._setState(featureId, LOADER_STATES.LOADING);
            Core.Logger.info(`Dynamically downloading feature module: ${featureId} (v${manifest.version})...`);

            try {
                // DependencyGraphService.resolveOrder handles ensureBuilt, caching, and lazy builds cleanly
                const loadOrder = DependencyGraphService.resolveOrder(featureId);

                for (const depId of loadOrder) {
                    if (!this.isLoaded(depId)) {
                        const depManifest = FeatureManifestRegistry.get(depId);
                        if (!depManifest) {
                            throw new Error(`Missing dependency manifest for '${depId}' required by '${featureId}'`);
                        }

                        if (depId === featureId) {
                            const moduleExport = await depManifest.loader();
                            const featureDef = moduleExport.default || moduleExport[Object.keys(moduleExport)[0]];

                            if (!featureDef || typeof featureDef !== 'object') {
                                throw new Error(`Loaded module for feature '${depId}' did not export a valid feature definition.`);
                            }

                            this._enforceCacheLimit();
                            this._cache.set(depId, {
                                definition: featureDef,
                                timestamp: Date.now(),
                                accessCount: 1
                            });
                            this._setState(depId, LOADER_STATES.CACHED);
                            
                            await FeatureBootstrap.bootAndInitializeFeature(depId, featureDef);
                            this._setState(depId, LOADER_STATES.LOADED);
                        } else {
                            await this.load(depId);
                        }
                    }
                }

                this._loading.delete(featureId);
                return this._cache.get(featureId).definition;
            } catch (error) {
                this._setState(featureId, LOADER_STATES.FAILED);
                this._loading.delete(featureId);
                Core.Logger.error(`Failed loading dynamic feature '${featureId}': ${error.message}`);
                throw error;
            }
        })();

        this._loading.set(featureId, loadPromise);
        return await loadPromise;
    }
}
/**
 * file: assets/js/features/feature.manifest.registry.js
 */

import { Core } from '../core/index.js';
import { RouteLoader } from '../router/index.js';
import { ManifestValidator } from './feature.loader.types.js';
import { DependencyGraphRegistry } from './dependency.graph.registry.js';

class FeatureManifestRegistryBase {
    constructor() {
        this._manifests = new Map();
        Object.seal(this);
    }

    register(manifest) {
        ManifestValidator.validate(manifest);
        const id = manifest.id;

        if (this._manifests.has(id)) {
            Core.Logger.warn(`Feature manifest already registered for ID: ${id}. Overwriting.`);
        }

        this._manifests.set(id, manifest);
        Core.Logger.info(`Feature manifest registered: ${id} (v${manifest.version})`);

        if (Array.isArray(manifest.routes)) {
            for (const route of manifest.routes) {
                if (route && route.path && route.name) {
                    RouteLoader.register(route.path, {
                        name: route.name,
                        feature: id,
                        lazy: true,
                        ...(route.options || {})
                    });
                }
            }
        }

        // Automatically invalidate Dependency Graph on manifest registration change
        DependencyGraphRegistry.invalidate();

        return this;
    }

    get(id) {
        return this._manifests.get(id) || null;
    }

    has(id) {
        return this._manifests.has(id);
    }

    getAll() {
        const all = {};
        for (const [id, m] of this._manifests.entries()) {
            all[id] = Core.Utils.clone(m);
        }
        return all;
    }
}

export const FeatureManifestRegistry = Object.freeze(new FeatureManifestRegistryBase());
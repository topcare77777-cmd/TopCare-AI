/**
 * file: assets/js/plugins/plugin.manifest.registry.js
 */

import { Core } from '../core/index.js';
import { PluginManifestValidator } from './plugin.manifest.validator.js';
import { ManifestValidationService } from '../features/index.js';
import { PluginDependencyGraphRegistry } from './plugin.dependency.graph.js';

class PluginManifestRegistryBase {
    constructor() {
        this._manifests = new Map(); // id -> manifest
        Object.seal(this);
    }

    async registerAsync(manifest) {
        const validationResult = await ManifestValidationService.validate(manifest, this.getAll());
        const pluginSchemaResult = PluginManifestValidator.validate(manifest, this.getAll());
        validationResult.merge(pluginSchemaResult);

        if (!validationResult.valid) {
            const errs = validationResult.errors.map(e => `[${e.code}] ${e.field}: ${e.message}`).join('; ');
            throw new Error(`Plugin manifest validation failed for '${manifest && manifest.id}': ${errs}`);
        }

        const id = manifest.id;
        if (this._manifests.has(id)) {
            Core.Logger.warn(`Plugin manifest already registered for ID: ${id}. Overwriting.`);
        }

        // Deep freeze manifest to prevent mutation
        const frozenManifest = Core.Utils.deepFreeze ? Core.Utils.deepFreeze(Core.Utils.clone(manifest)) : Object.freeze(Core.Utils.clone(manifest));

        this._manifests.set(id, frozenManifest);
        PluginDependencyGraphRegistry.invalidate();

        Core.Logger.info(`Plugin manifest validated and registered: ${id} (v${frozenManifest.version})`);
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
            all[id] = m; // Already immutable frozen objects
        }
        return all;
    }

    remove(id) {
        if (this._manifests.has(id)) {
            this._manifests.delete(id);
            PluginDependencyGraphRegistry.invalidate();
            Core.Logger.info(`Plugin manifest removed from registry: ${id}`);
        }
    }
}

export const PluginManifestRegistry = Object.freeze(new PluginManifestRegistryBase());
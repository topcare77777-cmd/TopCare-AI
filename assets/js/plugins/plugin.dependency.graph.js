/**
 * file: assets/js/plugins/plugin.dependency.graph.js
 */

import { Core } from '../core/index.js';
import { DependencyGraphBase, DependencyGraphManager } from '../features/index.js';
import { PluginManifestRegistry } from './plugin.manifest.registry.js';

class PluginDependencyGraphRegistryFacade {
    constructor() {
        this._engine = DependencyGraphManager.initialize(new DependencyGraphBase());
        this._isBuilt = false;
        this._revision = 0; // Incremented strictly on actual rebuilds
        Object.seal(this);
    }

    getRevision() {
        return this._revision;
    }

    rebuildFromManifests() {
        this._engine.clear();
        const manifests = PluginManifestRegistry.getAll();
        for (const [id, manifest] of Object.entries(manifests)) {
            const deps = Array.isArray(manifest.dependencies) ? manifest.dependencies : [];
            this._engine.addNode(id, deps);
        }
        this._isBuilt = true;
        this._revision++; // Increment revision only upon successful graph rebuild
        Core.Logger.info(`PluginDependencyGraph rebuilt. Revision: ${this._revision}`);
        return this;
    }

    ensureBuilt() {
        if (!this._isBuilt) {
            this.rebuildFromManifests();
        }
        return this;
    }

    invalidate() {
        this._isBuilt = false;
        this._engine.invalidate();
        // Revision is NOT incremented here on simple invalidations, preserving pure dirty flag semantics
        return this;
    }

    resolveOrder(pluginId) {
        this.ensureBuilt();
        return this._engine.resolveOrder(pluginId);
    }

    hasCircularDependency() {
        this.ensureBuilt();
        return this._engine.hasCircularDependency();
    }
}

export const PluginDependencyGraphRegistry = Object.freeze(new PluginDependencyGraphRegistryFacade());
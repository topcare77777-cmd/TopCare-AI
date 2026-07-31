/**
 * file: assets/js/features/dependency.graph.registry.js
 */

import { DependencyGraphBase } from './dependency.graph.base.js';
import { DependencyGraphManager } from './dependency.graph.manager.js';
import { FeatureManifestRegistry } from './feature.manifest.registry.js';
import { Core } from '../core/index.js';
import { DEPENDENCY_GRAPH_EVENTS } from './dependency.graph.types.js';

class DependencyGraphRegistryFacade {
    constructor() {
        this._engine = DependencyGraphManager.initialize(new DependencyGraphBase());
        this._isBuilt = false;
        this._buildPromise = null; // Async race condition deduplication lock
        Object.seal(this);
    }

    rebuildFromManifests() {
        this._engine.clear();

        const manifests = FeatureManifestRegistry.getAll();
        for (const [id, manifest] of Object.entries(manifests)) {
            const deps = Array.isArray(manifest.dependencies) ? manifest.dependencies : [];
            this._engine.addNode(id, deps);
        }

        this._isBuilt = true;
        Core.Logger.info("DependencyGraph persistently rebuilt from FeatureManifestRegistry.");
        Core.Event.emit(DEPENDENCY_GRAPH_EVENTS.BUILT, { snapshot: this._engine.getSnapshot() });
        return this;
    }

    async ensureBuiltAsync() {
        if (this._isBuilt) return this;

        if (this._buildPromise) {
            return await this._buildPromise;
        }

        this._buildPromise = (async () => {
            try {
                this.rebuildFromManifests();
            } finally {
                this._buildPromise = null;
            }
            return this;
        })();

        return await this._buildPromise;
    }

    ensureBuilt() {
        if (!this._isBuilt) {
            this.rebuildFromManifests();
        }
        return this;
    }

    invalidate() {
        this._isBuilt = false;
        this._buildPromise = null;
        this._engine.invalidate();
        Core.Logger.info("DependencyGraphRegistry invalidated and build lock reset.");
        return this;
    }

    hasNode(nodeId) {
        this.ensureBuilt();
        return this._engine.hasNode(nodeId);
    }

    getDependencies(nodeId) {
        this.ensureBuilt();
        return this._engine.getDependencies(nodeId);
    }

    getDependents(nodeId) {
        this.ensureBuilt();
        return this._engine.getDependents(nodeId);
    }

    getGraph() {
        this.ensureBuilt();
        return this._engine.getGraph();
    }

    resolveOrder(nodeId) {
        this.ensureBuilt();
        return this._engine.resolveOrder(nodeId);
    }

    resolveAllOrder() {
        this.ensureBuilt();
        return this._engine.resolveAllOrder();
    }

    hasCircularDependency() {
        this.ensureBuilt();
        return this._engine.hasCircularDependency();
    }

    getMissingDependencies() {
        this.ensureBuilt();
        return this._engine.getMissingDependencies();
    }

    getSnapshot() {
        this.ensureBuilt();
        return this._engine.getSnapshot();
    }
}

export const DependencyGraphRegistry = Object.freeze(new DependencyGraphRegistryFacade());
/**
 * file: assets/js/features/dependency.graph.base.js
 */

import { Core } from '../core/index.js';
import { DependencyGraphInterface } from './dependency.graph.interface.js';
import { DEPENDENCY_GRAPH_EVENTS } from './dependency.graph.types.js';

export class DependencyGraphBase extends DependencyGraphInterface {
    constructor() {
        super();
        this._adjacencyList = new Map(); // nodeId -> Set of dependency nodeIds
        this._dependentsList = new Map(); // nodeId -> Set of dependent nodeIds
        this._orderCache = new Map(); // nodeId -> resolved order array
        this._globalOrderCache = null; // cached global topological order
        this._isDirty = true;
        this._reportedMissing = new Set(); // deduplication tracker for missing telemetry
        Object.seal(this);
    }

    clear() {
        this._adjacencyList.clear();
        this._dependentsList.clear();
        this._orderCache.clear();
        this._globalOrderCache = null;
        this._reportedMissing.clear();
        this._isDirty = true;
        Core.Logger.info("DependencyGraphBase cleared and marked dirty.");
        return this;
    }

    invalidate() {
        this._isDirty = true;
        this._orderCache.clear();
        this._globalOrderCache = null;
        this._reportedMissing.clear(); // Clear telemetry deduplication tracker on invalidation
        Core.Logger.info("DependencyGraph marked dirty (invalidated) and telemetry reset.");
        return this;
    }

    addNode(nodeId, dependencies = []) {
        if (!nodeId || typeof nodeId !== 'string') {
            throw new TypeError("Graph node ID must be a valid non-empty string.");
        }

        this.invalidate();

        if (!this._adjacencyList.has(nodeId)) {
            this._adjacencyList.set(nodeId, new Set());
        }

        if (!this._dependentsList.has(nodeId)) {
            this._dependentsList.set(nodeId, new Set());
        }

        if (Array.isArray(dependencies)) {
            for (const depId of dependencies) {
                if (depId && typeof depId === 'string') {
                    this._adjacencyList.get(nodeId).add(depId);

                    if (!this._dependentsList.has(depId)) {
                        this._dependentsList.set(depId, new Set());
                    }
                    this._dependentsList.get(depId).add(nodeId);
                }
            }
        }

        return this;
    }

    hasNode(nodeId) {
        return this._adjacencyList.has(nodeId);
    }

    getDependencies(nodeId) {
        if (!this.hasNode(nodeId)) {
            return [];
        }
        return Array.from(this._adjacencyList.get(nodeId));
    }

    getDependents(nodeId) {
        if (!this._dependentsList.has(nodeId)) {
            return [];
        }
        return Array.from(this._dependentsList.get(nodeId));
    }

    getGraph() {
        const graph = {};
        for (const [nodeId, deps] of this._adjacencyList.entries()) {
            graph[nodeId] = Array.from(deps);
        }
        return graph;
    }

    getMissingDependencies() {
        const missing = new Map();

        for (const [nodeId, deps] of this._adjacencyList.entries()) {
            const missingForNode = [];
            for (const depId of deps) {
                if (!this._adjacencyList.has(depId)) {
                    missingForNode.push(depId);
                }
            }
            if (missingForNode.length > 0) {
                missing.set(nodeId, missingForNode);

                const telemetryKey = `${nodeId}->${missingForNode.join(',')}`;
                if (!this._reportedMissing.has(telemetryKey)) {
                    this._reportedMissing.add(telemetryKey);
                    Core.Event.emit(DEPENDENCY_GRAPH_EVENTS.MISSING_DETECTED, { nodeId, missing: missingForNode });
                }
            }
        }

        return missing;
    }

    hasCircularDependency() {
        const visited = new Set();
        const recursionStack = new Set();

        const dfs = (nodeId) => {
            visited.add(nodeId);
            recursionStack.add(nodeId);

            const deps = this._adjacencyList.get(nodeId) || new Set();
            for (const depId of deps) {
                if (!visited.has(depId)) {
                    if (dfs(depId)) return true;
                } else if (recursionStack.has(depId)) {
                    return true;
                }
            }

            recursionStack.delete(nodeId);
            return false;
        };

        for (const nodeId of this._adjacencyList.keys()) {
            if (!visited.has(nodeId)) {
                if (dfs(nodeId)) {
                    Core.Event.emit(DEPENDENCY_GRAPH_EVENTS.CYCLE_DETECTED, {});
                    return true;
                }
            }
        }

        return false;
    }

    resolveOrder(nodeId) {
        if (!this.hasNode(nodeId)) {
            throw new Error(`Node '${nodeId}' not found in dependency graph.`);
        }

        // Return cached order if valid and graph is clean
        if (!this._isDirty && this._orderCache.has(nodeId)) {
            return this._orderCache.get(nodeId);
        }

        const missingMap = this.getMissingDependencies();
        if (missingMap.has(nodeId)) {
            throw new Error(`Missing dependencies for '${nodeId}': ${missingMap.get(nodeId).join(', ')}`);
        }

        if (this.hasCircularDependency()) {
            throw new Error("Circular dependency detected in graph. Cannot resolve topological order.");
        }

        const visited = new Set();
        const memo = new Map();

        const dfs = (currId) => {
            if (memo.has(currId)) {
                return memo.get(currId);
            }
            if (visited.has(currId)) {
                return [];
            }

            visited.add(currId);
            const subOrder = [];
            const deps = this._adjacencyList.get(currId) || new Set();
            for (const depId of deps) {
                subOrder.push(...dfs(depId));
            }
            subOrder.push(currId);
            memo.set(currId, subOrder);
            return subOrder;
        };

        const resolved = dfs(nodeId);
        this._orderCache.set(nodeId, resolved);

        // Sync dirty state if full evaluation completes successfully
        this._isDirty = false;
        return resolved;
    }

    resolveAllOrder() {
        if (!this._isDirty && this._globalOrderCache) {
            return this._globalOrderCache;
        }

        const missingMap = this.getMissingDependencies();
        if (missingMap.size > 0) {
            const summary = Array.from(missingMap.entries()).map(([n, d]) => `${n} -> [${d.join(', ')}]`).join('; ');
            throw new Error(`Missing dependencies detected in graph: ${summary}`);
        }

        if (this.hasCircularDependency()) {
            throw new Error("Circular dependency detected in graph. Cannot resolve global topological order.");
        }

        const visited = new Set();
        const order = [];

        const dfs = (currId) => {
            if (visited.has(currId)) return;
            visited.add(currId);
            const deps = this._adjacencyList.get(currId) || new Set();
            for (const depId of deps) {
                dfs(depId);
            }
            order.push(currId);
        };

        for (const nodeId of this._adjacencyList.keys()) {
            dfs(nodeId);
        }

        this._globalOrderCache = order;
        this._isDirty = false;
        return order;
    }

    _deepFreeze(obj) {
        Object.freeze(obj);
        Object.getOwnPropertyNames(obj).forEach(prop => {
            if (obj[prop] !== null && (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') && !Object.isFrozen(obj[prop])) {
                this._deepFreeze(obj[prop]);
            }
        });
        return obj;
    }

    getSnapshot() {
        const raw = this.getGraph();
        const clone = Core.Utils.clone(raw);
        return this._deepFreeze(clone);
    }
}
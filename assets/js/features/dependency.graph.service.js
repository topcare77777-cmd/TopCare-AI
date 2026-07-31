/**
 * file: assets/js/features/dependency.graph.service.js
 */

import { DependencyGraphRegistry } from './dependency.graph.registry.js';

export const DependencyGraphService = Object.freeze({
    rebuildGraph() {
        return DependencyGraphRegistry.rebuildFromManifests();
    },
    hasNode(nodeId) {
        return DependencyGraphRegistry.hasNode(nodeId);
    },
    getDependencies(nodeId) {
        return DependencyGraphRegistry.getDependencies(nodeId);
    },
    getDependents(nodeId) {
        return DependencyGraphRegistry.getDependents(nodeId);
    },
    getGraph() {
        return DependencyGraphRegistry.getGraph();
    },
    resolveOrder(nodeId) {
        return DependencyGraphRegistry.resolveOrder(nodeId);
    },
    resolveAllOrder() {
        return DependencyGraphRegistry.resolveAllOrder();
    },
    hasCircularDependency() {
        return DependencyGraphRegistry.hasCircularDependency();
    },
    getMissingDependencies() {
        return DependencyGraphRegistry.getMissingDependencies();
    },
    getSnapshot() {
        return DependencyGraphRegistry.getSnapshot();
    }
});
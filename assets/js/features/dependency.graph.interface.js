/**
 * file: assets/js/features/dependency.graph.interface.js
 */

export class DependencyGraphInterface {
    addNode(nodeId, dependencies = []) { throw new Error("Not implemented"); }
    hasNode(nodeId) { throw new Error("Not implemented"); }
    getDependencies(nodeId) { throw new Error("Not implemented"); }
    getDependents(nodeId) { throw new Error("Not implemented"); }
    getGraph() { throw new Error("Not implemented"); }
    resolveOrder(nodeId) { throw new Error("Not implemented"); }
    resolveAllOrder() { throw new Error("Not implemented"); }
    hasCircularDependency() { throw new Error("Not implemented"); }
    getMissingDependencies() { throw new Error("Not implemented"); }
    getSnapshot() { throw new Error("Not implemented"); }
}
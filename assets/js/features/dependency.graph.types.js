/**
 * file: assets/js/features/dependency.graph.types.js
 */

export class DependencyGraphCycleException extends Error {
    constructor(nodeId, path = []) {
        super(`Dependency graph cycle detected at node '${nodeId}': ${path.join(' -> ')}.`);
        this.name = 'DependencyGraphCycleException';
        this.nodeId = nodeId;
        this.path = path;
        Object.seal(this);
    }
}
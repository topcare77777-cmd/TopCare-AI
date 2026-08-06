/**
 * file: assets/js/features/dependency.graph.types.js
 * Version: 131.0.0
 * Status: APPROVED COMPATIBILITY CONTRACT
 * SRP: Dependency Graph Types, Events & Error Contracts
 */

export const DEPENDENCY_GRAPH_EVENTS = Object.freeze({
    REGISTERED: 'dependency.graph.registered',
    RESOLVED: 'dependency.graph.resolved',
    REMOVED: 'dependency.graph.removed',
    UPDATED: 'dependency.graph.updated',
    CYCLE_DETECTED: 'dependency.graph.cycle.detected',
    FAILED: 'dependency.graph.failed'
});


export class DependencyGraphCycleException extends Error {
    constructor(nodeId, path = []) {
        super(
            `Dependency graph cycle detected at node '${nodeId}': ${path.join(' -> ')}.`
        );

        this.name = 'DependencyGraphCycleException';
        this.nodeId = nodeId;
        this.path = path;

        Object.freeze(this);
    }
}


export class DependencyGraphValidationException extends Error {
    constructor(message) {
        super(message);

        this.name = 'DependencyGraphValidationException';

        Object.freeze(this);
    }
}
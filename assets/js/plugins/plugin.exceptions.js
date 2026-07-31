/**
 * file: assets/js/plugins/plugin.exceptions.js
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

export class PluginDependencyMissingException extends Error {
    constructor(pluginId, missingId) {
        super(`Plugin '${pluginId}' failed to load: Missing required dependency plugin '${missingId}'.`);
        this.name = 'PluginDependencyMissingException';
        this.pluginId = pluginId;
        this.missingId = missingId;
        Object.seal(this);
    }
}

export class PluginCircularDependencyException extends Error {
    constructor(pluginId, path = []) {
        super(`Plugin circular dependency detected involving '${pluginId}': ${path.join(' -> ')}.`);
        this.name = 'PluginCircularDependencyException';
        this.pluginId = pluginId;
        this.path = path;
        Object.seal(this);
    }
}

export class PluginStateTransitionException extends Error {
    constructor(pluginId, currentState, targetState) {
        super(`Invalid lifecycle state transition for plugin '${pluginId}': cannot transition from '${currentState}' to '${targetState}'.`);
        this.name = 'PluginStateTransitionException';
        this.pluginId = pluginId;
        this.currentState = currentState;
        this.targetState = targetState;
        Object.seal(this);
    }
}
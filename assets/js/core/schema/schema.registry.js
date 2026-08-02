/**
 * TOPCARE AI PLATFORM V2 — SCHEMA REGISTRY WITH LIFECYCLE LOCKING
 * Path: assets/js/core/schema/schema.registry.js
 * Status: ACTIVE (GOLDEN BASELINE V2.1 - LEVEL 7 HARDENED)
 * Role: Schema Version Graph Manager with Read-Only Lifecycle Locking
 */

export const REGISTRY_STATES = Object.freeze({
    OPEN: 'OPEN',
    LOCKED: 'LOCKED'
});

export const SchemaRegistry = (() => {
    let currentState = REGISTRY_STATES.OPEN;
    const versionGraphs = new Map();
    const targetVersions = new Map();

    function assertOpen() {
        if (currentState === REGISTRY_STATES.LOCKED) {
            throw new Error('[SchemaRegistry] Registry is LOCKED (READ-ONLY). Further schema registration is forbidden.');
        }
    }

    function registerSchemaVersion(schemaType, version, isTarget = false) {
        assertOpen();
        const sType = String(schemaType);
        if (!versionGraphs.has(sType)) {
            versionGraphs.set(sType, new Map());
        }
        if (isTarget || !targetVersions.has(sType)) {
            targetVersions.set(sType, String(version));
        }
    }

    function registerMigrationPath(schemaType, fromVersion, toVersion) {
        assertOpen();
        registerSchemaVersion(schemaType, fromVersion);
        registerSchemaVersion(schemaType, toVersion);

        const graph = versionGraphs.get(schemaType);
        if (!graph.has(fromVersion)) {
            graph.set(fromVersion, []);
        }
        graph.get(fromVersion).push(toVersion);
    }

    function lock() {
        currentState = REGISTRY_STATES.LOCKED;
        console.log('[SchemaRegistry] Lifecycle state transitions to LOCKED (READ-ONLY).');
    }

    function getTargetVersion(schemaType) {
        return targetVersions.get(schemaType) || '2.0.0';
    }

    function findMigrationRoute(schemaType, fromVersion, toVersion) {
        if (fromVersion === toVersion) return [fromVersion];
        const graph = versionGraphs.get(schemaType);
        if (!graph) return null;

        const queue = [[fromVersion]];
        const visited = new Set([fromVersion]);

        while (queue.length > 0) {
            const path = queue.shift();
            const current = path[path.length - 1];

            if (current === toVersion) return path;

            const neighbors = graph.get(current) || [];
            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push([...path, neighbor]);
                }
            }
        }
        return null;
    }

    return Object.freeze({
        registerSchemaVersion,
        registerMigrationPath,
        lock,
        getState: () => currentState,
        getTargetVersion,
        findMigrationRoute
    });
})();

export default SchemaRegistry;

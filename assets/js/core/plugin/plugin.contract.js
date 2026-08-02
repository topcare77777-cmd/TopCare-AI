/**
 * TOPCARE AI PLATFORM V2 — PLUGIN CONTRACT & DIAGNOSTICS DTOS
 * Path: assets/js/core/plugin/plugin.contract.js
 * Status: ACTIVE (BUILD AC-025 - LOCKED GOLDEN BASELINE)
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const PLUGIN_SCHEMA_VERSION = '2.0.0';

export const PLUGIN_STATES = deepFreezeDTO({
    INSTALLED: 'INSTALLED',
    INITIALIZED: 'INITIALIZED',
    ACTIVE: 'ACTIVE',
    DEACTIVATED: 'DEACTIVATED',
    FAILED: 'FAILED',
    DISABLED: 'DISABLED'
});

export function createPluginManifestDTO({
    pluginId,
    version = '1.0.0',
    name = 'Unknown Plugin',
    author = 'Community',
    entryPoint = './plugin.js',
    capabilities = [],
    dependencies = [],
    optionalDependencies = [],
    conflicts = [],
    minimumRuntimeVersion = '2.0.0',
    checksum = 'N/A'
}) {
    if (!pluginId || typeof pluginId !== 'string') {
        throw new Error('[PluginContract] Plugin ID is required and must be a string.');
    }

    return deepFreezeDTO({
        schemaVersion: PLUGIN_SCHEMA_VERSION,
        pluginId: String(pluginId).toLowerCase().trim(),
        version: String(version),
        name: String(name),
        author: String(author),
        entryPoint: String(entryPoint),
        capabilities: Object.freeze([...capabilities]),
        dependencies: Object.freeze([...dependencies]),
        optionalDependencies: Object.freeze([...optionalDependencies]),
        conflicts: Object.freeze([...conflicts]),
        minimumRuntimeVersion: String(minimumRuntimeVersion),
        checksum: String(checksum)
    });
}

export function createPluginHealthDTO({
    pluginId,
    state = PLUGIN_STATES.INSTALLED,
    lastError = null,
    executionTimeMs = 0
}) {
    return deepFreezeDTO({
        schemaVersion: PLUGIN_SCHEMA_VERSION,
        pluginId: String(pluginId),
        state: PLUGIN_STATES[state] || PLUGIN_STATES.INSTALLED,
        lastError: lastError ? String(lastError) : null,
        executionTimeMs: Number(executionTimeMs)
    });
}

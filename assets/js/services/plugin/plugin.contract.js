/**
 * TOPCARE AI PLATFORM V2 — ENHANCED PLUGIN CONTRACT & REGISTRY
 * Path: assets/js/services/plugin/plugin.contract.js & plugin.registry.js
 * Status: ACTIVE (BUILD AC-019R2 - LOCKED GOLDEN BASELINE)
 * Role: Contract Factory with Dependency Metadata and Immutable Snapshot Registry
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export function createPluginDescriptorDTO({
    id,
    version = '1.0.0',
    name = 'Unknown Plugin',
    author = 'Community',
    capabilities = {},
    dependencies = [],
    optionalDependencies = [],
    conflicts = [],
    minimumRuntimeVersion = '2.0.0'
}) {
    if (!id || typeof id !== 'string') {
        throw new Error('[PluginContract] Plugin ID is required and must be a string.');
    }

    return deepFreezeDTO({
        id: id.toLowerCase(),
        version: String(version),
        name: String(name),
        author: String(author),
        capabilities: deepFreezeDTO({ ...capabilities }),
        dependencies: deepFreezeDTO([...dependencies]),
        optionalDependencies: deepFreezeDTO([...optionalDependencies]),
        conflicts: deepFreezeDTO([...conflicts]),
        minimumRuntimeVersion: String(minimumRuntimeVersion)
    });
}

/**
 * METADATA-ONLY PLUGIN REGISTRY WITH SNAPSHOT DTO
 */
export const PluginRegistry = (() => {
    /** @type {Map<string, Object>} */
    const descriptors = new Map();

    function register(descriptorDTO) {
        if (!descriptorDTO || !descriptorDTO.id) {
            throw new Error('[PluginRegistry] Invalid PluginDescriptorDTO provided.');
        }
        descriptors.set(descriptorDTO.id, deepFreezeDTO(descriptorDTO));
    }

    function getDescriptor(id) {
        return descriptors.get(id?.toLowerCase()) || null;
    }

    function snapshot() {
        return deepFreezeDTO({
            totalRegistered: descriptors.size,
            descriptors: Array.from(descriptors.values()),
            capturedAt: new Date().toISOString()
        });
    }

    function unregister(id) {
        descriptors.delete(id?.toLowerCase());
    }

    function clear() {
        descriptors.clear();
    }

    return Object.freeze({
        register,
        getDescriptor,
        snapshot,
        unregister,
        clear
    });
})();

export default PluginRegistry;

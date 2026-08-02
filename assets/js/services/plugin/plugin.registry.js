/**
 * TOPCARE AI PLATFORM V2 — METADATA-ONLY PLUGIN REGISTRY
 * Path: assets/js/services/plugin/plugin.registry.js
 * Status: ACTIVE (BUILD AC-019 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for Plugin Descriptors (0 Live Objects Stored)
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const PluginRegistry = (() => {
    /** @type {Map<string, Object>} Map storing Descriptor DTOs only */
    const descriptors = new Map();

    function register(descriptorDTO) {
        if (!descriptorDTO || !descriptorDTO.id) {
            throw new Error('[PluginRegistry] Invalid PluginDescriptorDTO provided.');
        }
        descriptors.set(descriptorDTO.id, deepFreezeDTO(descriptorDTO));
    }

    function getDescriptor(id) {
        return descriptors.get(id) || null;
    }

    function listDescriptors() {
        return deepFreezeDTO(Array.from(descriptors.values()));
    }

    function unregister(id) {
        descriptors.delete(id);
    }

    return Object.freeze({
        register,
        getDescriptor,
        listDescriptors,
        unregister
    });
})();

export default PluginRegistry;

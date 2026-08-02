/**
 * TOPCARE AI PLATFORM V2 — QUERYABLE CAPABILITY REGISTRY SSOT
 * Path: assets/js/core/capability/capability.registry.js
 * Status: ACTIVE (SPRINT A - LOCKED GOLDEN BASELINE)
 */

import { createCapabilityManifestDTO } from './capability.manifest.dto.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const REGISTRY_STATES = Object.freeze({
    OPEN: 'OPEN',
    LOCKED: 'LOCKED'
});

export const CapabilityRegistry = (() => {
    let currentState = REGISTRY_STATES.OPEN;
    /** @type {Map<string, Object>} Capability ID -> CapabilityManifestDTO */
    const registry = new Map();

    function assertOpen() {
        if (currentState === REGISTRY_STATES.LOCKED) {
            throw new Error('[CapabilityRegistry] Registry is LOCKED (READ-ONLY). Registration forbidden.');
        }
    }

    function register(rawManifest) {
        assertOpen();
        const manifest = createCapabilityManifestDTO(rawManifest);
        registry.set(manifest.id, manifest);
        return manifest;
    }

    function lock() {
        currentState = REGISTRY_STATES.LOCKED;
        console.log('[CapabilityRegistry] Lifecycle state locked to READ-ONLY.');
    }

    function findById(id) {
        return registry.get(String(id).toLowerCase().trim()) || null;
    }

    function findByCategory(category) {
        return deepFreezeDTO(Array.from(registry.values()).filter(c => c.category === category));
    }

    function findByIntent(intent) {
        const targetIntent = String(intent).toUpperCase().trim();
        return deepFreezeDTO(Array.from(registry.values()).filter(c => c.intents.includes(targetIntent)));
    }

    function findByPermission(permission) {
        const targetPerm = String(permission).toLowerCase().trim();
        return deepFreezeDTO(Array.from(registry.values()).filter(c => c.permissions.includes(targetPerm)));
    }

    function findByTag(tag) {
        const targetTag = String(tag).toLowerCase().trim();
        return deepFreezeDTO(Array.from(registry.values()).filter(c => c.tags.includes(targetTag)));
    }

    function listAll() {
        return deepFreezeDTO(Array.from(registry.values()));
    }

    return Object.freeze({
        register,
        lock,
        getState: () => currentState,
        findById,
        findByCategory,
        findByIntent,
        findByPermission,
        findByTag,
        listAll
    });
})();

export default CapabilityRegistry;

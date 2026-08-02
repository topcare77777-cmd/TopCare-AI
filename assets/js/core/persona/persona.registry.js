/**
 * TOPCARE AI PLATFORM V2 — PERSONA REGISTRY SSOT
 * Path: assets/js/core/persona/persona.registry.js
 * Status: ACTIVE (SPRINT C - LOCKED GOLDEN BASELINE)
 */

import { createPersonaManifestDTO } from './persona.manifest.dto.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const REGISTRY_STATES = Object.freeze({
    OPEN: 'OPEN',
    LOCKED: 'LOCKED'
});

export const PersonaRegistry = (() => {
    let currentState = REGISTRY_STATES.OPEN;
    /** @type {Map<string, Object>} Map<personaId, PersonaManifestDTO> */
    const registry = new Map();

    function assertOpen() {
        if (currentState === REGISTRY_STATES.LOCKED) {
            throw new Error('[PersonaRegistry] Registry is LOCKED (READ-ONLY). Persona registration forbidden.');
        }
    }

    function register(rawManifest) {
        assertOpen();
        const manifest = createPersonaManifestDTO(rawManifest);
        registry.set(manifest.id, manifest);
        return manifest;
    }

    function lock() {
        currentState = REGISTRY_STATES.LOCKED;
        console.log('[PersonaRegistry] Lifecycle state locked to READ-ONLY.');
    }

    function findById(id) {
        return registry.get(String(id).toLowerCase().trim()) || null;
    }

    function findByCapabilityTag(tag) {
        const targetTag = String(tag).toLowerCase().trim();
        return deepFreezeDTO(
            Array.from(registry.values()).filter(p => p.preferredCapabilityTags.includes(targetTag))
        );
    }

    function listAll() {
        return deepFreezeDTO(Array.from(registry.values()));
    }

    return Object.freeze({
        register,
        lock,
        getState: () => currentState,
        findById,
        findByCapabilityTag,
        listAll
    });
})();

export default PersonaRegistry;

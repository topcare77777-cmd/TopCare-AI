/**
 * TOPCARE AI PLATFORM V2 — PERSONA RESOLVER
 * Path: assets/js/services/persona/persona.resolver.js
 * Status: ACTIVE (SPRINT C - LOCKED GOLDEN BASELINE)
 * Role: Resolves Target Persona Based on Override, Capability Tags, and User Profile Context
 */

import PersonaRegistry from '../../core/persona/persona.registry.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const PersonaResolver = Object.freeze({
    /**
     * Resolves active PersonaManifestDTO dynamically.
     * Priority: User Override -> Capability Tag Match -> User Temperament Match -> Default Fallback
     */
    resolvePersona({ userPersonaOverrideId = null, activeCapabilityManifest = null, contextSnapshotDTO = null }) {
        // 1. Priority 1: User Explicit Session Override
        if (userPersonaOverrideId) {
            const overridePersona = PersonaRegistry.findById(userPersonaOverrideId);
            if (overridePersona) return overridePersona;
        }

        // 2. Priority 2: Capability Preferred Tag Matching
        if (activeCapabilityManifest && activeCapabilityManifest.tags) {
            for (const tag of activeCapabilityManifest.tags) {
                const matchedPersonas = PersonaRegistry.findByCapabilityTag(tag);
                if (matchedPersonas.length > 0) {
                    return matchedPersonas[0];
                }
            }
        }

        // 3. Priority 3: User Temperament Alignment
        const userTemperament = contextSnapshotDTO?.nodes?.personality?.primaryType;
        if (userTemperament) {
            const allPersonas = PersonaRegistry.listAll();
            const matched = allPersonas.find(p => p.traits.includes(String(userTemperament).toLowerCase()));
            if (matched) return matched;
        }

        // 4. Default Fallback
        const defaultPersona = PersonaRegistry.findById('coach-kael') || PersonaRegistry.listAll()[0];
        if (!defaultPersona) {
            throw new Error('[PersonaResolver] No personas registered in PersonaRegistry.');
        }

        return defaultPersona;
    }
});

export default PersonaResolver;

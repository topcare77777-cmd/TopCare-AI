/**
 * TOPCARE AI PLATFORM V2 — ENHANCED DECLARATIVE CAPABILITY DTO FACTORY
 * Path: assets/js/core/capability/capability.dto.js
 * Status: ACTIVE (BUILD AC-019R2 - LOCKED GOLDEN BASELINE)
 * Role: Factory and Normalizer for Declarative CapabilityDTO Packets
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const PROVIDER_TYPES = Object.freeze({
    LLM: 'LLM',
    PLUGIN: 'PLUGIN',
    RULE_ENGINE: 'RULE_ENGINE',
    LOCAL_MODEL: 'LOCAL_MODEL'
});

export function createCapabilityDTO({
    providerId = 'unknown',
    providerType = PROVIDER_TYPES.LLM,
    capabilityVersion = '1.0.0',
    features = {},
    quality = {}
}) {
    const dto = {
        providerId: String(providerId).toLowerCase(),
        providerType: PROVIDER_TYPES[providerType] || PROVIDER_TYPES.LLM,
        capabilityVersion: String(capabilityVersion),
        features: {
            streaming: Boolean(features.streaming),
            offline: Boolean(features.offline),
            jsonMode: Boolean(features.jsonMode),
            personalityAlignment: Boolean(features.personalityAlignment),
            multiTurnMemory: Boolean(features.multiTurnMemory),
            abstractHintCodes: Boolean(features.abstractHintCodes)
        },
        quality: {
            typicalLatencyMs: typeof quality.typicalLatencyMs === 'number' ? quality.typicalLatencyMs : 1000,
            reliabilityScore: typeof quality.reliabilityScore === 'number' ? quality.reliabilityScore : 100,
            costTier: typeof quality.costTier === 'string' ? quality.costTier : 'MEDIUM',
            priority: typeof quality.priority === 'number' ? quality.priority : 100
        }
    };

    return deepFreezeDTO(dto);
}

/**
 * Normalizes raw/partial CapabilityDTO objects to guarantee safe scoring property access.
 * @param {Object} rawCapability
 * @returns {Object} Normalized CapabilityDTO.
 */
export function normalizeCapabilityDTO(rawCapability = {}) {
    return createCapabilityDTO({
        providerId: rawCapability.providerId,
        providerType: rawCapability.providerType,
        capabilityVersion: rawCapability.capabilityVersion,
        features: rawCapability.features,
        quality: rawCapability.quality
    });
}

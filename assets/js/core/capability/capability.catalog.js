/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY CATALOG
 * Path: assets/js/core/capability/capability.catalog.js
 * Status: ACTIVE (BUILD AC-019 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for Platform Capability Attribute Keys
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const CAPABILITY_KEYS = deepFreezeDTO({
    FEATURES: {
        STREAMING: 'streaming',
        OFFLINE: 'offline',
        JSON_MODE: 'jsonMode',
        PERSONALITY_ALIGNMENT: 'personalityAlignment',
        MULTI_TURN_MEMORY: 'multiTurnMemory',
        ABSTRACT_HINT_CODES: 'abstractHintCodes'
    },
    METRICS: {
        MAX_CONTEXT_WINDOW: 'maxContextWindow',
        TYPICAL_LATENCY_MS: 'typicalLatencyMs',
        RELIABILITY_SCORE: 'reliabilityScore'
    }
});

export default CAPABILITY_KEYS;

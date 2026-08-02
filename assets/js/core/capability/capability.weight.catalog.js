/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY WEIGHT PROFILES CATALOG
 * Path: assets/js/core/capability/capability.weight.catalog.js
 * Status: ACTIVE (BUILD AC-019R2 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for Weight Profiles
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const WEIGHT_PROFILES = deepFreezeDTO({
    DEFAULT: {
        baseScore: 100,
        streaming: 80,
        jsonMode: 60,
        personalityAlignment: 50,
        offline: 40,
        multiTurnMemory: 30,
        abstractHintCodes: 30,
        latencyMultiplier: 0.1
    },
    FAST: {
        baseScore: 100,
        streaming: 120,
        jsonMode: 40,
        personalityAlignment: 30,
        offline: 20,
        multiTurnMemory: 20,
        abstractHintCodes: 20,
        latencyMultiplier: 0.5 // Higher weight on low latency
    },
    LOW_COST: {
        baseScore: 100,
        streaming: 40,
        jsonMode: 40,
        personalityAlignment: 40,
        offline: 100, // Prefers offline / local
        multiTurnMemory: 20,
        abstractHintCodes: 20,
        latencyMultiplier: 0.05
    },
    PREMIUM: {
        baseScore: 200,
        streaming: 100,
        jsonMode: 80,
        personalityAlignment: 100,
        offline: 10,
        multiTurnMemory: 60,
        abstractHintCodes: 60,
        latencyMultiplier: 0.2
    },
    OFFLINE: {
        baseScore: 500,
        streaming: 0,
        jsonMode: 50,
        personalityAlignment: 50,
        offline: 300,
        multiTurnMemory: 50,
        abstractHintCodes: 50,
        latencyMultiplier: 0
    }
});

export default WEIGHT_PROFILES;

/**
 * TOPCARE AI PLATFORM V2 — CONFIGURATION CATALOG & DEFAULT VALUES SSOT
 * Path: assets/js/core/config/config.catalog.js & config.defaults.js
 * Status: ACTIVE (BUILD AC-026 - LOCKED GOLDEN BASELINE)
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const CONFIG_SCHEMA_VERSION = '2.0.0';

export const ENVIRONMENT_PROFILES = deepFreezeDTO({
    DEVELOPMENT: 'DEVELOPMENT',
    TESTING: 'TESTING',
    PRODUCTION: 'PRODUCTION',
    DEMO: 'DEMO',
    OFFLINE_STANDALONE: 'OFFLINE_STANDALONE'
});

export const CONFIG_DEFAULTS = deepFreezeDTO({
    platform: {
        id: 'topcare-ai-v2',
        name: 'TopCare AI Enterprise Platform',
        version: '2.0.0'
    },
    runtime: {
        retry: {
            maxAttempts: 3,
            backoffMs: 1000
        },
        timeouts: {
            llmRequestMs: 15000,
            pipelineStepMs: 5000,
            pluginActivationMs: 3000
        },
        concurrency: {
            maxParallelInstances: 5
        }
    },
    features: {
        ENABLE_OFFLINE_FALLBACK: true,
        ENABLE_STREAMING_UI: true,
        ENABLE_PERSONALITY_PROFILES: true,
        ENABLE_ADVANCED_DIAGNOSTICS: true,
        ENABLE_TELEMETRY_LOGGING: true,
        ENABLE_SAFETY_GUARDRAILS: true,
        ENABLE_PLUGINS: true
    },
    safety: {
        maxInputLengthChars: 4000,
        criticalRiskAction: 'BLOCK',
        defaultDisclaimerRef: 'DISCLAIMER_GENERAL_01'
    },
    memory: {
        maxHistoryBuffer: 50,
        maxSummaryCount: 10
    },
    telemetry: {
        ringBufferMaxEntries: 50,
        logLevel: 'INFO'
    },
    plugins: {}
});

export default CONFIG_DEFAULTS;

/**
 * TOPCARE AI PLATFORM V2 — METRIC DTOS FACTORY
 * Path: assets/js/core/metrics/metrics.dto.js
 * Status: ACTIVE (BUILD AC-027 - LOCKED GOLDEN BASELINE)
 */

import { METRICS_SCHEMA_VERSION, METRIC_CATEGORIES } from './metrics.catalog.js';
import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export function createPerformanceMetricDTO({ executionId, stepId, durationMs, cacheHit = false }) {
    return deepFreezeDTO({
        schemaVersion: METRICS_SCHEMA_VERSION,
        category: METRIC_CATEGORIES.PERFORMANCE,
        executionId: String(executionId || 'N/A'),
        stepId: String(stepId || 'N/A'),
        durationMs: Number(durationMs || 0),
        cacheHit: Boolean(cacheHit),
        timestamp: TimeProvider.iso()
    });
}

export function createBusinessMetricDTO({ sessionId, coachId, turnCount = 1, goalAchieved = false }) {
    return deepFreezeDTO({
        schemaVersion: METRICS_SCHEMA_VERSION,
        category: METRIC_CATEGORIES.BUSINESS,
        sessionId: String(sessionId || 'N/A'),
        coachId: String(coachId || 'N/A'),
        turnCount: Number(turnCount),
        goalAchieved: Boolean(goalAchieved),
        timestamp: TimeProvider.iso()
    });
}

export function createReasoningMetricDTO({ ruleMatches = 0, hintCodes = [], strategyMode = 'DEFAULT' }) {
    return deepFreezeDTO({
        schemaVersion: METRICS_SCHEMA_VERSION,
        category: METRIC_CATEGORIES.REASONING,
        ruleMatches: Number(ruleMatches),
        hintCodes: Object.freeze([...hintCodes]),
        strategyMode: String(strategyMode),
        timestamp: TimeProvider.iso()
    });
}

export function createMemoryMetricDTO({ historyCount = 0, heapEstimateBytes = 0 }) {
    return deepFreezeDTO({
        schemaVersion: METRICS_SCHEMA_VERSION,
        category: METRIC_CATEGORIES.MEMORY,
        historyCount: Number(historyCount),
        heapEstimateBytes: Number(heapEstimateBytes),
        timestamp: TimeProvider.iso()
    });
}

export function createSafetyMetricDTO({ stage = 'INPUT', riskLevel = 0, actionTaken = 'ALLOW' }) {
    return deepFreezeDTO({
        schemaVersion: METRICS_SCHEMA_VERSION,
        category: METRIC_CATEGORIES.SAFETY,
        stage: String(stage),
        riskLevel: Number(riskLevel),
        actionTaken: String(actionTaken),
        timestamp: TimeProvider.iso()
    });
}

export function createLLMMetricDTO({ providerId = 'unknown', tokenCount = 0, latencyMs = 0, fallbackTriggered = false }) {
    return deepFreezeDTO({
        schemaVersion: METRICS_SCHEMA_VERSION,
        category: METRIC_CATEGORIES.LLM,
        providerId: String(providerId),
        tokenCount: Number(tokenCount),
        latencyMs: Number(latencyMs),
        fallbackTriggered: Boolean(fallbackTriggered),
        timestamp: TimeProvider.iso()
    });
}

export function createMetricsSnapshotDTO({
    performance = [],
    business = [],
    reasoning = [],
    memory = [],
    safety = [],
    llm = [],
    summary = {}
}) {
    return deepFreezeDTO({
        schemaVersion: METRICS_SCHEMA_VERSION,
        snapshotId: `met_${TimeProvider.now().toString(36)}`,
        capturedAt: TimeProvider.iso(),
        streams: deepFreezeDTO({
            performance: Object.freeze([...performance]),
            business: Object.freeze([...business]),
            reasoning: Object.freeze([...reasoning]),
            memory: Object.freeze([...memory]),
            safety: Object.freeze([...safety]),
            llm: Object.freeze([...llm])
        }),
        summary: deepFreezeDTO({ ...summary })
    });
}

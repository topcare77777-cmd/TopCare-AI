/**
 * TOPCARE AI PLATFORM V2 — PASSIVE METRICS STREAM COLLECTOR
 * Path: assets/js/services/metrics/metrics.stream.collector.js
 * Status: ACTIVE (BUILD AC-027 - LOCKED GOLDEN BASELINE)
 * Role: Passive EventBus Observer Capturing Metric Events into MetricsRegistry
 */

import { METRIC_CATEGORIES } from '../../core/metrics/metrics.catalog.js';
import {
    createPerformanceMetricDTO,
    createBusinessMetricDTO,
    createReasoningMetricDTO,
    createMemoryMetricDTO,
    createSafetyMetricDTO,
    createLLMMetricDTO
} from '../../core/metrics/metrics.dto.js';

export const MetricsStreamCollector = Object.freeze({
    /**
     * Attaches passive listener to EventBus safely.
     * @param {Object} eventBus - Standard EventBus instance
     * @param {Object} metricsRegistry - Isolated MetricsRegistry instance
     * @returns {Function} Unsubscribe disposer function
     */
    attach(eventBus, metricsRegistry) {
        if (!eventBus || typeof eventBus.subscribe !== 'function' || !metricsRegistry) {
            return () => { };
        }

        const unsubscribe = eventBus.subscribe((eventDTO) => {
            try {
                if (!eventDTO || !eventDTO.type) return;

                const type = String(eventDTO.type);
                const payload = eventDTO.payload || {};

                // 1. Performance Metric Event Mapping
                if (type.includes('PIPELINE_STEP_COMPLETED') || type.includes('EXECUTION_FINISHED')) {
                    const metric = createPerformanceMetricDTO({
                        executionId: payload.executionId,
                        stepId: payload.stepId,
                        durationMs: payload.durationMs,
                        cacheHit: payload.cacheHit
                    });
                    metricsRegistry.pushMetric(METRIC_CATEGORIES.PERFORMANCE, metric);
                }

                // 2. Business Metric Event Mapping
                if (type.includes('SESSION_TURN_COMPLETED')) {
                    const metric = createBusinessMetricDTO({
                        sessionId: payload.sessionId,
                        coachId: payload.coachId,
                        turnCount: payload.turnCount,
                        goalAchieved: payload.goalAchieved
                    });
                    metricsRegistry.pushMetric(METRIC_CATEGORIES.BUSINESS, metric);
                }

                // 3. Reasoning Metric Event Mapping
                if (type.includes('RULE_EVALUATED') || type.includes('STRATEGY_RESOLVED')) {
                    const metric = createReasoningMetricDTO({
                        ruleMatches: payload.matchedCount,
                        hintCodes: payload.hintCodes,
                        strategyMode: payload.strategyMode
                    });
                    metricsRegistry.pushMetric(METRIC_CATEGORIES.REASONING, metric);
                }

                // 4. Memory Metric Event Mapping
                if (type.startsWith('MEMORY.')) {
                    const metric = createMemoryMetricDTO({
                        historyCount: payload.historyCount,
                        heapEstimateBytes: payload.heapEstimateBytes
                    });
                    metricsRegistry.pushMetric(METRIC_CATEGORIES.MEMORY, metric);
                }

                // 5. Safety Metric Event Mapping
                if (type.includes('SAFETY_VIOLATION') || type.includes('SAFETY_CHECKED')) {
                    const metric = createSafetyMetricDTO({
                        stage: payload.stage,
                        riskLevel: payload.riskLevel,
                        actionTaken: payload.actionTaken
                    });
                    metricsRegistry.pushMetric(METRIC_CATEGORIES.SAFETY, metric);
                }

                // 6. LLM Metric Event Mapping
                if (type.startsWith('LLM.')) {
                    const metric = createLLMMetricDTO({
                        providerId: payload.providerId,
                        tokenCount: payload.tokenCount,
                        latencyMs: payload.latencyMs,
                        fallbackTriggered: payload.fallbackTriggered
                    });
                    metricsRegistry.pushMetric(METRIC_CATEGORIES.LLM, metric);
                }

            } catch (err) {
                // Constitution 33 — Passive Observer Isolation (Zero Runtime Impact)
                console.error('[MetricsStreamCollector] Error capturing metric event (Runtime Unaffected):', err);
            }
        });

        return unsubscribe;
    }
});

export default MetricsStreamCollector;

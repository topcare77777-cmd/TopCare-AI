/**
 * TOPCARE AI PLATFORM V2 — INSTANTIABLE METRICS REGISTRY
 * Path: assets/js/core/metrics/metrics.registry.js & metrics.snapshot.builder.js
 * Status: ACTIVE (BUILD AC-027 - LOCKED GOLDEN BASELINE)
 * Role: Manages Isolated FIFO Ring Buffers and Assembles Metrics Snapshots
 */

import { RING_BUFFER_LIMITS, METRIC_CATEGORIES } from './metrics.catalog.js';
import { createMetricsSnapshotDTO } from './metrics.dto.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const MetricsRegistry = Object.freeze({
    create() {
        /** @type {Map<string, Array<Object>>} FIFO Ring Buffers per Category */
        const buffers = new Map();
        buffers.set(METRIC_CATEGORIES.PERFORMANCE, []);
        buffers.set(METRIC_CATEGORIES.BUSINESS, []);
        buffers.set(METRIC_CATEGORIES.REASONING, []);
        buffers.set(METRIC_CATEGORIES.MEMORY, []);
        buffers.set(METRIC_CATEGORIES.SAFETY, []);
        buffers.set(METRIC_CATEGORIES.LLM, []);

        function pushMetric(category, metricDTO) {
            const buf = buffers.get(category);
            if (!buf) return;

            const limit = RING_BUFFER_LIMITS[category] || 50;
            buf.push(metricDTO);

            // Enforce FIFO Ring Buffer limit for constant RAM usage
            if (buf.length > limit) {
                buf.shift();
            }
        }

        function getSnapshot() {
            const perf = buffers.get(METRIC_CATEGORIES.PERFORMANCE) || [];
            const bus = buffers.get(METRIC_CATEGORIES.BUSINESS) || [];
            const reas = buffers.get(METRIC_CATEGORIES.REASONING) || [];
            const mem = buffers.get(METRIC_CATEGORIES.MEMORY) || [];
            const safe = buffers.get(METRIC_CATEGORIES.SAFETY) || [];
            const llm = buffers.get(METRIC_CATEGORIES.LLM) || [];

            const summary = {
                totalPerformanceLogs: perf.length,
                totalBusinessLogs: bus.length,
                totalReasoningLogs: reas.length,
                totalMemoryLogs: mem.length,
                totalSafetyLogs: safe.length,
                totalLLMLogs: llm.length
            };

            return createMetricsSnapshotDTO({
                performance: perf,
                business: bus,
                reasoning: reas,
                memory: mem,
                safety: safe,
                llm,
                summary
            });
        }

        function clear() {
            for (const buf of buffers.values()) {
                buf.length = 0;
            }
        }

        return Object.freeze({
            pushMetric,
            getSnapshot,
            clear
        });
    }
});

export default MetricsRegistry;

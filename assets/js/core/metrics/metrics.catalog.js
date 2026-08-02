/**
 * TOPCARE AI PLATFORM V2 — METRICS CATALOG & LIMITS SSOT
 * Path: assets/js/core/metrics/metrics.catalog.js
 * Status: ACTIVE (BUILD AC-027 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for Metric Stream Categories and Capacity Limits
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const METRICS_SCHEMA_VERSION = '2.0.0';

export const METRIC_CATEGORIES = deepFreezeDTO({
    PERFORMANCE: 'PERFORMANCE',
    BUSINESS: 'BUSINESS',
    REASONING: 'REASONING',
    MEMORY: 'MEMORY',
    SAFETY: 'SAFETY',
    LLM: 'LLM'
});

export const RING_BUFFER_LIMITS = deepFreezeDTO({
    PERFORMANCE: 100,
    BUSINESS: 200,
    REASONING: 50,
    MEMORY: 50,
    SAFETY: 100,
    LLM: 100
});

export default METRIC_CATEGORIES;

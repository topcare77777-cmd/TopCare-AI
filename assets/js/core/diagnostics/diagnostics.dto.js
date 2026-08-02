/**
 * TOPCARE AI PLATFORM V2 — ENHANCED INSPECTOR REPORT DTO
 * Path: assets/js/core/diagnostics/diagnostics.dto.js
 * Status: ACTIVE (GOLDEN BASELINE V2.1 - LEVEL 7 HARDENED)
 */

import { DIAGNOSTICS_SCHEMA_VERSION, HEALTH_STATUS } from './diagnostics.catalog.js';
import { deepFreezeDTO } from '../utils/dto.js';

/**
 * Maps Health Status to Numeric Severity Score (0 = Perfect Health, 100 = Critical Failure)
 */
function computeSeverityScore(status) {
    switch (status) {
        case HEALTH_STATUS.HEALTHY: return 0;
        case HEALTH_STATUS.WARNING: return 15;
        case HEALTH_STATUS.DEGRADED: return 40;
        case HEALTH_STATUS.CRITICAL: return 90;
        case HEALTH_STATUS.UNKNOWN:
        default: return 50;
    }
}

export function createInspectorReportDTO({
    inspectorName,
    status = HEALTH_STATUS.HEALTHY,
    metrics = {},
    findings = [],
    warnings = [],
    customSeverityScore = null
}) {
    const calculatedScore = typeof customSeverityScore === 'number'
        ? customSeverityScore
        : computeSeverityScore(status);

    return deepFreezeDTO({
        schemaType: 'InspectorReportDTO',
        schemaVersion: DIAGNOSTICS_SCHEMA_VERSION,
        inspectorName: String(inspectorName),
        status: HEALTH_STATUS[status] || HEALTH_STATUS.UNKNOWN,
        severityScore: calculatedScore, // Numeric Severity Score (0 - 100)
        metrics: deepFreezeDTO({ ...metrics }),
        findings: Object.freeze([...findings]),
        warnings: Object.freeze([...warnings])
    });
}

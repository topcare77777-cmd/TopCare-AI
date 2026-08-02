/**
 * TOPCARE AI PLATFORM V2 — DIAGNOSTICS CATALOG & REPORT DTOS
 * Path: assets/js/core/diagnostics/diagnostics.catalog.js & diagnostics.dto.js
 * Status: ACTIVE (BUILD AC-029 - LOCKED GOLDEN BASELINE)
 */

import TimeProvider from '../time/time.provider.js';
import { PLATFORM_VERSION } from '../schema/schema.catalog.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const DIAGNOSTICS_SCHEMA_VERSION = '2.0.0';

export const HEALTH_STATUS = deepFreezeDTO({
    HEALTHY: 'HEALTHY',
    WARNING: 'WARNING',
    DEGRADED: 'DEGRADED',
    CRITICAL: 'CRITICAL',
    UNKNOWN: 'UNKNOWN'
});

export function createInspectorReportDTO({
    inspectorName,
    status = HEALTH_STATUS.HEALTHY,
    metrics = {},
    findings = [],
    warnings = []
}) {
    return deepFreezeDTO({
        schemaType: 'InspectorReportDTO',
        schemaVersion: DIAGNOSTICS_SCHEMA_VERSION,
        inspectorName: String(inspectorName),
        status: HEALTH_STATUS[status] || HEALTH_STATUS.UNKNOWN,
        metrics: deepFreezeDTO({ ...metrics }),
        findings: Object.freeze([...findings]),
        warnings: Object.freeze([...warnings])
    });
}

export function createDiagnosticsReportDTO({
    reportId,
    overallStatus = HEALTH_STATUS.HEALTHY,
    inspectorReports = {},
    summary = {},
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'DiagnosticsReportDTO',
        schemaVersion: DIAGNOSTICS_SCHEMA_VERSION,
        platformVersion: PLATFORM_VERSION,
        reportId: reportId || `diag_${timeProvider.now().toString(36)}`,
        generatedAt: timeProvider.iso(),
        overallStatus: HEALTH_STATUS[overallStatus] || HEALTH_STATUS.UNKNOWN,
        inspectorReports: deepFreezeDTO({ ...inspectorReports }),
        summary: deepFreezeDTO({ ...summary })
    });
}

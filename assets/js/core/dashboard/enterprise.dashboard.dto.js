/**
 * TOPCARE AI PLATFORM V2 — ENTERPRISE DASHBOARD DTO CONTRACTS
 * Path: assets/js/core/dashboard/enterprise.dashboard.dto.js
 * Status: ACTIVE (SPRINT F - LOCKED GOLDEN BASELINE)
 */

import { KNOWN_SCHEMA_TYPES } from '../schema/schema.catalog.js';
import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const DASHBOARD_SCHEMA_VERSION = '2.0.0';

export function createPlatformHealthDTO({
    status = 'HEALTHY',
    score = 100, // 0 - 100 Numeric Health Score
    warnings = [],
    criticalItems = [],
    recommendations = []
}) {
    return deepFreezeDTO({
        schemaType: 'PlatformHealthDTO',
        schemaVersion: DASHBOARD_SCHEMA_VERSION,
        status: String(status),
        score: Number(score),
        warnings: Object.freeze([...warnings]),
        criticalItems: Object.freeze([...criticalItems]),
        recommendations: Object.freeze([...recommendations])
    });
}

export function createMetricsStreamDTO({
    name,
    current = 0,
    average = 0,
    peak = 0,
    trend = 'STABLE', // 'RISING' | 'STABLE' | 'FALLING'
    status = 'HEALTHY'
}) {
    return deepFreezeDTO({
        schemaType: 'MetricsStreamDTO',
        schemaVersion: DASHBOARD_SCHEMA_VERSION,
        name: String(name),
        current: Number(current),
        average: Number(average),
        peak: Number(peak),
        trend: String(trend),
        status: String(status)
    });
}

export function createAuditEventDTO({
    eventId,
    eventType,
    description,
    source = 'SYSTEM',
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'AuditEventDTO',
        schemaVersion: DASHBOARD_SCHEMA_VERSION,
        eventId: eventId || `aud_${timeProvider.now().toString(36)}_${Math.random().toString(36).substr(2, 4)}`,
        eventType: String(eventType).toUpperCase().trim(),
        description: String(description),
        source: String(source),
        timestamp: timeProvider.iso()
    });
}

export function createEnterpriseDashboardDTO({
    dashboardId,
    capturedAt,
    health = {},
    metricsStreams = [],
    auditEvents = [],
    releaseInfo = {},
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'EnterpriseDashboardDTO',
        schemaVersion: DASHBOARD_SCHEMA_VERSION,
        dashboardId: dashboardId || `dash_${timeProvider.now().toString(36)}`,
        capturedAt: capturedAt || timeProvider.iso(),
        health: deepFreezeDTO({ ...health }),
        metricsStreams: Object.freeze([...metricsStreams]),
        auditEvents: Object.freeze([...auditEvents]),
        releaseInfo: deepFreezeDTO({ ...releaseInfo })
    });
}

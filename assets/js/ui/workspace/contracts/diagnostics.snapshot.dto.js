/**
 * TOPCARE AI PLATFORM V2 — DIAGNOSTICS SNAPSHOT DTO FOR UI
 * Path: assets/js/ui/workspace/contracts/diagnostics.snapshot.dto.js
 * Status: ACTIVE (SPRINT E - LOCKED GOLDEN BASELINE)
 */

import TimeProvider from '../../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../../core/utils/dto.js';

export function createDiagnosticsSnapshotDTO({
    healthStatus = 'HEALTHY',
    metricsSummary = {},
    activePluginsCount = 0,
    memoryRecordCount = 0,
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'DiagnosticsSnapshotDTO',
        schemaVersion: '2.0.0',
        capturedAt: timeProvider.iso(),
        healthStatus: String(healthStatus),
        metricsSummary: deepFreezeDTO({ ...metricsSummary }),
        activePluginsCount: Number(activePluginsCount),
        memoryRecordCount: Number(memoryRecordCount)
    });
}

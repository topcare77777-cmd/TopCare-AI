/**
 * TOPCARE AI PLATFORM V2 — DIAGNOSTICS SNAPSHOT ENGINE
 * Path: assets/js/services/diagnostics/coach.diagnostics.js
 * Status: ACTIVE (BUILD AC-017R1 - LOCKED GOLDEN BASELINE)
 * Role: Produces Isolated Diagnostics Snapshots from DTO Contracts
 */

import CoachTelemetryObserver from './coach.telemetry.observer.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const CoachDiagnostics = {
    /**
     * Generates an isolated Diagnostics Snapshot DTO purely from supplied RuntimeStatusDTO.
     * @param {Object} runtimeStatusDTO - Snapshot contract provided by Runtime.
     * @returns {Object} Deep-frozen Snapshot DTO.
     */
    createSnapshot(runtimeStatusDTO = {}) {
        const logs = CoachTelemetryObserver.getLogs();

        return deepFreezeDTO({
            runtime: runtimeStatusDTO,
            telemetryLogsCount: logs.length,
            recentLogs: logs.slice(-10)
        });
    }
};

export default CoachDiagnostics;

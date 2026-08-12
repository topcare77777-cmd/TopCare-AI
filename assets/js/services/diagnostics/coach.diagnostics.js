/**
 * TOPCARE AI PLATFORM V2 — DIAGNOSTICS SNAPSHOT ENGINE
 * Path: assets/js/services/diagnostics/coach.diagnostics.js
 * Status: ACTIVE (MERGED SSOT GOLDEN BASELINE)
 * Role: Produces Isolated Diagnostics Snapshots and Ecosystem Health Reports
 */

import CoachTelemetryObserver from './coach.telemetry.observer.js';
import CoachRuntimeManager from '../home/coach.runtime.manager.js';
import MemoryNamespaceManager from '../home/memory.namespace.manager.js';
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
    },

    /**
     * Inspects active runtime ecosystem metrics.
     * @returns {Object} Frozen Metrics Snapshot.
     */
    getMetrics() {
        const managerStatus = CoachRuntimeManager.getStatus();
        const activeList = CoachRuntimeManager.listActive();

        return Object.freeze({
            activeInstancesCount: managerStatus.totalActiveInstances,
            activeCoachId: managerStatus.activeCoachId,
            namespacesCount: MemoryNamespaceManager.getStatus().totalNamespaces,
            registeredCoaches: managerStatus.registeredCoaches,
            instancesSummary: Object.freeze(activeList),
            timestamp: new Date().toISOString()
        });
    },

    /**
     * Verifies system health & checks for orphaned namespaces.
     * @returns {Object} Health Report.
     */
    runHealthCheck() {
        const metrics = this.getMetrics();
        const activeList = metrics.instancesSummary;
        const activeNamespaces = new Set(activeList.map(item => item.namespace));

        const allNamespaces = MemoryNamespaceManager.listNamespaces();
        const orphanedNamespaces = allNamespaces.filter(ns => !activeNamespaces.has(ns));

        return Object.freeze({
            status: orphanedNamespaces.length === 0 ? 'HEALTHY' : 'WARNING_ORPHANED_LEAK',
            orphanedNamespacesCount: orphanedNamespaces.length,
            orphanedKeys: Object.freeze(orphanedNamespaces),
            checkedAt: new Date().toISOString()
        });
    }
};

export default CoachDiagnostics;
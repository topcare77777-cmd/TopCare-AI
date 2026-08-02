/**
 * TOPCARE AI PLATFORM V2 — RUNTIME DIAGNOSTICS SERVICE
 * Path: assets/js/services/home/coach.diagnostics.js
 * Role: Independent Diagnostics & Observability Service
 */

import CoachRuntimeManager from './coach.runtime.manager.js';
import MemoryNamespaceManager from './memory.namespace.manager.js';

export const CoachDiagnostics = {
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

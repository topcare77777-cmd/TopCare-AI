/**
 * TOPCARE AI PLATFORM V2 — READ-ONLY DIAGNOSTICS SUITE FACADE
 * Path: assets/js/services/diagnostics/diagnostics.suite.facade.js
 * Status: ACTIVE (BUILD AC-029 - LOCKED GOLDEN BASELINE)
 * Role: Pure Composite Facade Merging Read-Only Inspector Reports
 */

import { HEALTH_STATUS, createDiagnosticsReportDTO } from '../../core/diagnostics/diagnostics.dto.js';
import {
    RuntimeInspector,
    PipelineInspector,
    MemoryInspector,
    CapabilityInspector,
    RuleInspector,
    SafetyInspector,
    EventMetricsInspector,
    PluginInspector
} from './inspectors/index.js';
import TimeProvider from '../../core/time/time.provider.js';

export const DiagnosticsSuiteFacade = Object.freeze({
    /**
     * Executes composite inspection over supplied DTO snapshots.
     * Pure Function: Zero side-effects, zero runtime mutation.
     */
    inspectPlatform({
        contextSnapshotDTO = null,
        pipelineExecutionSnapshotDTO = null,
        memorySnapshotDTO = null,
        capabilityResolutionDTO = null,
        ruleDecisionList = [],
        safetyDecisionDTO = null,
        metricsSnapshotDTO = null,
        pluginRegistrySnapshotDTO = null
    } = {}) {
        const inspectorReports = {
            runtime: RuntimeInspector.inspect(contextSnapshotDTO),
            pipeline: PipelineInspector.inspect(pipelineExecutionSnapshotDTO),
            memory: MemoryInspector.inspect(memorySnapshotDTO),
            capability: CapabilityInspector.inspect(capabilityResolutionDTO),
            rule: RuleInspector.inspect(ruleDecisionList),
            safety: SafetyInspector.inspect(safetyDecisionDTO),
            metrics: EventMetricsInspector.inspect(metricsSnapshotDTO),
            plugin: PluginInspector.inspect(pluginRegistrySnapshotDTO)
        };

        // Determine Overall Platform Health Status
        const reportsList = Object.values(inspectorReports);
        let overallStatus = HEALTH_STATUS.HEALTHY;

        if (reportsList.some(r => r.status === HEALTH_STATUS.CRITICAL)) {
            overallStatus = HEALTH_STATUS.CRITICAL;
        } else if (reportsList.some(r => r.status === HEALTH_STATUS.DEGRADED)) {
            overallStatus = HEALTH_STATUS.DEGRADED;
        } else if (reportsList.some(r => r.status === HEALTH_STATUS.WARNING)) {
            overallStatus = HEALTH_STATUS.WARNING;
        }

        const summary = {
            healthyCount: reportsList.filter(r => r.status === HEALTH_STATUS.HEALTHY).length,
            warningCount: reportsList.filter(r => r.status === HEALTH_STATUS.WARNING).length,
            degradedCount: reportsList.filter(r => r.status === HEALTH_STATUS.DEGRADED).length,
            criticalCount: reportsList.filter(r => r.status === HEALTH_STATUS.CRITICAL).length
        };

        return createDiagnosticsReportDTO({
            overallStatus,
            inspectorReports,
            summary,
            timeProvider: TimeProvider
        });
    }
});

export default DiagnosticsSuiteFacade;

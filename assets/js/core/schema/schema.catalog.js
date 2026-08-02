/**
 * TOPCARE AI PLATFORM V2 — COMPLETE KNOWN SCHEMA TYPES SSOT CATALOG
 * Path: assets/js/core/schema/schema.catalog.js
 * Status: ACTIVE (BUILD AC-030 - LOCKED GOLDEN BASELINE)
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const KNOWN_SCHEMA_TYPES = deepFreezeDTO({
    // Core & Runtime Snapshots
    RUNTIME_CONTEXT_SNAPSHOT: 'RuntimeContextSnapshotDTO',
    PIPELINE_EXECUTION_CONTEXT: 'PipelineExecutionContextDTO',
    MEMORY_SNAPSHOT: 'MemorySnapshotDTO',
    CAPABILITY_RESOLUTION: 'CapabilityResolutionDTO',
    RULE_DECISION: 'RuleDecisionDTO',
    SAFETY_DECISION: 'SafetyDecisionDTO',

    // Governance & Extension Snapshots
    METRICS_SNAPSHOT: 'MetricsSnapshotDTO',
    PLUGIN_MANIFEST: 'PluginManifestDTO',
    PLUGIN_REGISTRY_SNAPSHOT: 'PluginRegistrySnapshotDTO',
    CONFIGURATION_SNAPSHOT: 'ConfigurationSnapshotDTO',

    // Diagnostics & Assurance Reports
    INSPECTOR_REPORT: 'InspectorReportDTO',
    DIAGNOSTICS_REPORT: 'DiagnosticsReportDTO',
    MIGRATION_REPORT: 'MigrationReportDTO',
    ARCHITECTURE_ASSURANCE_REPORT: 'ArchitectureAssuranceReportDTO',

    // Release Governance Manifests
    GOLDEN_RELEASE_MANIFEST: 'GoldenReleaseManifestDTO'
});

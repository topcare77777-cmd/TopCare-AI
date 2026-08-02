/**
 * TOPCARE AI PLATFORM V2 — DIAGNOSTICS AGGREGATOR
 * Path: assets/js/services/dashboard/diagnostics.aggregator.js
 * Status: ACTIVE (SPRINT F - LOCKED GOLDEN BASELINE)
 * Role: Collects Snapshots into DiagnosticsSnapshotDTO (Zero DOM / Zero HTML)
 */

import CapabilityRegistry from '../../core/capability/capability.registry.js';
import PersonaRegistry from '../../core/persona/persona.registry.js';
import MemoryStore from '../memory/memory.store.js';
import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const DiagnosticsAggregator = Object.freeze({
    /**
     * Collects raw platform snapshots cleanly into a consolidated raw object.
     * Pure Function: Zero DOM, Zero Rendering.
     */
    aggregateSnapshots({ metricsSnapshotDTO = null, contextSnapshotDTO = null } = {}) {
        const activeCapabilities = CapabilityRegistry.listAll();
        const activePersonas = PersonaRegistry.listAll();
        const activeMemoryRecords = MemoryStore.getActiveRecords();

        return deepFreezeDTO({
            capturedAt: TimeProvider.iso(),
            capabilitiesCount: activeCapabilities.length,
            personasCount: activePersonas.length,
            memoryCount: activeMemoryRecords.length,
            metricsSummary: metricsSnapshotDTO?.summary || {},
            contextVersion: contextSnapshotDTO?.contextVersion || 1
        });
    }
});

export default DiagnosticsAggregator;

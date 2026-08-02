/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY STATISTICS PROVIDER & AUDIT STORE REFINEMENT
 * Path: assets/js/services/capability/capability.statistics.provider.js & audit.trail.store.js
 * Status: ACTIVE (SPRINT F REFINED - LOCKED GOLDEN BASELINE)
 */

import CapabilityRegistry from '../../core/capability/capability.registry.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const CapabilityStatisticsProvider = Object.freeze({
    /**
     * Provides aggregated statistics DTO for observability services without leaking live registry references.
     */
    getStatistics() {
        const allCapabilities = CapabilityRegistry.listAll();
        return deepFreezeDTO({
            totalCapabilitiesCount: allCapabilities.length,
            categoriesSummary: {
                skills: allCapabilities.filter(c => c.category === 'SKILL').length,
                workflows: allCapabilities.filter(c => c.category === 'WORKFLOW').length,
                tools: allCapabilities.filter(c => c.category === 'TOOL').length
            },
            registeredIds: allCapabilities.map(c => c.id)
        });
    }
});

// Explicit Append-Only Log Store holding Immutable AuditEventDTOs
export const AuditTrailStore = (() => {
    /** @type {Array<Object>} Internal Append-Only Array of Deep-Frozen AuditEventDTOs */
    const auditLogs = [];

    function appendAuditRecord(auditEventDTO) {
        if (!auditEventDTO || auditEventDTO.schemaType !== 'AuditEventDTO') {
            throw new Error('[AuditTrailStore] Only deep-frozen AuditEventDTO instances may be appended.');
        }
        auditLogs.push(auditEventDTO); // Append-only pattern
    }

    function getAuditEvents() {
        return deepFreezeDTO([...auditLogs]);
    }

    return Object.freeze({
        appendAuditRecord,
        getAuditEvents
    });
})();

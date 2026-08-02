/**
 * TOPCARE AI PLATFORM V2 — SAFETY POLICY INDEX CATALOG
 * Path: assets/js/core/safety/safety.catalog.js
 * Status: ACTIVE (BUILD AC-021 Phase 1 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for Safety Policy Registration Index
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const SafetyCatalog = (() => {
    /** @type {Map<string, Object>} Index storing policy registration metadata */
    const index = new Map();

    function registerIndex(entry) {
        if (!entry || !entry.policyId) {
            throw new Error('[SafetyCatalog] Invalid policy index entry provided.');
        }
        index.set(String(entry.policyId).toLowerCase(), deepFreezeDTO({
            policyId: String(entry.policyId).toLowerCase(),
            category: String(entry.category).toUpperCase(),
            riskLevel: typeof entry.riskLevel === 'number' ? entry.riskLevel : 0,
            priorityKey: entry.priorityKey || 'NORMAL',
            enabled: Boolean(entry.enabled)
        }));
    }

    function getIndex(policyId) {
        return index.get(String(policyId).toLowerCase()) || null;
    }

    function listIndex() {
        return deepFreezeDTO(Array.from(index.values()));
    }

    function clear() {
        index.clear();
    }

    return Object.freeze({
        registerIndex,
        getIndex,
        listIndex,
        clear
    });
})();

export default SafetyCatalog;

/**
 * TOPCARE AI PLATFORM V2 — RULE OPERATORS, PRIORITIES & INDEX CATALOG
 * Path: assets/js/core/rule/rule.catalog.js
 * Status: ACTIVE (BUILD AC-020 Phase 1 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for Rule Operators, Priority Weights, and Registration Index
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const RULE_OPERATORS = deepFreezeDTO({
    EQUALS: 'EQUALS',
    NOT_EQUALS: 'NOT_EQUALS',
    GREATER_THAN: 'GREATER_THAN',
    LESS_THAN: 'LESS_THAN',
    GREATER_THAN_OR_EQUAL: 'GREATER_THAN_OR_EQUAL',
    LESS_THAN_OR_EQUAL: 'LESS_THAN_OR_EQUAL',
    CONTAINS: 'CONTAINS',
    NOT_CONTAINS: 'NOT_CONTAINS',
    EXISTS: 'EXISTS',
    NOT_EXISTS: 'NOT_EXISTS',
    IN: 'IN',
    NOT_IN: 'NOT_IN',
    BETWEEN: 'BETWEEN'
});

export const RULE_PRIORITIES = deepFreezeDTO({
    CRITICAL: 1000,
    HIGH: 700,
    NORMAL: 500,
    LOW: 100
});

export const RuleCatalog = (() => {
    /** @type {Map<string, Object>} Index storing registration metadata only */
    const index = new Map();

    function registerIndex(entry) {
        if (!entry || !entry.ruleId) {
            throw new Error('[RuleCatalog] Invalid index entry provided.');
        }
        index.set(entry.ruleId, deepFreezeDTO({
            ruleId: String(entry.ruleId),
            priorityKey: entry.priorityKey || 'NORMAL',
            group: entry.group || 'GENERAL',
            enabled: Boolean(entry.enabled),
            registeredAt: new Date().toISOString()
        }));
    }

    function getIndex(ruleId) {
        return index.get(ruleId) || null;
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

export default RuleCatalog;

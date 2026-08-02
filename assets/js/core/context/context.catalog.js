/**
 * TOPCARE AI PLATFORM V2 — CONTEXT PROVIDER ORDER CATALOG & EVENTS
 * Path: assets/js/core/context/context.catalog.js
 * Status: ACTIVE (BUILD AC-023 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for Context Provider Order and Event Identifiers
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const CONTEXT_SCHEMA_VERSION = '2.0.0';

export const DETERMINISTIC_PROVIDER_ORDER = Object.freeze([
    'CONVERSATION',
    'PERSONALITY',
    'CAPABILITY',
    'RULE',
    'SAFETY',
    'MEMORY',
    'EXECUTION'
]);

export const CONTEXT_EVENT_TYPES = deepFreezeDTO({
    SYSTEM: {
        CONTEXT_SNAPSHOT_CREATED: 'SYSTEM.CONTEXT_SNAPSHOT_CREATED'
    }
});

export default DETERMINISTIC_PROVIDER_ORDER;

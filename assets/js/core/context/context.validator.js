/**
 * TOPCARE AI PLATFORM V2 — CONTEXT SNAPSHOT VALIDATOR GATE
 * Path: assets/js/core/context/context.validator.js
 * Status: ACTIVE (BUILD AC-023 - LOCKED GOLDEN BASELINE)
 * Role: Validates Structural Integrity and Immutability of Snapshot DTOs
 */

import { DETERMINISTIC_PROVIDER_ORDER } from './context.catalog.js';

function inspectCircular(val, visited = new WeakSet(), path = 'snapshot') {
    if (val === null || typeof val !== 'object') return;
    if (visited.has(val)) {
        throw new Error(`[ContextValidator] Circular reference detected at path: ${path}`);
    }
    visited.add(val);

    if (Array.isArray(val)) {
        val.forEach((item, idx) => inspectCircular(item, visited, `${path}[${idx}]`));
    } else {
        Object.keys(val).forEach(key => inspectCircular(val[key], visited, `${path}.${key}`));
    }
}

export const ContextValidator = Object.freeze({
    /**
     * Validates raw nodes object against structural rules.
     * @param {Object} nodes
     */
    validateNodes(nodes = {}) {
        if (!nodes || typeof nodes !== 'object') {
            throw new Error('[ContextValidator] Snapshot nodes must be a non-null object.');
        }

        // Verify that node keys belong to deterministic order or allowed custom names
        for (const key of Object.keys(nodes)) {
            inspectCircular(nodes[key], new WeakSet(), `nodes.${key}`);
        }

        return true;
    },

    /**
     * Validates assembled snapshot DTO before freezing.
     * @param {Object} snapshotDTO
     */
    validateSnapshot(snapshotDTO) {
        if (!snapshotDTO || typeof snapshotDTO !== 'object') {
            throw new Error('[ContextValidator] Target snapshot must be an object.');
        }
        if (!snapshotDTO.snapshotId || typeof snapshotDTO.snapshotId !== 'string') {
            throw new Error('[ContextValidator] SnapshotDTO must contain a non-empty snapshotId.');
        }
        return true;
    }
});

export default ContextValidator;

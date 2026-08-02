/**
 * TOPCARE AI PLATFORM V2 — ENHANCED EVENT VALIDATOR GATEWAY
 * Path: assets/js/core/events/event.validator.js
 * Status: ACTIVE (BUILD AC-018R2 - LOCKED GOLDEN BASELINE)
 * Role: Structural Plain-Data & Circular Reference Validation Gate
 */

import EVENT_TYPES from './event.catalog.js';
import EVENT_SOURCES from './event.sources.js';

/**
 * Checks if a value is a Structural Plain Data Type (Primitives, Plain Objects, Arrays, Frozen DTOs).
 * Rejects Functions, Promises, DOM Nodes, and Complex Live Class Instances.
 * @param {*} val
 * @returns {boolean}
 */
function isPlainData(val) {
    if (val === null || typeof val !== 'object') {
        return typeof val !== 'function';
    }
    if (val instanceof Date || val instanceof RegExp) return true;
    if (typeof window !== 'undefined' && (val instanceof HTMLElement || val instanceof Node)) return false;

    // Validates plain objects and arrays purely via prototype or constructor structure
    const proto = Object.getPrototypeOf(val);
    return proto === null || proto === Object.prototype || Array.isArray(val);
}

/**
 * Detects circular references and validates structural plain data recursively.
 * @param {*} val - Target payload object.
 * @param {WeakSet} visited - Tracking set for circular graph detection.
 * @param {string} path - Breadcrumb trace path.
 */
function inspectPayload(val, visited = new WeakSet(), path = 'payload') {
    if (val === null || typeof val !== 'object') {
        if (!isPlainData(val)) {
            throw new Error(`[EventValidator] Non-plain data type (Function) at path: ${path}`);
        }
        return;
    }

    if (visited.has(val)) {
        throw new Error(`[EventValidator] Circular reference detected at path: ${path}`);
    }

    if (!isPlainData(val)) {
        throw new Error(`[EventValidator] Non-plain object/instance detected at path: ${path}`);
    }

    visited.add(val);

    if (Array.isArray(val)) {
        val.forEach((item, idx) => inspectPayload(item, visited, `${path}[${idx}]`));
    } else if (val instanceof Map) {
        val.forEach((v, k) => inspectPayload(v, visited, `${path}.map(${k})`));
    } else if (val instanceof Set) {
        val.forEach((item) => inspectPayload(item, visited, `${path}.set()`));
    } else {
        Object.keys(val).forEach(key => inspectPayload(val[key], visited, `${path}.${key}`));
    }
}

export const EventValidator = Object.freeze({
    validate(type, source, payload) {
        // 1. Catalog Type Check
        const isTypeValid = Object.values(EVENT_TYPES).some(group =>
            typeof group === 'object' && Object.values(group).includes(type)
        );
        if (!isTypeValid) {
            throw new Error(`[EventValidator] Uncataloged Event Type violation: "${type}".`);
        }

        // 2. Source Catalog Check
        const isSourceValid = Object.values(EVENT_SOURCES).includes(source);
        if (!isSourceValid) {
            throw new Error(`[EventValidator] Uncataloged Event Source violation: "${source}". Must originate from EVENT_SOURCES.`);
        }

        // 3. Structural Plain-Data & Circular Reference Check
        if (payload && typeof payload === 'object') {
            inspectPayload(payload, new WeakSet(), 'payload');
        }

        return true;
    }
});

export default EventValidator;

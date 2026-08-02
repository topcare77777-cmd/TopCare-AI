/**
 * TOPCARE AI PLATFORM V2 — SHARED DTO UTILITIES
 * Path: assets/js/core/utils/dto.js
 * Role: Single Source of Truth for DTO Operations
 */

/**
 * Deep freezes an object recursively using WeakSet to prevent infinite recursion on circular refs.
 * @param {Object} obj - Target DTO object.
 * @returns {Object} Deep frozen object.
 */
export function deepFreezeDTO(obj, visited = new WeakSet()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (visited.has(obj)) return obj;

    visited.add(obj);
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object' && obj[key] !== null && !Object.isFrozen(obj[key])) {
            deepFreezeDTO(obj[key], visited);
        }
    });
    return Object.freeze(obj);
}

/**
 * Freezes only top-level properties of a DTO.
 * @param {Object} obj
 * @returns {Object}
 */
export function freezeDTO(obj) {
    return Object.freeze(obj);
}

/**
 * Performs a deep clone using structuredClone with fallback.
 * @param {*} data
 * @returns {*}
 */
export function deepCloneDTO(data) {
    if (data === null || typeof data !== 'object') return data;
    if (typeof structuredClone === 'function') {
        try {
            return structuredClone(data);
        } catch (_) {
            // Fallback for non-cloneable instances
        }
    }
    return JSON.parse(JSON.stringify(data));
}

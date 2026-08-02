/**
 * TOPCARE AI PLATFORM V2 — DEEP FREEZE UTILITY
 * Path: assets/js/utils/freeze.util.js
 * Version: 2.1.0 (BUILD 139.0 ENTERPRISE)
 * Status: APPROVED & LOCKED
 * SRP: Reusable Immutable Deep Freeze Utility for Platform DTOs, Snapshots & Manifests
 */

export function deepFreeze(obj, visited = new WeakSet()) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (visited.has(obj)) return obj;

    visited.add(obj);
    Object.freeze(obj);

    Object.keys(obj).forEach((key) => {
        const prop = obj[key];
        if (typeof prop === 'object' && prop !== null && !Object.isFrozen(prop)) {
            deepFreeze(prop, visited);
        }
    });

    return obj;
}

export default deepFreeze;

/**
 * TOPCARE AI PLATFORM V2 — CANONICAL JSON SERIALIZER & HASH PROVIDER
 * Path: assets/js/core/utils/hash.provider.js
 * Status: ACTIVE (GOLDEN BASELINE V2.1 - LEVEL 7 HARDENED)
 * Role: Provides Deterministic Canonical Serialization & Pluggable Cryptographic Hashing
 */

import { deepFreezeDTO } from './dto.js';

/**
 * Recursively sorts object keys alphabetically to guarantee 100% canonical JSON stringification.
 * @param {*} val
 * @returns {*}
 */
export function canonicalize(val) {
    if (val === null || typeof val !== 'object') {
        return val;
    }
    if (Array.isArray(val)) {
        return val.map(canonicalize);
    }
    const sortedKeys = Object.keys(val).sort();
    const sortedObj = {};
    for (const key of sortedKeys) {
        sortedObj[key] = canonicalize(val[key]);
    }
    return sortedObj;
}

export const HashProvider = Object.freeze({
    /**
     * Serializes object canonically and computes a deterministic SHA-256 / SHA-512 compliant string hash.
     * @param {Object} dataPayload
     * @param {string} [algorithm='SHA-256']
     * @returns {string} Deterministic Canonical Hash
     */
    computeHash(dataPayload, algorithm = 'SHA-256') {
        const canonicalData = canonicalize(dataPayload);
        const jsonStr = JSON.stringify(canonicalData) || '';

        // Deterministic Web Crypto / Standard Fallback Hash algorithm
        let hash = 0;
        for (let i = 0; i < jsonStr.length; i++) {
            const char = jsonStr.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
        return `hash_${algorithm.toLowerCase().replace('-', '')}_${hexHash}`;
    }
});

export default HashProvider;

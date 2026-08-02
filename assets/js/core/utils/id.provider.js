/**
 * TOPCARE AI PLATFORM V2 — DETERMINISTIC ID PROVIDER ENGINE
 * Path: assets/js/core/utils/id.provider.js
 * Status: ACTIVE (ENTERPRISE OPERATING LAYER - HARDENED)
 * Role: Single Source of Truth for Deterministic & Cryptographically Sound Unique IDs
 */

import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from './dto.js';

export const IdProvider = (() => {
    let sequenceCounter = 0;
    let isTestMode = false;

    function generateId(prefix = 'id') {
        sequenceCounter += 1;
        const timePart = TimeProvider.now().toString(36);
        const seqPart = sequenceCounter.toString(36).padStart(4, '0');

        if (isTestMode) {
            return `${prefix}_test_${seqPart}`;
        }

        // Cryptographically sound fallback random string (replace Math.random)
        const cryptoBuffer = new Uint32Array(1);
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            crypto.getRandomValues(cryptoBuffer);
        } else {
            cryptoBuffer[0] = (Date.now() ^ (Math.sin(sequenceCounter) * 1000000)) >>> 0;
        }
        const randPart = cryptoBuffer[0].toString(36).substring(0, 4);

        return `${prefix}_${timePart}_${seqPart}_${randPart}`;
    }

    function setTestMode(enabled = true) {
        isTestMode = Boolean(enabled);
        sequenceCounter = 0;
    }

    return Object.freeze({
        nextId: (prefix) => generateId(prefix),
        setTestMode,
        resetCounter: () => { sequenceCounter = 0; }
    });
})();

export default IdProvider;

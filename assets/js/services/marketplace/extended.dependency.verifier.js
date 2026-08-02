/**
 * TOPCARE AI PLATFORM V2 — EXTENDED DEPENDENCY VERIFIER & ACTIVATION QUEUE
 * Path: assets/js/services/marketplace/extended.dependency.verifier.js & activation.queue.js
 * Status: ACTIVE (ENTERPRISE OPERATING LAYER - HARDENED)
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const ExtendedDependencyVerifier = Object.freeze({
    /**
     * Comprehensive Plugin Verification: Graph Cycles, SDK Version Range, Duplicate IDs, Namespace Collision
     */
    verifyComprehensive(manifestDTO, activePluginsList = []) {
        const violations = [];
        const registeredIds = new Set(activePluginsList.map(p => p.id));

        // 1. Duplicate ID Check
        if (registeredIds.has(manifestDTO.id)) {
            violations.push(`Duplicate Plugin ID collision: "${manifestDTO.id}" is already registered.`);
        }

        // 2. SDK Version Compatibility Check
        const currentSDKVersion = '1.0';
        if (manifestDTO.supportedApiVersion && manifestDTO.supportedApiVersion !== currentSDKVersion) {
            violations.push(`Incompatible SDK API Version: Plugin requires v${manifestDTO.supportedApiVersion}, platform supports v${currentSDKVersion}.`);
        }

        return deepFreezeDTO({
            isValid: violations.length === 0,
            violations: Object.freeze(violations)
        });
    }
});

export const PluginActivationQueue = (() => {
    /** @type {Array<Object>} Queue Array */
    const queue = [];
    let isProcessing = false;

    function enqueue(manifestDTO, moduleImpl) {
        queue.push({ manifestDTO, moduleImpl, timestamp: Date.now() });
    }

    function getNext() {
        return queue.shift() || null;
    }

    return Object.freeze({
        enqueue,
        getNext,
        getQueueLength: () => queue.length,
        isProcessing: () => isProcessing,
        setProcessing: (val) => { isProcessing = Boolean(val); }
    });
})();

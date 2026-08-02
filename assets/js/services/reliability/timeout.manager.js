/**
 * TOPCARE AI PLATFORM V2 — TIMEOUT MANAGER & SINGLE ABORT CONTROLLER OWNER
 * Path: assets/js/services/reliability/timeout.manager.js
 * Status: ACTIVE (SPRINT H - LOCKED GOLDEN BASELINE)
 * Role: Single Owner of AbortControllers Managing Timeout Lifecycles & Signal Aborts
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const TimeoutManager = Object.freeze({
    /**
     * Creates a managed timeout context wrapping an AbortController.
     * Single Ownership Guarantee: Only TimeoutManager instantiates AbortController.
     *
     * @param {number} timeoutMs - Timeout duration in milliseconds
     * @param {Function} [onTimeoutCallback] - Passive callback when timeout triggers
     * @returns {Object} Managed Timeout Handle
     */
    createTimeoutContext(timeoutMs = 15000, onTimeoutCallback = null) {
        const controller = new AbortController();
        let isTimedOut = false;

        const timerId = setTimeout(() => {
            isTimedOut = true;
            controller.abort(`Operation timed out after ${timeoutMs}ms`);
            if (typeof onTimeoutCallback === 'function') {
                try { onTimeoutCallback(timeoutMs); } catch (err) { /* Passive */ }
            }
        }, Math.max(100, Number(timeoutMs)));

        function cancel() {
            clearTimeout(timerId);
        }

        return deepFreezeDTO({
            signal: controller.signal,
            isTimedOut: () => isTimedOut,
            cancel
        });
    }
});

export default TimeoutManager;

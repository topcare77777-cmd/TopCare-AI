/**
 * TOPCARE AI PLATFORM V2 — ITERATIVE RETRY POLICY ENGINE
 * Path: assets/js/services/reliability/retry.policy.engine.js
 * Status: ACTIVE (SPRINT H - LOCKED GOLDEN BASELINE)
 * Role: Iterative Non-Recursive Retry Execution with Exponential Backoff + Jitter
 */

import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const RetryPolicyEngine = Object.freeze({
    /**
     * Executes async operation iteratively with backoff delays.
     * H-09 Compliance: Pure iterative loop (zero recursion).
     */
    async executeWithRetry(operationFn, config = {}, onAttemptFailed = null) {
        const maxAttempts = Math.max(1, Number(config.maxAttempts || 3));
        const backoffBaseMs = Math.max(100, Number(config.backoffBaseMs || 1000));

        let lastError = null;
        let attempt = 0;

        while (attempt < maxAttempts) {
            attempt += 1;
            try {
                // Execute provider-agnostic operation
                const result = await Promise.resolve(operationFn(attempt));
                return deepFreezeDTO({
                    success: true,
                    attemptsMade: attempt,
                    result
                });

            } catch (err) {
                lastError = err;
                if (typeof onAttemptFailed === 'function') {
                    try { onAttemptFailed(attempt, err, maxAttempts); } catch (e) { /* Passive */ }
                }

                // If attempts remaining, calculate Exponential Backoff with Jitter
                if (attempt < maxAttempts) {
                    const delayMs = Math.pow(2, attempt - 1) * backoffBaseMs + (Math.random() * 100);
                    await new Promise(resolve => setTimeout(resolve, delayMs));
                }
            }
        }

        return deepFreezeDTO({
            success: false,
            attemptsMade: attempt,
            error: lastError ? lastError.message : 'Operation failed after max attempts'
        });
    }
});

export default RetryPolicyEngine;

/**
 * TOPCARE AI PLATFORM V2 — EXECUTION SUPERVISOR ORCHESTRATOR
 * Path: assets/js/services/reliability/execution.supervisor.js
 * Status: ACTIVE (SPRINT H - LOCKED GOLDEN BASELINE)
 * Role: Single Orchestrator Combining Timeout, Retry, Circuit Breaker & Telemetry Broadcast
 */

import TimeoutManager from './timeout.manager.js';
import RetryPolicyEngine from './retry.policy.engine.js';
import CircuitBreaker from './circuit.breaker.js';
import { createExecutionSnapshotDTO, RELIABILITY_EVENT_TYPES } from '../../core/reliability/reliability.dto.js';
import IdProvider from '../../core/utils/id.provider.js';
import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const ExecutionSupervisor = Object.freeze({
    /**
     * Executes an operation reliably under Timeout, Retry, Circuit Breaker, and Telemetry supervision.
     */
    async executeReliably({
        providerId = 'default-provider',
        operationFn,
        config = {},
        eventBus = null,
        circuitBreakerInstance = null
    }) {
        const startTime = TimeProvider.now();
        const executionId = IdProvider.nextId('exec_rel');
        const breaker = circuitBreakerInstance || new CircuitBreaker(providerId, config.circuitBreaker);

        // 1. Fast Rejection Check via Circuit Breaker
        try {
            breaker.assertCanExecute();
        } catch (err) {
            if (eventBus && typeof eventBus.publish === 'function') {
                eventBus.publish({ type: RELIABILITY_EVENT_TYPES.BREAKER_OPEN, payload: { providerId, executionId } });
            }
            throw err;
        }

        // 2. Setup Managed Timeout Context (H-04 Compliance)
        const timeoutContext = TimeoutManager.createTimeoutContext(
            config.timeoutMs || 15000,
            (tMs) => {
                if (eventBus && typeof eventBus.publish === 'function') {
                    eventBus.publish({ type: RELIABILITY_EVENT_TYPES.TIMEOUT, payload: { providerId, executionId, timeoutMs: tMs } });
                }
            }
        );

        // 3. Execute Iterative Retry Policy
        const retryResult = await RetryPolicyEngine.executeWithRetry(
            async (attempt) => {
                if (timeoutContext.signal.aborted) {
                    throw new Error(`Execution aborted: ${timeoutContext.signal.reason}`);
                }
                return await operationFn(timeoutContext.signal, attempt);
            },
            config.retry || {},
            (attempt, err) => {
                if (eventBus && typeof eventBus.publish === 'function') {
                    eventBus.publish({ type: RELIABILITY_EVENT_TYPES.RETRY, payload: { providerId, executionId, attempt, error: err.message } });
                }
            }
        );

        // Clean up timeout timer
        timeoutContext.cancel();
        const totalDurationMs = TimeProvider.now() - startTime;

        // 4. Update Circuit Breaker State & Telemetry Broadcast
        if (retryResult.success) {
            breaker.recordSuccess();
            const executionSnapshot = createExecutionSnapshotDTO({
                executionId,
                status: 'SUCCESS',
                attemptsMade: retryResult.attemptsMade,
                totalDurationMs,
                circuitState: breaker.getSnapshot().state,
                timeProvider: TimeProvider
            });

            return deepFreezeDTO({
                result: retryResult.result,
                snapshot: executionSnapshot,
                breakerSnapshot: breaker.getSnapshot()
            });

        } else {
            breaker.recordFailure();
            const executionSnapshot = createExecutionSnapshotDTO({
                executionId,
                status: 'FAILED',
                attemptsMade: retryResult.attemptsMade,
                totalDurationMs,
                circuitState: breaker.getSnapshot().state,
                error: retryResult.error,
                timeProvider: TimeProvider
            });

            return deepFreezeDTO({
                result: null,
                snapshot: executionSnapshot,
                breakerSnapshot: breaker.getSnapshot()
            });
        }
    }
});

export default ExecutionSupervisor;

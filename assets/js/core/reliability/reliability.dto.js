/**
 * TOPCARE AI PLATFORM V2 — RELIABILITY DTOS & CATALOG SSOT
 * Path: assets/js/core/reliability/reliability.dto.js & reliability.catalog.js
 * Status: ACTIVE (SPRINT H - LOCKED GOLDEN BASELINE)
 */

import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const RELIABILITY_SCHEMA_VERSION = '2.0.0';

export const CIRCUIT_STATES = deepFreezeDTO({
    CLOSED: 'CLOSED',        // Normal Operation
    OPEN: 'OPEN',            // Failing - Fast Rejection
    HALF_OPEN: 'HALF_OPEN'   // Testing Recovery
});

export const RELIABILITY_EVENT_TYPES = deepFreezeDTO({
    TIMEOUT: 'RELIABILITY.TIMEOUT',
    RETRY: 'RELIABILITY.RETRY',
    BREAKER_OPEN: 'RELIABILITY.BREAKER_OPEN',
    BREAKER_HALF_OPEN: 'RELIABILITY.BREAKER_HALF_OPEN',
    BREAKER_CLOSE: 'RELIABILITY.BREAKER_CLOSE',
    REQUEST_ABORTED: 'RELIABILITY.REQUEST_ABORTED'
});

export function createCircuitBreakerSnapshotDTO({
    providerId,
    state = CIRCUIT_STATES.CLOSED,
    failureCount = 0,
    successCount = 0,
    lastFailureTime = null,
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'CircuitBreakerSnapshotDTO',
        schemaVersion: RELIABILITY_SCHEMA_VERSION,
        providerId: String(providerId),
        state: CIRCUIT_STATES[state] || CIRCUIT_STATES.CLOSED,
        failureCount: Number(failureCount),
        successCount: Number(successCount),
        lastFailureTime: lastFailureTime ? String(lastFailureTime) : null,
        capturedAt: timeProvider.iso()
    });
}

export function createExecutionSnapshotDTO({
    executionId,
    status = 'SUCCESS',
    attemptsMade = 1,
    totalDurationMs = 0,
    circuitState = CIRCUIT_STATES.CLOSED,
    error = null,
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'ExecutionSnapshotDTO',
        schemaVersion: RELIABILITY_SCHEMA_VERSION,
        executionId: String(executionId),
        status: String(status),
        attemptsMade: Number(attemptsMade),
        totalDurationMs: Number(totalDurationMs),
        circuitState: CIRCUIT_STATES[circuitState] || CIRCUIT_STATES.CLOSED,
        error: error ? String(error) : null,
        completedAt: timeProvider.iso()
    });
}

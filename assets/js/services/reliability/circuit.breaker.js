/**
 * TOPCARE AI PLATFORM V2 — CIRCUIT BREAKER STATE MACHINE
 * Path: assets/js/services/reliability/circuit.breaker.js
 * Status: ACTIVE (SPRINT H - LOCKED GOLDEN BASELINE)
 * Role: Fast-Rejection Circuit Breaker Machine (CLOSED -> OPEN -> HALF_OPEN -> CLOSED)
 */

import { CIRCUIT_STATES, createCircuitBreakerSnapshotDTO } from '../../core/reliability/reliability.dto.js';
import TimeProvider from '../../core/time/time.provider.js';

export class CircuitBreaker {
    constructor(providerId, config = {}) {
        this.providerId = String(providerId);
        this.failureThreshold = Math.max(1, Number(config.failureThreshold || 5));
        this.cooldownMs = Math.max(1000, Number(config.cooldownMs || 30000));

        this.state = CIRCUIT_STATES.CLOSED;
        this.failureCount = 0;
        this.successCount = 0;
        this.lastFailureTime = null;
    }

    assertCanExecute() {
        if (this.state === CIRCUIT_STATES.OPEN) {
            const now = TimeProvider.now();
            if (this.lastFailureTime && (now - this.lastFailureTime >= this.cooldownMs)) {
                this.state = CIRCUIT_STATES.HALF_OPEN;
                return true; // Allow test request in HALF_OPEN
            }
            throw new Error(`[CircuitBreaker:${this.providerId}] Circuit is OPEN. Request rejected instantly.`);
        }
        return true;
    }

    recordSuccess() {
        if (this.state === CIRCUIT_STATES.HALF_OPEN) {
            this.state = CIRCUIT_STATES.CLOSED;
            this.failureCount = 0;
        }
        this.successCount += 1;
    }

    recordFailure() {
        this.failureCount += 1;
        this.lastFailureTime = TimeProvider.now();

        if (this.failureCount >= this.failureThreshold) {
            this.state = CIRCUIT_STATES.OPEN;
        }
    }

    getSnapshot() {
        return createCircuitBreakerSnapshotDTO({
            providerId: this.providerId,
            state: this.state,
            failureCount: this.failureCount,
            successCount: this.successCount,
            lastFailureTime: this.lastFailureTime ? TimeProvider.iso() : null,
            timeProvider: TimeProvider
        });
    }
}

export default CircuitBreaker;

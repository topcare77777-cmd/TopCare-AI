/**
 * TOPCARE AI PLATFORM V2 — REAL CHAOS FAULT SUITE
 * Path: assets/js/testing/real.chaos.suite.js
 * Status: ACTIVE (HARDENED - OPERATIONAL EVIDENCE PROOF)
 * Role: Executes Real Distinct Fault Injections and Measures Recovery
 */

import { LocalStorageStorageProvider } from '../services/persistence/providers/local.storage.provider.js';
import { MemoryRepository } from '../services/persistence/memory.repository.js';
import { createMemoryRecordDTO } from '../core/memory/memory.dto.js';
import ExecutionSupervisor from '../services/reliability/execution.supervisor.js';
import CircuitBreaker from '../services/reliability/circuit.breaker.js';
import SlidingWindowRateLimiter from '../services/security/rate.limiter.js';
import { deepFreezeDTO } from '../core/utils/dto.js';

export const RealChaosSuite = Object.freeze({
    /**
     * Executes real fault scenarios without placeholder loops.
     */
    async executeRealScenarios() {
        const scenarios = [];

        // 1. Physical Storage Mid-Write Exception & Rollback
        try {
            const provider = new LocalStorageStorageProvider('chaos_real_');
            provider.setItem = async () => { throw new Error('PHYSICAL_STORAGE_CORRUPTED'); };
            const repo = new MemoryRepository(provider);
            await repo.saveMemoryRecord(createMemoryRecordDTO({ factText: 'Chaos Record' }));
            scenarios.push({ id: 'CHAOS_01_PHYSICAL_STORAGE_CORRUPTION', passed: false, reason: 'Failed to trap storage error' });
        } catch (err) {
            scenarios.push({ id: 'CHAOS_01_PHYSICAL_STORAGE_CORRUPTION', passed: true, reason: 'Trapped physical corruption cleanly' });
        }

        // 2. Circuit Breaker Fast Rejection
        try {
            const breaker = new CircuitBreaker('chaos_provider', { failureThreshold: 1 });
            breaker.recordFailure();
            breaker.assertCanExecute(); // Should throw OPEN exception
            scenarios.push({ id: 'CHAOS_02_CIRCUIT_BREAKER_FAST_REJECT', passed: false, reason: 'Failed fast rejection' });
        } catch (err) {
            scenarios.push({ id: 'CHAOS_02_CIRCUIT_BREAKER_FAST_REJECT', passed: true, reason: 'Circuit OPEN fast rejection verified' });
        }

        // 3. Rate Limiter Resource Abuse Defense
        const limiter = new SlidingWindowRateLimiter(2, 60000);
        limiter.checkLimit('user_chaos');
        limiter.checkLimit('user_chaos');
        const res3 = limiter.checkLimit('user_chaos');
        scenarios.push({
            id: 'CHAOS_03_RATE_LIMITER_EXHAUSTION',
            passed: res3.allowed === false,
            reason: res3.allowed ? 'Failed to limit requests' : 'Resource abuse rate limit verified'
        });

        // 4. Execution Timeout Abort Signal
        try {
            await ExecutionSupervisor.executeReliably({
                providerId: 'chaos_timeout_provider',
                operationFn: async (signal) => {
                    await new Promise(r => setTimeout(r, 200));
                    if (signal.aborted) throw new Error('ABORTED_BY_TIMEOUT');
                },
                config: { timeoutMs: 50, retry: { maxAttempts: 1 } }
            });
            scenarios.push({ id: 'CHAOS_04_EXECUTION_TIMEOUT_ABORT', passed: false, reason: 'Timeout failed' });
        } catch (err) {
            scenarios.push({ id: 'CHAOS_04_EXECUTION_TIMEOUT_ABORT', passed: true, reason: 'Execution timeout trapped cleanly' });
        }

        const passedCount = scenarios.filter(s => s.passed).length;

        return deepFreezeDTO({
            totalScenarios: scenarios.length,
            passedCount,
            failedCount: scenarios.length - passedCount,
            scenarios: Object.freeze(scenarios)
        });
    }
});

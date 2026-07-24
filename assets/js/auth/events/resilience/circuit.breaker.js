/**
 * TopCare AI Platform V2.0.0
 * Circuit Breaker with Sliding Window (COUNT_BASED / TIME_BASED)
 * Path: assets/js/auth/events/resilience/circuit.breaker.js
 */

const CircuitState = Object.freeze({
    CLOSED: 'CLOSED',
    OPEN: 'OPEN',
    HALF_OPEN: 'HALF_OPEN'
});

const SlidingWindowType = Object.freeze({
    COUNT_BASED: 'COUNT_BASED',
    TIME_BASED: 'TIME_BASED'
});

class CircuitBreaker {
    constructor(options = {}) {
        this.failureThresholdRate = options.failureThresholdRate || 0.5;
        this.slowCallRateThreshold = options.slowCallRateThreshold || 0.8;
        this.slowCallDurationThresholdMs = options.slowCallDurationThresholdMs || 2000;
        this.windowType = options.windowType || SlidingWindowType.COUNT_BASED;
        this.windowSize = options.windowSize || 100; // Count or Time in ms
        this.resetTimeoutMs = options.resetTimeoutMs || 10000;
        
        this.state = CircuitState.CLOSED;
        this.calls = [];
        this.nextAttemptTimestamp = 0;
    }

    async execute(action) {
        const now = Date.now();
        if (this.state === CircuitState.OPEN) {
            if (now >= this.nextAttemptTimestamp) {
                this.state = CircuitState.HALF_OPEN;
            } else {
                throw new TransportException("CircuitBreakerOpen: Execution blocked.");
            }
        }

        const startTime = Date.now();
        try {
            const result = await action();
            const durationMs = Date.now() - startTime;
            this._recordCall(true, durationMs);
            return result;
        } catch (error) {
            const durationMs = Date.now() - startTime;
            this._recordCall(false, durationMs);
            throw error;
        }
    }

    _recordCall(success, durationMs) {
        const now = Date.now();
        this.calls.push({ success, durationMs, timestamp: now });

        if (this.windowType === SlidingWindowType.COUNT_BASED) {
            if (this.calls.length > this.windowSize) this.calls.shift();
        } else {
            // TIME_BASED sliding window filter
            const cutoff = now - this.windowSize;
            this.calls = this.calls.filter(c => c.timestamp >= cutoff);
        }

        if (this.calls.length >= 5) {
            const failures = this.calls.filter(c => !c.success).length;
            const slowCalls = this.calls.filter(c => c.durationMs >= this.slowCallDurationThresholdMs).length;
            
            const failureRate = failures / this.calls.length;
            const slowCallRate = slowCalls / this.calls.length;

            if (this.state === CircuitState.CLOSED || this.state === CircuitState.HALF_OPEN) {
                if (failureRate >= this.failureThresholdRate || slowCallRate >= this.slowCallRateThreshold) {
                    this.state = CircuitState.OPEN;
                    this.nextAttemptTimestamp = Date.now() + this.resetTimeoutMs;
                } else if (this.state === CircuitState.HALF_OPEN && failureRate === 0) {
                    this.state = CircuitState.CLOSED;
                }
            }
        }
    }
}
/**
 * TopCare AI Platform V2.0.0
 * Retry Policy Engine with Listeners, Retry Context, and Retry Budget
 * Path: assets/js/auth/events/resilience/retry.policy.engine.js
 */

class RetryContext {
    constructor(error, attempt) {
        this.error = error;
        this.attempt = attempt;
        this.timestamp = Date.now();
        if (typeof deepFreeze === 'function') deepFreeze(this);
    }
}

class RetryPolicyEngine {
    constructor(options = {}) {
        this.maxAttempts = options.maxAttempts || 3;
        this.baseDelayMs = options.baseDelayMs || 200;
        this.maxDelayMs = options.maxDelayMs || 10000;
        this.retryBudget = options.retryBudget || 100; // Max permitted retries in budget window
        this.listeners = new Set();
        this.predicate = options.predicate || ((err) => {
            return !(
                err instanceof PermanentTransportException ||
                err instanceof FatalTransportException ||
                err instanceof ConfigurationException ||
                err instanceof ValidationException ||
                err instanceof SerializationException
            );
        });
    }

    addListener(listener) {
        if (typeof listener === 'function') this.listeners.add(listener);
    }

    shouldRetry(error, attempt) {
        if (attempt >= this.maxAttempts) return false;
        if (this.retryBudget <= 0) return false;

        const isEligible = this.predicate(error);
        if (isEligible) {
            this.retryBudget--;
            const ctx = new RetryContext(error, attempt);
            this.listeners.forEach(l => {
                try { l(ctx); } catch (e) {}
            });
        }
        return isEligible;
    }

    calculateDelayWithJitter(attempt) {
        const exponentialDelay = this.baseDelayMs * Math.pow(2, attempt - 1);
        const cappedDelay = Math.min(exponentialDelay, this.maxDelayMs);
        return Math.random() * cappedDelay;
    }
}
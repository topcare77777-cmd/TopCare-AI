/**
 * TopCare AI Platform V2.0.0
 * Advanced Retry Strategy with granular error evaluation (shouldRetry & delay decision)
 * Path: assets/js/auth/events/retry/retry.strategy.js
 */

class RetryStrategyInterface {
    shouldRetry(error, attemptNumber) { throw new Error("Not implemented"); }
    getDelay(attemptNumber) { throw new Error("Not implemented"); }
    
    // Combined decision helper
    evaluate(error, attemptNumber) {
        const canRetry = this.shouldRetry(error, attemptNumber);
        return {
            retry: canRetry,
            delay: canRetry ? this.getDelay(attemptNumber) : 0
        };
    }
}

class NoRetryStrategy extends RetryStrategyInterface {
    shouldRetry(error, attemptNumber) { return false; }
    getDelay(attemptNumber) { return 0; }
}

class ImmediateRetryStrategy extends RetryStrategyInterface {
    constructor(maxAttempts = 3) {
        super();
        this.maxAttempts = maxAttempts;
    }
    shouldRetry(error, attemptNumber) { return attemptNumber < this.maxAttempts; }
    getDelay(attemptNumber) { return 0; }
}

class LinearRetryStrategy extends RetryStrategyInterface {
    constructor(maxAttempts = 3, baseDelayMs = 100) {
        super();
        this.maxAttempts = maxAttempts;
        this.baseDelayMs = baseDelayMs;
    }
    shouldRetry(error, attemptNumber) { return attemptNumber < this.maxAttempts; }
    getDelay(attemptNumber) { return this.baseDelayMs * attemptNumber; }
}

class ExponentialRetryStrategy extends RetryStrategyInterface {
    constructor(maxAttempts = 3, baseDelayMs = 100, maxDelayMs = 5000) {
        super();
        this.maxAttempts = maxAttempts;
        this.baseDelayMs = baseDelayMs;
        this.maxDelayMs = maxDelayMs;
    }
    shouldRetry(error, attemptNumber) { return attemptNumber < this.maxAttempts; }
    getDelay(attemptNumber) {
        const delay = this.baseDelayMs * Math.pow(2, attemptNumber - 1);
        return Math.min(delay, this.maxDelayMs);
    }
}
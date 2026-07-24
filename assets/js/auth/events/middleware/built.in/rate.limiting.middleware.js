/**
 * TopCare AI Platform V2.0.0
 * Rate Limiting / Throttling Middleware controlling event ingestion velocity
 * Path: assets/js/auth/events/middleware/built.in/rate.limiting.middleware.js
 */

class RateLimitingMiddleware extends IEventMiddleware {
    constructor(options = {}) {
        super();
        this.windowMs = options.windowMs || 1000;
        this.maxEventsPerWindow = options.maxEventsPerWindow || 50;
        this.counter = 0;
        this.windowStart = Date.now();
    }

    async handle(dispatchContext, next) {
        const now = Date.now();
        if (now - this.windowStart > this.windowMs) {
            this.windowStart = now;
            this.counter = 0;
        }

        this.counter++;
        if (this.counter > this.maxEventsPerWindow) {
            throw new Error("RateLimitExceeded: Event dispatch throttled due to high ingestion volume.");
        }

        await next();
    }
}
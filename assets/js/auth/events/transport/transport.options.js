/**
 * TopCare AI Platform V2.0.0
 * Transport Options DTO for transmission configuration
 * Path: assets/js/auth/events/transport/transport.options.js
 */

class TransportOptions {
    constructor(options = {}) {
        this.timeoutMs = options.timeoutMs || 5000;
        this.durability = options.durability || 'persistent';
        this.priority = options.priority || 0;
        this.delayMs = options.delayMs || 0;
        this.headers = Object.freeze(options.headers || {});
        Object.freeze(this);
    }
}
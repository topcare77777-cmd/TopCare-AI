/**
 * TopCare AI Platform V2.0.0
 * Secure Crypto Trace ID Generator enforcing cryptographic entropy for distributed traces
 * Path: assets/js/auth/events/observability/generators/trace.id.generator.js
 */

class TraceIdGenerator {
    static generateTraceId() {
        if (typeof AuthCryptoUtil !== 'undefined' && typeof AuthCryptoUtil.generateUUID === 'function') {
            return 'trc-' + AuthCryptoUtil.generateUUID();
        }
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return 'trc-' + crypto.randomUUID();
        }
        throw new Error("Cryptographically secure random number generator is required for Trace ID generation.");
    }

    static generateSpanId() {
        if (typeof AuthCryptoUtil !== 'undefined' && typeof AuthCryptoUtil.generateUUID === 'function') {
            return 'spn-' + AuthCryptoUtil.generateUUID().substring(0, 16);
        }
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return 'spn-' + crypto.randomUUID().substring(0, 16);
        }
        throw new Error("Cryptographically secure random number generator is required for Span ID generation.");
    }
}
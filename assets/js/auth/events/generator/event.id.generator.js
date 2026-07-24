/**
 * TopCare AI Platform V2.0.0
 * Secure Crypto Event ID Generator enforcing standard cryptographic entropy without insecure fallback
 * Path: assets/js/auth/events/generator/event.id.generator.js
 */

class EventIdGeneratorInterface {
    generate() { throw new Error("Not implemented"); }
}

class CryptoEventIdGenerator extends EventIdGeneratorInterface {
    generate() {
        if (typeof AuthCryptoUtil !== 'undefined' && typeof AuthCryptoUtil.generateUUID === 'function') {
            return 'evd-' + AuthCryptoUtil.generateUUID();
        }
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return 'evd-' + crypto.randomUUID();
        }
        throw new Error("Cryptographically secure random number generator is required for Event ID generation.");
    }
}
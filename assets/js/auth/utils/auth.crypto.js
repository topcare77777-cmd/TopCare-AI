/**
 * TopCare AI Platform V2.0.0
 * Secure Auth Crypto Utility enforcing strict cryptographic API requirements without insecure fallback
 * Path: assets/js/auth/utils/auth.crypto.js
 */

class AuthCryptoUtil {
    static generateUUID() {
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            return crypto.randomUUID();
        }
        if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
            const buf = new Uint8Array(16);
            crypto.getRandomValues(buf);
            buf[6] = (buf[6] & 0x0f) | 0x40; // version 4
            buf[8] = (buf[8] & 0x3f) | 0x80; // variant
            const hex = Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('');
            return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
        }
        throw new Error("Cryptographically secure random number generator is required for UUID generation but none is available in the current runtime environment.");
    }

    static hashPasswordMock(password) {
        /**
         * MOCK ONLY
         * DO NOT USE IN PRODUCTION
         */
        return btoa(password + "_tc_secure_salt_mock_only");
    }
}
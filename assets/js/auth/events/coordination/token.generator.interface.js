/**
 * TopCare AI Platform V2.0.0
 * ITokenGenerator Contract Interface for Cryptographically Secure Token Issuance
 * Path: assets/js/auth/events/coordination/token.generator.interface.js
 */

class ITokenGenerator {
    generateToken(prefix = 'tok') { throw new Error("Not implemented"); }
}

class CryptoTokenGenerator extends ITokenGenerator {
    generateToken(prefix = 'tok') {
        let randomStr;
        if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
            randomStr = crypto.randomUUID();
        } else if (typeof AuthCryptoUtil !== 'undefined' && typeof AuthCryptoUtil.generateUUID === 'function') {
            randomStr = AuthCryptoUtil.generateUUID();
        } else {
            throw new TransportException("Cryptographically secure random number generator is required for token generation.");
        }
        return `${prefix}-${randomStr}`;
    }
}
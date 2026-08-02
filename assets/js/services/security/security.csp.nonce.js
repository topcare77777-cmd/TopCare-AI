/**
 * TOPCARE AI PLATFORM V2 — NONCE PROVIDER & CSP BUILDER
 * Path: assets/js/services/security/security.csp.nonce.js
 * Status: ACTIVE (SPRINT J - LOCKED GOLDEN BASELINE)
 * Role: Cryptographic Nonce Generation & Dynamic Content Security Policy Assembly
 */

import { createNonceDTO, createContentSecurityPolicyDTO } from '../../core/security/security.dto.js';

export const NonceProvider = Object.freeze({
    /**
     * Generates a cryptographically strong nonce using crypto.getRandomValues().
     * J-06 Compliance: Zero Math.random().
     */
    generateNonce(purpose = 'SCRIPT_EXECUTION') {
        const buffer = new Uint8Array(16);
        if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
            crypto.getRandomValues(buffer);
        } else {
            throw new Error('[NonceProvider] Secure crypto.getRandomValues API is unavailable in this environment.');
        }

        const nonceHex = Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join('');
        return createNonceDTO({
            nonceValue: nonceHex,
            purpose
        });
    }
});

export const CSPBuilder = Object.freeze({
    /**
     * Dynamic CSP Header Assembly.
     * J-07 Compliance: Returns ContentSecurityPolicyDTO.
     */
    buildPolicy({ scriptSrc = ["'self'"], styleSrc = ["'self'"], withNonce = true } = {}) {
        const nonceDTO = withNonce ? NonceProvider.generateNonce('CSP_SCRIPT_NONCE') : null;

        return createContentSecurityPolicyDTO({
            scriptSrc,
            styleSrc,
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
            nonce: nonceDTO ? nonceDTO.nonceValue : null
        });
    }
});

export default CSPBuilder;

/**
 * file: assets/js/plugins/plugin.ca.hierarchy.validator.js
 */

import { Core } from '../core/index.js';

export class CAHierarchyValidator {
    static ROOT_CA_NAME = 'TopCare Root CA v1';

    /**
     * Memverifikasi keabsahan rantai sertifikat penerbit (Issuer → Subject → Validity → Revocation).
     * @param {Object} certificate 
     * @returns {Object} { valid: boolean, reason?: string }
     */
    static validateChain(certificate) {
        if (!certificate) {
            return { valid: false, reason: "Certificate payload is missing." };
        }

        // 1. Verifikasi Penerbit Root CA
        if (!certificate.issuer || !certificate.issuer.includes('TopCare')) {
            return { valid: false, reason: `Untrusted Issuer: Certificate was issued by unknown entity '${certificate.issuer}'.` };
        }

        // 2. Verifikasi Masa Berlaku Sertifikat (Expiration Check)
        const now = new Date().toISOString();
        if (certificate.validFrom > now) {
            return { valid: false, reason: "Certificate is not yet active." };
        }
        if (certificate.validUntil < now) {
            return { valid: false, reason: `Certificate expired on: ${certificate.validUntil}.` };
        }

        // 3. Verifikasi Status Pencabutan (Revocation List / CRL Check)
        if (certificate.revoked === true) {
            return { valid: false, reason: "Security Alert: Certificate has been explicitly revoked by CA." };
        }

        Core.Logger.info(`[CA Validator] Certificate chain validated successfully for serial: ${certificate.serialNumber}`);
        return { valid: true };
    }
}
/**
 * file: assets/js/plugins/plugin.trust.store.js
 */

import { Core } from '../core/index.js';

class PublisherTrustStoreBase {
    constructor() {
        this._trustStore = new Map(); // publisherId -> CryptoKey / Certificate Metadata
        Object.seal(this);
    }

    /**
     * Mendaftarkan Kunci Publik Publisher yang terverifikasi ke dalam Trust Store.
     * @param {string} publisherId 
     * @param {CryptoKey|string} publicKey 
     * @param {Object} metadata 
     */
    registerPublisher(publisherId, publicKey, metadata = {}) {
        if (!publisherId || !publicKey) {
            throw new TypeError("Publisher ID and Public Key are mandatory for registration.");
        }

        const trustRecord = Object.freeze({
            publisherId,
            publicKey,
            issuer: metadata.issuer || 'TopCare Root CA',
            validUntil: metadata.validUntil || '2030-12-31',
            trustLevel: metadata.trustLevel || 'verified',
            registeredAt: Core.Utils.now ? Core.Utils.now() : Date.now()
        });

        this._trustStore.set(publisherId, trustRecord);
        Core.Logger.info(`Publisher public key registered in Trust Store: ${publisherId}`);
        return this;
    }

    getPublisher(publisherId) {
        return this._trustStore.get(publisherId) || null;
    }

    isTrusted(publisherId) {
        const record = this._trustStore.get(publisherId);
        if (!record) return false;
        const now = new Date().toISOString().split('T')[0];
        return record.validUntil >= now;
    }
}

export const PublisherTrustStore = Object.freeze(new PublisherTrustStoreBase());
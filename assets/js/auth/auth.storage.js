/**
 * file: assets/js/auth/auth.storage.js
 */

import { Core } from '../core/index.js';
import { CryptoEngine } from '../plugins/plugin.crypto.engine.js';
import { AUTH_CONSTANTS } from './auth.constants.js';

export class AuthTokenStorage {
    static async saveSessionData(sessionPayload) {
        try {
            const rawJson = JSON.stringify(sessionPayload);
            const { ciphertextHex, ivHex } = await CryptoEngine.encryptText(rawJson);

            const encryptedEnvelope = {
                data: ciphertextHex,
                iv: ivHex,
                storedAt: Date.now()
            };

            sessionStorage.setItem(AUTH_CONSTANTS.STORAGE_KEY, JSON.stringify(encryptedEnvelope));
        } catch (err) {
            Core.Logger.error(`[Auth Storage] AES-GCM Encrypted save failed: ${err.message}`);
        }
    }

    static async getSessionData() {
        try {
            const rawPackage = sessionStorage.getItem(AUTH_CONSTANTS.STORAGE_KEY);
            if (!rawPackage) return null;

            const envelope = JSON.parse(rawPackage);
            const decryptedJson = await CryptoEngine.decryptText(envelope.data, envelope.iv);
            return JSON.parse(decryptedJson);
        } catch (err) {
            Core.Logger.warn(`[Auth Storage] AES-GCM Decryption failed (invalid or expired session): ${err.message}`);
            return null;
        }
    }

    static clearSessionData() {
        sessionStorage.removeItem(AUTH_CONSTANTS.STORAGE_KEY);
    }
}
/**
 * file: assets/js/plugins/plugin.crypto.engine.js
 */

import { Core } from '../core/index.js';

export class CryptoEngine {
    static _sessionKey = null;

    /**
     * Membangun atau mengembalikan AES-GCM CryptoKey simetris untuk sesi browser saat ini.
     */
    static async getSessionCryptoKey() {
        if (CryptoEngine._sessionKey) return CryptoEngine._sessionKey;

        CryptoEngine._sessionKey = await crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
        return CryptoEngine._sessionKey;
    }

    /**
     * Mengenkripsi Plain Text menjadi Ciphertext Hex + IV (96-bit) berbasis AES-GCM.
     * @param {string} plainText 
     * @returns {Promise<{ ciphertextHex: string, ivHex: string }>}
     */
    static async encryptText(plainText) {
        try {
            const key = await CryptoEngine.getSessionCryptoKey();
            const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV
            const encoder = new TextEncoder();
            const data = encoder.encode(plainText);

            const encryptedBuffer = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                key,
                data
            );

            const ciphertextHex = Array.from(new Uint8Array(encryptedBuffer))
                .map(b => b.toString(16).padStart(2, '0')).join('');
            const ivHex = Array.from(iv)
                .map(b => b.toString(16).padStart(2, '0')).join('');

            return { ciphertextHex, ivHex };
        } catch (err) {
            Core.Logger.error(`CryptoEngine AES-GCM encryption failed: ${err.message}`);
            throw err;
        }
    }

    /**
     * Mendekripsi Ciphertext Hex + IV kembali menjadi Plain Text.
     * @param {string} ciphertextHex 
     * @param {string} ivHex 
     * @returns {Promise<string>}
     */
    static async decryptText(ciphertextHex, ivHex) {
        try {
            const key = await CryptoEngine.getSessionCryptoKey();
            const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
            const encryptedBytes = new Uint8Array(ciphertextHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

            const decryptedBuffer = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                key,
                encryptedBytes
            );

            const decoder = new TextDecoder();
            return decoder.decode(decryptedBuffer);
        } catch (err) {
            Core.Logger.error(`CryptoEngine AES-GCM decryption failed: ${err.message}`);
            throw err;
        }
    }

    static async computeSHA256(buffer) {
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
}
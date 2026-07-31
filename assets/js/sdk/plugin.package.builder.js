/**
 * file: assets/js/sdk/plugin.package.builder.js
 */

import { Core } from '../core/index.js';
import { CryptoEngine } from '../plugins/plugin.crypto.engine.js';

export class TcPluginPackageBuilder {
    /**
     * Memaketkan file manifes, modul kode biner, dan tanda tangan digital ke dalam format kontainer .tcplugin.
     * @param {Object} manifest 
     * @param {string} codeString 
     * @param {Object} options 
     * @returns {Promise<{ packageBuffer: ArrayBuffer, checksum: string, metadata: Object }>}
     */
    static async buildPackage(manifest, codeString, options = {}) {
        if (!manifest || !codeString) {
            throw new Error("SDK Error: Both manifest and code content are required to build package.");
        }

        Core.Logger.info(`[SDK Package Builder] Assembling .tcplugin container for: ${manifest.id}@${manifest.version}`);

        const packageStructure = {
            manifest,
            code: codeString,
            signature: options.signature || "UNSIGNED_DEVELOPMENT_BUILD",
            publisherId: manifest.publisherId,
            metadata: {
                formatVersion: "1.0",
                builtAt: new Date().toISOString(),
                builderVersion: "TopCare-SDK-130.0",
                environment: options.environment || "development"
            }
        };

        const jsonString = JSON.stringify(packageStructure, null, 2);
        const encoder = new TextEncoder();
        const packageBuffer = encoder.encode(jsonString).buffer;

        // Menghitung checksum SHA-256 riil dari biner kontainer menggunakan Web Crypto API
        const checksum = await CryptoEngine.computeSHA256(packageBuffer);

        Core.Logger.info(`[SDK Package Builder] Container successfully generated. Checksum: ${checksum}`);

        return {
            packageBuffer,
            checksum,
            metadata: packageStructure.metadata
        };
    }
}
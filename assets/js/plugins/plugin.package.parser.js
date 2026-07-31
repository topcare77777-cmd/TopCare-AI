/**
 * file: assets/js/plugins/plugin.package.parser.js
 */

import { Core } from '../core/index.js';

export class TcPluginPackageParser {
    static SUPPORTED_FORMAT_VERSION = "1.0";

    /**
     * Mengurai biner arsip kontainer .tcplugin secara dinamis.
     * @param {ArrayBuffer} packageBuffer 
     * @returns {Object} Structured package payload { manifest, codeModule, signature, metadata, rawCodeBuffer }
     */
    static parsePackage(packageBuffer) {
        if (!packageBuffer || !(packageBuffer instanceof ArrayBuffer || ArrayBuffer.isView(packageBuffer))) {
            throw new TypeError("Invalid package buffer provided for parsing.");
        }

        Core.Logger.info("Parsing structured .tcplugin binary container archive...");

        // Dekode header biner / struktur JSON kontainer dari ArrayBuffer
        const decoder = new TextDecoder('utf-8');
        let packageJson;
        try {
            const rawText = decoder.decode(packageBuffer);
            packageJson = JSON.parse(rawText);
        } catch (err) {
            throw new Error(`Package Parsing Failed: File is not a valid structured .tcplugin archive (${err.message}).`);
        }

        // 1. Check Format Version Compatibility
        const formatVersion = packageJson.metadata?.formatVersion || "1.0";
        if (formatVersion !== TcPluginPackageParser.SUPPORTED_FORMAT_VERSION) {
            throw new Error(`Package Version Mismatch: Unsupported .tcplugin format version '${formatVersion}'. Max supported: '${TcPluginPackageParser.SUPPORTED_FORMAT_VERSION}'.`);
        }

        // 2. Validate Container Boundary
        if (!packageJson.manifest || !packageJson.code || !packageJson.signature) {
            throw new Error("Invalid .tcplugin Container: Missing manifest, code payload, or signature.");
        }

        const encoder = new TextEncoder();
        const codeBuffer = encoder.encode(packageJson.code).buffer;

        return {
            manifest: packageJson.manifest,
            codePayload: packageJson.code,
            rawCodeBuffer: codeBuffer,
            signature: packageJson.signature,
            publisherId: packageJson.manifest.publisherId || packageJson.publisherId,
            metadata: Object.freeze({
                ...packageJson.metadata,
                parsedAt: Core.Utils.now ? Core.Utils.now() : Date.now()
            })
        };
    }
}
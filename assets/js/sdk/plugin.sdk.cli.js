/**
 * file: assets/js/sdk/plugin.sdk.cli.js
 */

import { Core } from '../core/index.js';
import { PluginManifestGenerator } from './plugin.manifest.generator.js';
import { TcPluginPackageBuilder } from './plugin.package.builder.js';

export class TopCarePluginCLI {
    /**
     * Perintah CLI: Inisialisasi struktur template plugin baru.
     * @param {string} pluginId 
     * @param {Object} options 
     */
    static init(pluginId, options = {}) {
        Core.Logger.info(`[CLI] Initializing new TopCare AI plugin project structure: '${pluginId}'`);

        const manifest = PluginManifestGenerator.createManifest({
            id: pluginId,
            name: options.name || pluginId,
            version: '1.0.0',
            publisherId: options.publisherId || 'dev-local',
            description: 'New TopCare AI Platform Extension'
        });

        const templateCode = `
/**
 * Entry point for TopCare Plugin: ${pluginId}
 */
module.exports = {
    async initialize(context) {
        context.logger.info("Plugin ${pluginId} initialized successfully.");
    },
    async activate(context) {
        context.logger.info("Plugin ${pluginId} activated.");
    },
    async deactivate(context) {
        context.logger.info("Plugin ${pluginId} deactivated.");
    },
    async dispose(context) {
        context.logger.info("Plugin ${pluginId} disposed.");
    }
};
`;

        return {
            manifest,
            entryCode: templateCode
        };
    }

    /**
     * Perintah CLI: Mengompilasi dan memaketkan proyek plugin menjadi berkas biner .tcplugin.
     * @param {Object} manifest 
     * @param {string} entryCode 
     * @param {Object} buildOptions 
     */
    static async pack(manifest, entryCode, buildOptions = {}) {
        Core.Logger.info(`[CLI] Executing build & package command for '${manifest.id}'...`);
        return await TcPluginPackageBuilder.buildPackage(manifest, entryCode, buildOptions);
    }
}
/**
 * file: assets/js/sdk/plugin.manifest.generator.js
 */

import { Core } from '../core/index.js';

export class PluginManifestGenerator {
    /**
     * Membuat manifes plugin standar yang terstruktur dan siap dipaketkan.
     * @param {Object} config 
     * @returns {Object} Validated Plugin Manifest Schema
     */
    static createManifest(config = {}) {
        if (!config.id || typeof config.id !== 'string') {
            throw new Error("SDK Error: Plugin 'id' is required.");
        }
        if (!config.name || typeof config.name !== 'string') {
            throw new Error("SDK Error: Plugin 'name' is required.");
        }
        if (!config.version || typeof config.version !== 'string') {
            throw new Error("SDK Error: Plugin 'version' is required.");
        }

        const manifest = {
            id: config.id.trim(),
            name: config.name.trim(),
            version: config.version.trim(),
            publisherId: config.publisherId || 'unverified-publisher',
            description: config.description || '',
            dependencies: config.dependencies || {},
            permissions: {
                services: config.permissions?.services || [],
                storage: config.permissions?.storage || false,
                network: config.permissions?.network || []
            },
            capabilities: config.capabilities || [],
            cachePolicy: config.cachePolicy || 'unload',
            meta: {
                author: config.author || 'Anonymous',
                license: config.license || 'MIT',
                createdAt: Core.Utils.now ? Core.Utils.now() : Date.now()
            }
        };

        return Object.freeze(manifest);
    }
}
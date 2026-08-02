/**
 * TOPCARE AI PLATFORM V2 — PLUGIN MANIFEST SCHEMA & DTO
 * Path: assets/js/sdk/plugin.manifest.schema.js
 * Status: ACTIVE (SPRINT G - LOCKED GOLDEN BASELINE)
 */

import { deepFreezeDTO } from '../core/utils/dto.js';

export const PLUGIN_SCHEMA_VERSION = '2.0.0';

export function createExternalPluginManifestDTO({
    id,
    version = '1.0.0',
    displayName,
    description = '',
    author = 'Third-Party Developer',
    entryPoint = './plugin.js',
    minimumPlatform = '2.1.0',
    maximumPlatform = '2.9.9',
    supportedApiVersion = '1.0',
    permissions = [],
    dependencies = [],
    signature = 'sig_valid_developer'
}) {
    if (!id || typeof id !== 'string') {
        throw new Error('[ExternalPluginManifestDTO] Plugin ID is required.');
    }

    return deepFreezeDTO({
        schemaType: 'ExternalPluginManifestDTO',
        schemaVersion: PLUGIN_SCHEMA_VERSION,
        id: String(id).toLowerCase().trim(),
        version: String(version),
        displayName: String(displayName || id),
        description: String(description),
        author: String(author),
        entryPoint: String(entryPoint),
        minimumPlatform: String(minimumPlatform),
        maximumPlatform: String(maximumPlatform),
        supportedApiVersion: String(supportedApiVersion),
        permissions: Object.freeze(permissions.map(p => String(p).toLowerCase().trim())),
        dependencies: Object.freeze(dependencies.map(d => String(d).toLowerCase().trim())),
        signature: String(signature)
    });
}

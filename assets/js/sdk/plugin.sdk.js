/**
 * TOPCARE AI PLATFORM V2 — OFFICIAL IMMUTABLE PLUGIN SDK
 * Path: assets/js/sdk/plugin.sdk.js
 * Status: ACTIVE (SPRINT G - LOCKED GOLDEN BASELINE)
 * Role: Single Immutable Entry Point Provided to Third-Party Extension Developers
 */

import CapabilityRegistry from '../core/capability/capability.registry.js';
import PersonaRegistry from '../core/persona/persona.registry.js';
import { deepFreezeDTO } from '../core/utils/dto.js';

export const PluginSDK = Object.freeze({
    /**
     * Official Isolated Gateway allowing external developers to register Capabilities.
     */
    registerCapability(pluginPermissionScope, rawCapabilityManifest) {
        if (!pluginPermissionScope.includes('register-capability')) {
            throw new Error('[PluginSDK] Permission Denied: Manifest lacks "register-capability" permission token.');
        }
        return CapabilityRegistry.register(rawCapabilityManifest);
    },

    /**
     * Official Isolated Gateway allowing external developers to register Personas.
     */
    registerPersona(pluginPermissionScope, rawPersonaManifest) {
        if (!pluginPermissionScope.includes('register-persona')) {
            throw new Error('[PluginSDK] Permission Denied: Manifest lacks "register-persona" permission token.');
        }
        return PersonaRegistry.register(rawPersonaManifest);
    },

    /**
     * Returns Read-Only SDK Metadata.
     */
    getSDKInfo() {
        return deepFreezeDTO({
            sdkVersion: '1.0.0',
            compatiblePlatformVersion: '2.1.0'
        });
    }
});

export default PluginSDK;

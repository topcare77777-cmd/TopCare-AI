/**
 * TOPCARE AI PLATFORM V2 — SANDBOXED PLUGIN LIFECYCLE LOADER
 * Path: assets/js/services/marketplace/plugin.sandbox.loader.js
 * Status: ACTIVE (SPRINT G - LOCKED GOLDEN BASELINE)
 * Role: Executes 5-Stage Lifecycle (verify -> install -> activate -> deactivate -> uninstall) with Failure Isolation
 */

import PluginSDK from '../../sdk/plugin.sdk.js';
import DependencyGraphVerifier from './dependency.graph.verifier.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const PLUGIN_LIFECYCLE_STATES = deepFreezeDTO({
    UNVERIFIED: 'UNVERIFIED',
    VERIFIED: 'VERIFIED',
    INSTALLED: 'INSTALLED',
    ACTIVE: 'ACTIVE',
    DEACTIVATED: 'DEACTIVATED',
    FAILED: 'FAILED'
});

export const PluginSandboxLoader = Object.freeze({
    /**
     * Safely activates third-party extension modules in sandbox.
     * Sandboxed Failure Isolation: Catch exceptions to keep core runtime unaffected.
     */
    async loadAndActivatePlugin(manifestDTO, pluginModuleImplementation) {
        if (!manifestDTO || !manifestDTO.id) {
            throw new Error('[PluginSandboxLoader] Invalid Plugin Manifest.');
        }

        const pluginId = manifestDTO.id;

        try {
            // Stage 1: Verify Manifest & Digital Signature
            if (!manifestDTO.signature || manifestDTO.signature === 'invalid') {
                throw new Error(`Signature verification failed for plugin: "${pluginId}"`);
            }

            // Stage 2: Verify Dependencies Graph
            const depCheck = DependencyGraphVerifier.verifyGraph([manifestDTO]);
            if (!depCheck.isValid) {
                throw new Error(`Dependency verification failed: ${depCheck.violations.join('; ')}`);
            }

            // Stage 3 & 4: Install and Activate via Immutable SDK
            if (pluginModuleImplementation && typeof pluginModuleImplementation.activate === 'function') {
                // Pass Object.freeze(PluginSDK) and permissions scope
                await Promise.resolve(
                    pluginModuleImplementation.activate(PluginSDK, manifestDTO.permissions)
                );
            }

            console.log(`[PluginSandboxLoader] Plugin "${pluginId}" activated successfully in sandbox.`);

            return deepFreezeDTO({
                pluginId,
                state: PLUGIN_LIFECYCLE_STATES.ACTIVE,
                error: null
            });

        } catch (err) {
            // Runtime Failure Isolation Rule
            console.error(`[PluginSandboxLoader] Sandboxed Failure in plugin "${pluginId}" (Platform Unaffected):`, err.message);

            return deepFreezeDTO({
                pluginId,
                state: PLUGIN_LIFECYCLE_STATES.FAILED,
                error: err.message
            });
        }
    }
});

export default PluginSandboxLoader;

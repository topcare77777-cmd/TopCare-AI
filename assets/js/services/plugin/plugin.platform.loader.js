/**
 * TOPCARE AI PLATFORM V2 — PLUGIN PLATFORM LOADER & REGISTRY
 * Path: assets/js/services/plugin/plugin.platform.loader.js & plugin.registry.js
 * Status: ACTIVE (BUILD AC-025 - LOCKED GOLDEN BASELINE)
 * Role: Manages Plugin Lifecycle, Registration, and Sandboxed Safe Execution
 */

import { PLUGIN_STATES, createPluginHealthDTO } from '../../core/plugin/plugin.contract.js';
import PluginRuntimeAPI from '../../core/plugin/plugin.runtime.api.js';
import PluginDependencyResolver from './plugin.dependency.resolver.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const PluginPlatformRegistry = (() => {
    const registeredManifests = new Map();
    const pluginInstances = new Map();
    const pluginHealthMap = new Map();

    function registerManifest(manifestDTO) {
        if (!manifestDTO || !manifestDTO.pluginId) {
            throw new Error('[PluginPlatformRegistry] Invalid PluginManifestDTO provided.');
        }
        registeredManifests.set(manifestDTO.pluginId, manifestDTO);
        pluginHealthMap.set(
            manifestDTO.pluginId,
            createPluginHealthDTO({ pluginId: manifestDTO.pluginId, state: PLUGIN_STATES.INSTALLED })
        );
    }

    function getHealth(pluginId) {
        return pluginHealthMap.get(pluginId) || null;
    }

    function updateHealth(pluginId, state, lastError = null) {
        pluginHealthMap.set(
            pluginId,
            createPluginHealthDTO({ pluginId, state, lastError })
        );
    }

    function listManifests() {
        return deepFreezeDTO(Array.from(registeredManifests.values()));
    }

    function snapshot() {
        return deepFreezeDTO({
            totalRegistered: registeredManifests.size,
            manifests: Array.from(registeredManifests.values()),
            health: Array.from(pluginHealthMap.values())
        });
    }

    return Object.freeze({
        registerManifest,
        getHealth,
        updateHealth,
        listManifests,
        snapshot
    });
})();

export const PluginPlatformLoader = Object.freeze({
    /**
     * Executes safe activation pipeline over registered plugins.
     * Sandboxed Failure: Plugin exception disables the plugin without crashing Core Runtime.
     */
    async activateAll(runtimeComponents = {}) {
        const manifests = PluginPlatformRegistry.listManifests();

        // 1. Dependency Resolution
        const depReport = PluginDependencyResolver.resolveDependencies(manifests);
        if (!depReport.valid) {
            console.error('[PluginPlatformLoader] Plugin activation aborted due to dependency violations:', depReport.violations);
            return depReport;
        }

        // 2. Activate Plugins in Topological Order
        for (const pluginId of depReport.activationOrder) {
            const manifest = manifests.find(m => m.pluginId === pluginId);
            if (!manifest) continue;

            try {
                PluginPlatformRegistry.updateHealth(pluginId, PLUGIN_STATES.INITIALIZED);

                // Create isolated Read-Only API Sandbox
                const apiSandbox = PluginRuntimeAPI.createForPlugin(pluginId, runtimeComponents);

                // Dynamically import plugin module (Lazy Loading)
                const pluginModule = await import(manifest.entryPoint);
                const pluginImpl = pluginModule.default || pluginModule;

                // Execute Lifecycle Methods safely
                if (typeof pluginImpl.install === 'function') await pluginImpl.install(apiSandbox);
                if (typeof pluginImpl.initialize === 'function') await pluginImpl.initialize(apiSandbox);
                if (typeof pluginImpl.activate === 'function') await pluginImpl.activate(apiSandbox);

                PluginPlatformRegistry.updateHealth(pluginId, PLUGIN_STATES.ACTIVE);
                console.log(`[PluginPlatformLoader] Successfully activated plugin: "${pluginId}"`);

            } catch (err) {
                // Sandboxed Failure Isolation Rule
                console.error(`[PluginPlatformLoader] Sandboxed Failure in plugin "${pluginId}". Disabling plugin safely:`, err);
                PluginPlatformRegistry.updateHealth(pluginId, PLUGIN_STATES.FAILED, err.message);
            }
        }

        return depReport;
    }
});

export default PluginPlatformLoader;

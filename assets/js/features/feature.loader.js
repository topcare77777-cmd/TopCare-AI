/**
 * TOPCARE AI PLATFORM V2 — FEATURE LOADER
 * Path: assets/js/features/feature.loader.js
 * Version: 130.0.0 (BUILD 130 — MANIFEST-DRIVEN PIPELINE)
 * Status: APPROVED & LOCKED
 * SRP: Manifest-driven dynamic feature importer with safe optional fallback.
 */

import { FeatureManifestRegistry } from './feature.manifest.registry.js';
import { FeatureRegistry } from './feature.registry.js';
import { Core } from '../core/index.js';

export class FeatureLoaderEngine {
    constructor() {
        this._isLoaded = false;
        Object.seal(this);
    }

    /**
     * Dynamically imports all feature modules specified in FeatureManifestRegistry.
     */
    async loadAll() {
        if (this._isLoaded) return;

        Core.Logger.info('[FeatureLoader] Bootstrapping manifest-driven feature loading...');

        const manifests = FeatureManifestRegistry.getManifests();

        for (const item of manifests) {
            try {
                // Dynamic import driven purely by manifest relative module path
                const pageMod = await import(item.modulePath);

                // Extract Exported View (Default export or named Class/Object)
                const targetView = pageMod.default ||
                    pageMod[`${item.id}Page`] ||
                    pageMod.LoginPage ||
                    pageMod.RegisterPage ||
                    pageMod.ForgotPasswordPage ||
                    pageMod;

                FeatureRegistry.register(item.id, {
                    id: item.id,
                    path: item.path,
                    view: targetView,
                    isProtected: item.isProtected,
                    aliases: item.aliases || []
                });

            } catch (error) {
                // Graceful Degradation for Optional Features / Missing Page Files
                Core.Logger.warn(`[FeatureLoader] Optional feature module '${item.id}' failed to load from path '${item.modulePath}': ${error.message}`);
            }
        }

        this._isLoaded = true;
        Core.Logger.info('[FeatureLoader] Manifest-driven feature loading completed.');
    }
}

export const FeatureLoader = new FeatureLoaderEngine();
export default FeatureLoader;
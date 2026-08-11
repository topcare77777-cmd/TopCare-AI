/**
 * TOPCARE AI PLATFORM V2 — ROUTE LOADER
 * Path: assets/js/router/route.loader.js
 * Version: 131.1.0 (BUILD 131 — MANIFEST-FIRST METADATA)
 * Status: APPROVED & STABILIZED
 */

import { FeatureManifestRegistry } from '../features/feature.manifest.registry.js';
import { Router } from './router.service.js';
import { Core } from '../core/index.js';

export class RouteLoaderEngine {
    constructor() {
        Object.seal(this);
    }

    loadRoutes() {
        // Menggunakan array manifest mentah tanpa memicu module import
        const manifests = FeatureManifestRegistry.getManifests();

        manifests.forEach(manifest => {
            const routeMeta = {
                path: manifest.path,
                name: manifest.id,
                featureId: manifest.id,
                isProtected: Boolean(manifest.isProtected)
            };

            // Register canonical route
            Router.register(manifest.path, routeMeta);

            // Register aliases resolving back to the canonical featureId
            if (Array.isArray(manifest.aliases)) {
                manifest.aliases.forEach(alias => {
                    Router.register(alias, {
                        ...routeMeta,
                        path: alias
                    });
                });
            }
        });

        Core.Logger.info(`[RouteLoader] Registered route metadata from Manifest.`);
    }
}

export const RouteLoader = new RouteLoaderEngine();
export default RouteLoader;
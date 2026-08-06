/**
 * TOPCARE AI PLATFORM V2 — ROUTE LOADER
 * Path: assets/js/router/route.loader.js
 * Version: 130.0.0 (BUILD 130 — MANIFEST-DRIVEN ROUTE BINDING)
 * Status: APPROVED & LOCKED
 * SRP: Converts Feature Registry definitions into consistent Route Metadata for Router.
 */

import { FeatureRegistry } from '../features/feature.registry.js';
import { Router } from './router.service.js';
import { ViewMount } from '../view/view.mount.service.js';
import { Core } from '../core/index.js';

export class RouteLoaderEngine {
    constructor() {
        this._isLoaded = false;
        Object.seal(this);
    }

    /**
     * Binds all feature-based route metadata to the Router Service.
     */
    loadRoutes() {
        if (this._isLoaded) return;

        Core.Logger.info('[RouteLoader] Mapping Feature Manifest to Router Service...');

        const features = FeatureRegistry.getAllFeatures();

        features.forEach((feature) => {
            const routeMetadata = {
                path: feature.path,
                name: feature.id,
                viewId: feature.id,
                feature: feature.id,
                handler: async () => {
                    await ViewMount.mount(routeMetadata);
                }
            };

            // Register primary path
            Router.register(routeMetadata.path, routeMetadata.handler);

            // Bind route aliases derived strictly from manifest
            if (Array.isArray(feature.aliases)) {
                feature.aliases.forEach((aliasPath) => {
                    const formattedAlias = aliasPath.startsWith('/') ? aliasPath : `/${aliasPath}`;
                    const aliasRoute = {
                        ...routeMetadata,
                        path: formattedAlias
                    };
                    Router.register(aliasRoute.path, aliasRoute.handler);
                });
            }
        });

        // Default Root Fallback Navigation
        if (!Router.has('/')) {
            Router.register('/', async () => {
                Router.navigate('/home');
            });
        }

        this._isLoaded = true;
        Core.Logger.info('[RouteLoader] Manifest route mapping execution completed.');
    }
}

export const RouteLoader = new RouteLoaderEngine();
export default RouteLoader;
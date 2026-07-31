/**
 * file: assets/js/features/feature.route.loader.js
 */

import { Core } from '../core/index.js';
import { RouteLoader } from '../router/index.js';
import { FeatureRegistry } from './feature.registry.js';

export const FeatureRouteLoader = Object.freeze({
    loadRoutesForFeature(featureName, featureDef) {
        try {
            if (featureDef && Array.isArray(featureDef.routes)) {
                for (const route of featureDef.routes) {
                    if (route && route.path && route.name) {
                        RouteLoader.register(route.path, {
                            name: route.name,
                            feature: featureName,
                            ...(route.options || {})
                        });
                        Core.Logger.info(`FeatureRouteLoader registered route '${route.path}' for feature '${featureName}'`);
                    }
                }
            }
        } catch (error) {
            Core.Logger.error(`Route registration failed for feature '${featureName}': ${error.message}`);
        }
    },

    loadRoutes() {
        Core.Logger.info("FeatureRouteLoader extracting and registering routes from all active features...");
        try {
            const allFeatures = FeatureRegistry.getAll();
            for (const [featureName, featureDef] of Object.entries(allFeatures)) {
                this.loadRoutesForFeature(featureName, featureDef);
            }
            return true;
        } catch (error) {
            Core.Logger.error(`FeatureRouteLoader batch route extraction failed: ${error.message}`);
            throw error;
        }
    }
});
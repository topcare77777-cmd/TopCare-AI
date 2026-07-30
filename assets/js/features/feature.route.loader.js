/**
 * file: assets/js/features/feature.route.loader.js
 */

import { Core } from '../core/index.js';
import { RouteLoader } from '../router/index.js';
import { FeatureRegistry } from './feature.registry.js';

export const FeatureRouteLoader = Object.freeze({
    loadRoutes() {
        Core.Logger.info("FeatureRouteLoader extracting and registering routes from feature modules...");

        try {
            const allFeatures = FeatureRegistry.getAll();
            let registeredCount = 0;

            for (const [featureName, featureDef] of Object.entries(allFeatures)) {
                if (featureDef && Array.isArray(featureDef.routes)) {
                    for (const route of featureDef.routes) {
                        if (route && route.path && route.name) {
                            // Register route dynamically into RouteLoader SSOT
                            RouteLoader.register(route.path, {
                                name: route.name,
                                feature: featureName,
                                ...(route.options || {})
                            });
                            registeredCount++;
                            Core.Logger.info(`FeatureRouteLoader registered route '${route.path}' for feature '${featureName}'`);
                        }
                    }
                }
            }

            Core.Logger.info(`FeatureRouteLoader successfully registered ${registeredCount} feature routes.`);
            return true;
        } catch (error) {
            Core.Logger.error(`FeatureRouteLoader route extraction failed: ${error.message}`);
            throw error;
        }
    }
});
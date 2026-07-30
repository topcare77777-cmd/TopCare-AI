/**
 * file: assets/js/features/feature.loader.js
 */

import { Core } from '../core/index.js';
import { FeatureRegistry } from './index.js';
import { FeatureRouteLoader } from './feature.route.loader.js';
import { PersonalityFeature } from './personality/personality.feature.js';
import { CoachFeature } from './coach/coach.feature.js';

export const FeatureLoader = Object.freeze({
    async load() {
        Core.Logger.info("FeatureLoader starting automated feature registration & route binding...");

        try {
            // 1. Register Feature Modules into FeatureRegistry
            FeatureRegistry.register("personality", PersonalityFeature);
            Core.Logger.info("FeatureLoader registered: personality");

            FeatureRegistry.register("coach", CoachFeature);
            Core.Logger.info("FeatureLoader registered: coach");

            // 2. Extract and Register Feature Routes into RouteLoader SSOT
            FeatureRouteLoader.loadRoutes();

            Core.Logger.info("FeatureLoader successfully loaded all enterprise feature modules and routes.");
            return true;
        } catch (error) {
            Core.Logger.error(`FeatureLoader load failed: ${error.message}`);
            throw error;
        }
    }
});
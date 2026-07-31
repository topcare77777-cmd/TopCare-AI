/**
 * file: assets/js/features/feature.bootstrap.js
 */

import { Core } from '../core/index.js';
import { Container } from '../container/index.js';
import { FeatureRegistry } from './feature.registry.js';
import { FeatureLifecycleRegistry } from './feature.lifecycle.registry.js';
import { ViewRegistry } from '../view/index.js';

export const FeatureBootstrap = Object.freeze({
    async bootAndInitializeFeature(featureId, featureDef) {
        Core.Logger.info(`FeatureBootstrap running pipeline for dynamically loaded feature: ${featureId}`);

        // 1. Register into FeatureRegistry (which indexes views automatically)
        if (!FeatureRegistry.has(featureId)) {
            FeatureRegistry.register(featureId, featureDef);
        }

        // 2. Execute Lifecycle Boot & Initialize
        const currentState = FeatureLifecycleRegistry.getState(featureId);
        if (currentState === 'registered') {
            await FeatureLifecycleRegistry.boot(featureId, featureDef);
            await FeatureLifecycleRegistry.initialize(featureId, featureDef, Container);
        }

        Core.Logger.info(`FeatureBootstrap successfully prepared feature: ${featureId}`);
        return featureDef;
    }
});
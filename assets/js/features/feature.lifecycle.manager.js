/**
 * file: assets/js/features/feature.lifecycle.manager.js
 */

import { FeatureLifecycleBase } from './feature.lifecycle.base.js';

export class FeatureLifecycleManager {
    static initialize(engine) {
        if (!(engine instanceof FeatureLifecycleBase)) {
            throw new TypeError("FeatureLifecycleManager requires an instance of FeatureLifecycleBase.");
        }
        return engine;
    }
}
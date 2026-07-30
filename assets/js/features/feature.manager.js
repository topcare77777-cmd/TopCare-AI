/**
 * file: assets/js/features/feature.manager.js
 */

import { FeatureBase } from './feature.base.js';

export class FeatureManager {
    static initialize(engine) {
        if (!(engine instanceof FeatureBase)) {
            throw new TypeError("FeatureManager requires an instance of FeatureBase.");
        }
        return engine;
    }
}
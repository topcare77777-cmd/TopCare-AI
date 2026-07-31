/**
 * file: assets/js/features/feature.loader.manager.js
 */

import { FeatureLoaderBase } from './feature.loader.base.js';

export class FeatureLoaderManager {
    static initialize(engine) {
        if (!(engine instanceof FeatureLoaderBase)) {
            throw new TypeError("FeatureLoaderManager requires an instance of FeatureLoaderBase.");
        }
        return engine;
    }
}
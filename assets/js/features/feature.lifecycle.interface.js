/**
 * file: assets/js/features/feature.lifecycle.interface.js
 */

export class FeatureLifecycleInterface {
    boot(featureName, featureDef) { throw new Error("Not implemented"); }
    initialize(featureName, featureDef, container) { throw new Error("Not implemented"); }
    mount(featureName, featureDef, context) { throw new Error("Not implemented"); }
    ready(featureName, featureDef) { throw new Error("Not implemented"); }
    unmount(featureName, featureDef) { throw new Error("Not implemented"); }
    destroy(featureName, featureDef) { throw new Error("Not implemented"); }
    getLifecycleState(featureName) { throw new Error("Not implemented"); }
}
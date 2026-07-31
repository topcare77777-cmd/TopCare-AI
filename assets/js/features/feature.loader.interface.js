/**
 * file: assets/js/features/feature.loader.interface.js
 */

export class FeatureLoaderInterface {
    registerManifest(manifest) { throw new Error("Not implemented"); }
    async load(featureId) { throw new Error("Not implemented"); }
    async prefetch(featureId) { throw new Error("Not implemented"); }
    isLoaded(featureId) { throw new Error("Not implemented"); }
}
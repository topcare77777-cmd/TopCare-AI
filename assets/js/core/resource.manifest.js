/**
 * TopCare AI Platform V2.0.0
 * Resource Manifest
 * Path: assets/js/core/resource.manifest.js
 */
const ResourceManifest = {
    assets: new Map(),
    register(name, path) { this.assets.set(name, path); },
    get(name) { return this.assets.get(name); }
};

export default ResourceManifest;
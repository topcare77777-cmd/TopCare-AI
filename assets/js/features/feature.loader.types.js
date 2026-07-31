/**
 * file: assets/js/features/feature.loader.types.js
 */

export const LOADER_STATES = Object.freeze({
    NOT_LOADED: 'not_loaded',
    LOADING: 'loading',
    LOADED: 'loaded',
    FAILED: 'failed',
    CACHED: 'cached',
    PREFETCHED: 'prefetched'
});

export class ManifestValidator {
    static validate(manifest) {
        if (!manifest || typeof manifest !== 'object') {
            throw new TypeError("Manifest must be a valid non-null object.");
        }
        if (!manifest.id || typeof manifest.id !== 'string') {
            throw new TypeError("Manifest requires a valid string 'id'.");
        }
        if (!manifest.version || typeof manifest.version !== 'string') {
            throw new TypeError(`Manifest '${manifest.id}' requires a valid string 'version'.`);
        }
        if (manifest.loader && typeof manifest.loader !== 'function') {
            throw new TypeError(`Manifest '${manifest.id}' loader must be a function returning a dynamic import().`);
        }
        if (manifest.routes && !Array.isArray(manifest.routes)) {
            throw new TypeError(`Manifest '${manifest.id}' routes must be an array of route objects.`);
        }
        if (manifest.dependencies && !Array.isArray(manifest.dependencies)) {
            throw new TypeError(`Manifest '${manifest.id}' dependencies must be an array of feature ID strings.`);
        }
        return true;
    }
}
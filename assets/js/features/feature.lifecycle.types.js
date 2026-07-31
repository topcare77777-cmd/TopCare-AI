/**
 * file: assets/js/features/feature.lifecycle.types.js
 */

export const FEATURE_LIFECYCLE_EVENTS = Object.freeze({
    BOOT: 'feature.boot',
    INITIALIZED: 'feature.initialized',
    MOUNTED: 'feature.mounted',
    READY: 'feature.ready',
    ACTIVE: 'feature.active',
    UNMOUNTED: 'feature.unmounted',
    DESTROYED: 'feature.destroyed',
    FAILED: 'feature.failed'
});

export const FEATURE_STATES = Object.freeze({
    REGISTERED: 'registered',
    BOOTED: 'booted',
    INITIALIZED: 'initialized',
    MOUNTED: 'mounted',
    READY: 'ready',
    ACTIVE: 'active',
    UNMOUNTED: 'unmounted',
    DESTROYED: 'destroyed',
    FAILED: 'failed'
});
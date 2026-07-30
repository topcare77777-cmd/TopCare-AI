/**
 * file: assets/js/container/container.types.js
 */

export const LIFECYCLE_TYPES = Object.freeze({
    SINGLETON: 'singleton',
    TRANSIENT: 'transient'
});

export const CONTAINER_EVENTS = Object.freeze({
    REGISTERED: 'container.registered',
    RESOLVED: 'container.resolved',
    REMOVED: 'container.removed',
    CLEARED: 'container.cleared'
});
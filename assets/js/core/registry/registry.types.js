/**
 * TOPCARE CORE RUNTIME (TCR) — REGISTRY.TYPES.JS
 * SSOT for Registry Types and Action Identifiers.
 */

export const REGISTRY_TYPES = Object.freeze({
    COMPONENT: 'component',
    SERVICE: 'service',
    PAGE: 'page',
    MODULE: 'module',
    SYSTEM: 'system',
    PLUGIN: 'plugin',
    STORE: 'store'
});

export const REGISTRY_ACTIONS = Object.freeze({
    REGISTERED: 'registered',
    UNREGISTERED: 'unregistered',
    REMOVED: 'removed',
    CLEARED: 'cleared'
});
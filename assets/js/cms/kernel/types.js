/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Kernel Types Contract
 * ==========================================================
 *
 * File    : types.js
 * Version : 1.0.0
 *
 * Purpose:
 * Centralized immutable data contracts.
 *
 * References:
 * - docs/Kernel-Architecture.md
 * - docs/Kernel-API.md
 * - docs/Kernel-Sequence.md
 * - docs/Kernel-ADR.md
 *
 * Principles:
 * - Contract First
 * - Immutable Data Shape
 * - Zero Dependency
 * - No Runtime Logic
 *
 * ==========================================================
 */

"use strict";


/**
 * Deep freeze helper
 *
 * @param {object} object
 * @returns {object}
 */
function deepFreeze(object) {

    if (
        !object ||
        typeof object !== "object"
    ) {

        return object;

    }


    Object.freeze(object);


    for (const value of Object.values(object)) {

        deepFreeze(value);

    }


    return object;

}


/**
 * Event Envelope Contract
 *
 * Standard payload wrapper
 */
export const EventEnvelope = Object.freeze({

    name: "",

    payload: null,

    timestamp: 0,

    source: "",

    metadata: {},

});


/**
 * Event Result Contract
 */
export const EventResult = Object.freeze({

    event: "",

    listener: "",

    success: false,

    value: null,

    error: null

});


/**
 * Store Snapshot Contract
 */
export const StoreSnapshot = Object.freeze({

    state: {},

    version: 0,

    timestamp: 0

});


/**
 * Store Change Contract
 */
export const StoreChange = Object.freeze({

    key: "",

    previous: null,

    current: null,

    timestamp: 0

});


/**
 * Service Definition Contract
 */
export const ServiceDefinition = Object.freeze({

    name: "",

    scope: "",

    factory: null,

    dependencies: []

});


/**
 * Module Definition Contract
 */
export const ModuleDefinition = Object.freeze({

    name: "",

    version: "",

    dependencies: [],

    initialize: null,

    boot: null,

    mount: null,

    destroy: null

});


/**
 * Plugin Definition Contract
 */
export const PluginDefinition = Object.freeze({

    name: "",

    version: "",

    author: "",

    dependencies: [],

    install: null,

    enable: null,

    disable: null,

    destroy: null

});


/**
 * Lifecycle Context Contract
 */
export const LifecycleContext = Object.freeze({

    state: "",

    timestamp: 0,

    services: null,

    metadata: {}

});


/**
 * Listener Definition Contract
 */
export const ListenerDefinition = Object.freeze({

    event: "",

    priority: 0,

    once: false,

    handler: null

});


/**
 * Kernel Context Contract
 */
export const KernelContext = Object.freeze({

    id: "",

    version: "",

    environment: "",

    createdAt: 0

});


/**
 * Validation Result Contract
 */
export const ValidationResult = Object.freeze({

    valid: false,

    errors: [],

    warnings: []

});


/**
 * Default Export
 */
export default deepFreeze({

    EventEnvelope,

    EventResult,

    StoreSnapshot,

    StoreChange,

    ServiceDefinition,

    ModuleDefinition,

    PluginDefinition,

    LifecycleContext,

    ListenerDefinition,

    KernelContext,

    ValidationResult

});
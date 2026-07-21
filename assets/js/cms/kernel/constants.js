/**
 * ==========================================================
 * TopCare AI CMS Framework
 * Kernel Constants
 * ==========================================================
 *
 * File    : constants.js
 * Version : 1.0.0
 *
 * Purpose:
 * Single Source of Truth for Kernel contracts.
 *
 * References:
 * - docs/Kernel-Architecture.md
 * - docs/Kernel-API.md
 * - docs/Kernel-Sequence.md
 * - docs/Kernel-ADR.md
 *
 * Principles:
 * - Immutable Contract
 * - No Magic Strings
 * - Zero Dependency
 * - Predictable Runtime Behavior
 *
 * ==========================================================
 */

"use strict";


/**
 * Deep freeze utility
 *
 * Prevent runtime mutation
 *
 * @param {object} object
 * @returns {object}
 */
function deepFreeze(object) {

    Object.freeze(object);

    for (const value of Object.values(object)) {

        if (
            value &&
            typeof value === "object" &&
            !Object.isFrozen(value)
        ) {

            deepFreeze(value);

        }

    }

    return object;

}


/**
 * Kernel Lifecycle States
 */
export const LIFECYCLE = deepFreeze({

    CREATED: "CREATED",

    INITIALIZING: "INITIALIZING",

    INITIALIZED: "INITIALIZED",

    BOOTING: "BOOTING",

    BOOTED: "BOOTED",

    MOUNTING: "MOUNTING",

    MOUNTED: "MOUNTED",

    RUNNING: "RUNNING",

    DESTROYING: "DESTROYING",

    DESTROYED: "DESTROYED",

});


/**
 * Kernel Error Codes
 */
export const ERROR_CODES = deepFreeze({

    UNKNOWN: "CMS_ERROR",

    INVALID_ARGUMENT:
        "CMS_INVALID_ARGUMENT",

    INVALID_STATE:
        "CMS_INVALID_STATE",

    EVENT_INVALID:
        "CMS_EVENT_INVALID",

    LISTENER_INVALID:
        "CMS_LISTENER_INVALID",

    STORE_INVALID:
        "CMS_STORE_INVALID",

    SERVICE_INVALID:
        "CMS_SERVICE_INVALID",

    MODULE_INVALID:
        "CMS_MODULE_INVALID",

    PLUGIN_INVALID:
        "CMS_PLUGIN_INVALID",

    DUPLICATE:
        "CMS_DUPLICATE",

    NOT_FOUND:
        "CMS_NOT_FOUND",

    INITIALIZATION_FAILED:
        "CMS_INITIALIZATION_FAILED",

    BOOT_FAILED:
        "CMS_BOOT_FAILED",

    MOUNT_FAILED:
        "CMS_MOUNT_FAILED",

    DESTROY_FAILED:
        "CMS_DESTROY_FAILED"

});


/**
 * Event Namespace
 */
export const EVENTS = deepFreeze({

    SYSTEM: {

        READY:
            "system.ready",

        ERROR:
            "system.error",

        DESTROY:
            "system.destroy"

    },


    CMS: {

        INITIALIZED:
            "cms.initialized",

        BOOTED:
            "cms.booted",

        MOUNTED:
            "cms.mounted",

        DESTROYED:
            "cms.destroyed"

    },


    STORE: {

        UPDATED:
            "store.updated",

        CHANGED:
            "store.changed"

    },


    MODULE: {

        REGISTERED:
            "module.registered",

        LOADED:
            "module.loaded",

        DESTROYED:
            "module.destroyed"

    },


    PLUGIN: {

        REGISTERED:
            "plugin.registered",

        ENABLED:
            "plugin.enabled",

        DISABLED:
            "plugin.disabled"

    }

});


/**
 * Service Container Scope
 */
export const SERVICE_SCOPE = deepFreeze({

    SINGLETON:
        "singleton",

    TRANSIENT:
        "transient"

});


/**
 * Module States
 */
export const MODULE_STATE = deepFreeze({

    REGISTERED:
        "registered",

    INITIALIZED:
        "initialized",

    ACTIVE:
        "active",

    DISABLED:
        "disabled",

    DESTROYED:
        "destroyed"

});


/**
 * Plugin States
 */
export const PLUGIN_STATE = deepFreeze({

    REGISTERED:
        "registered",

    INSTALLED:
        "installed",

    ENABLED:
        "enabled",

    DISABLED:
        "disabled",

    DESTROYED:
        "destroyed"

});


/**
 * Runtime Limits
 *
 * Centralized performance guard.
 */
export const LIMITS = deepFreeze({

    MAX_EVENT_LISTENERS:
        100,

    MAX_WATCHERS:
        100,

    MAX_MODULE_DEPTH:
        10,

    MAX_PLUGIN_DEPTH:
        10

});


/**
 * Kernel Metadata
 */
export const KERNEL = deepFreeze({

    NAME:
        "TopCare AI CMS Kernel",

    VERSION:
        "1.0.0",

    ENVIRONMENTS: [

        "development",

        "testing",

        "production"

    ]

});


/**
 * Default Export
 */
export default deepFreeze({

    LIFECYCLE,

    ERROR_CODES,

    EVENTS,

    SERVICE_SCOPE,

    MODULE_STATE,

    PLUGIN_STATE,

    LIMITS,

    KERNEL

});
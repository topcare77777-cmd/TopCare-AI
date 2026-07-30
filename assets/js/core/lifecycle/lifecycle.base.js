/**
 * file: assets/js/core/lifecycle/lifecycle.base.js
 */

import { LifecycleInterface } from './lifecycle.interface.js';

export class LifecycleBase extends LifecycleInterface {
    constructor() {
        super();
        this._beforeBootHooks = [];
        this._afterBootHooks = [];
        this._beforeShutdownHooks = [];
        this._afterShutdownHooks = [];
        Object.seal(this);
    }

    _validateCallback(callback) {
        if (typeof callback !== 'function') {
            throw new TypeError("Lifecycle hook must be a valid function.");
        }
    }

    registerBeforeBoot(callback) {
        this._validateCallback(callback);
        this._beforeBootHooks.push(callback);
        return this;
    }

    registerAfterBoot(callback) {
        this._validateCallback(callback);
        this._afterBootHooks.push(callback);
        return this;
    }

    registerBeforeShutdown(callback) {
        this._validateCallback(callback);
        this._beforeShutdownHooks.push(callback);
        return this;
    }

    registerAfterShutdown(callback) {
        this._validateCallback(callback);
        this._afterShutdownHooks.push(callback);
        return this;
    }

    executeBeforeBoot() {
        for (const hook of this._beforeBootHooks) {
            hook();
        }
        return this;
    }

    executeAfterBoot() {
        for (const hook of this._afterBootHooks) {
            hook();
        }
        return this;
    }

    executeBeforeShutdown() {
        for (const hook of this._beforeShutdownHooks) {
            hook();
        }
        return this;
    }

    executeAfterShutdown() {
        for (const hook of this._afterShutdownHooks) {
            hook();
        }
        return this;
    }

    clear() {
        this._beforeBootHooks = [];
        this._afterBootHooks = [];
        this._beforeShutdownHooks = [];
        this._afterShutdownHooks = [];
        return this;
    }
}
/**
 * file: assets/js/core/runtime/runtime.base.js
 */

import { RuntimeInterface } from './runtime.interface.js';

export class RuntimeBase extends RuntimeInterface {
    constructor() {
        super();
        this._booted = false;
        this._state = 'idle';
        Object.seal(this);
    }

    boot() {
        if (this._booted) {
            return this;
        }
        this._state = 'booting';
        // Core runtime lifecycle hook execution placeholder
        this._booted = true;
        this._state = 'running';
        return this;
    }

    shutdown() {
        if (!this._booted) {
            return this;
        }
        this._state = 'shutting_down';
        // Core runtime shutdown hook execution placeholder
        this._booted = false;
        this._state = 'stopped';
        return this;
    }

    isBooted() {
        return this._booted;
    }

    getState() {
        return this._state;
    }
}
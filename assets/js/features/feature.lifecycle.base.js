/**
 * file: assets/js/features/feature.lifecycle.base.js
 */

import { Core } from '../core/index.js';
import { FeatureLifecycleInterface } from './feature.lifecycle.interface.js';
import { FEATURE_LIFECYCLE_EVENTS, FEATURE_STATES } from './feature.lifecycle.types.js';

export class FeatureLifecycleBase extends FeatureLifecycleInterface {
    constructor() {
        super();
        this._states = new Map();
        Object.seal(this);
    }

    _setState(featureName, state) {
        this._states.set(featureName, state);
    }

    getLifecycleState(featureName) {
        return this._states.get(featureName) || FEATURE_STATES.REGISTERED;
    }

    async boot(featureName, featureDef) {
        if (!featureName || !featureDef) {
            throw new TypeError("Feature lifecycle boot requires valid feature name and definition.");
        }

        const currentState = this.getLifecycleState(featureName);
        if (currentState === FEATURE_STATES.BOOTED || currentState === FEATURE_STATES.INITIALIZED || currentState === FEATURE_STATES.READY || currentState === FEATURE_STATES.ACTIVE) {
            return true;
        }

        Core.Logger.info(`Feature lifecycle boot starting for: ${featureName}`);
        try {
            if (typeof featureDef.boot === 'function') {
                await featureDef.boot();
            }
            this._setState(featureName, FEATURE_STATES.BOOTED);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.BOOT, { name: featureName });
            Core.Logger.info(`Feature booted successfully: ${featureName}`);
            return true;
        } catch (error) {
            this._setState(featureName, FEATURE_STATES.FAILED);
            Core.Logger.error(`Feature boot failed for '${featureName}': ${error.message}`);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.FAILED, { name: featureName, stage: 'boot', error: error.message });
            throw error;
        }
    }

    async initialize(featureName, featureDef, container) {
        if (!featureName || !featureDef) {
            throw new TypeError("Feature lifecycle initialize requires valid feature name and definition.");
        }

        const currentState = this.getLifecycleState(featureName);
        if (currentState === FEATURE_STATES.INITIALIZED || currentState === FEATURE_STATES.READY || currentState === FEATURE_STATES.ACTIVE) {
            return true;
        }

        Core.Logger.info(`Feature lifecycle initialize starting for: ${featureName}`);
        try {
            if (typeof featureDef.initialize === 'function') {
                await featureDef.initialize(container);
            }
            this._setState(featureName, FEATURE_STATES.INITIALIZED);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.INITIALIZED, { name: featureName });
            Core.Logger.info(`Feature initialized successfully: ${featureName}`);
            return true;
        } catch (error) {
            this._setState(featureName, FEATURE_STATES.FAILED);
            Core.Logger.error(`Feature initialization failed for '${featureName}': ${error.message}`);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.FAILED, { name: featureName, stage: 'initialize', error: error.message });
            throw error;
        }
    }

    async mount(featureName, featureDef, context = {}) {
        if (!featureName || !featureDef) {
            throw new TypeError("Feature lifecycle mount requires valid feature name and definition.");
        }

        const currentState = this.getLifecycleState(featureName);
        if (currentState === FEATURE_STATES.MOUNTED || currentState === FEATURE_STATES.ACTIVE) {
            return true; // Idempotent guard
        }

        Core.Logger.info(`Feature lifecycle mount starting for: ${featureName}`);
        try {
            if (typeof featureDef.mount === 'function') {
                await featureDef.mount(context);
            }
            this._setState(featureName, FEATURE_STATES.MOUNTED);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.MOUNTED, { name: featureName, context });
            Core.Logger.info(`Feature mounted successfully: ${featureName}`);
            return true;
        } catch (error) {
            this._setState(featureName, FEATURE_STATES.FAILED);
            Core.Logger.error(`Feature mount failed for '${featureName}': ${error.message}`);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.FAILED, { name: featureName, stage: 'mount', error: error.message });
            throw error;
        }
    }

    async ready(featureName, featureDef) {
        if (!featureName || !featureDef) {
            throw new TypeError("Feature lifecycle ready requires valid feature name and definition.");
        }

        const currentState = this.getLifecycleState(featureName);
        if (currentState === FEATURE_STATES.READY || currentState === FEATURE_STATES.ACTIVE) {
            return true; // Idempotent guard
        }

        Core.Logger.info(`Feature lifecycle ready starting for: ${featureName}`);
        try {
            if (typeof featureDef.ready === 'function') {
                await featureDef.ready();
            }
            this._setState(featureName, FEATURE_STATES.READY);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.READY, { name: featureName });

            // Immediately transition to ACTIVE as it is now actively rendered and utilized
            this._setState(featureName, FEATURE_STATES.ACTIVE);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.ACTIVE, { name: featureName });

            Core.Logger.info(`Feature ready and active successfully: ${featureName}`);
            return true;
        } catch (error) {
            this._setState(featureName, FEATURE_STATES.FAILED);
            Core.Logger.error(`Feature ready failed for '${featureName}': ${error.message}`);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.FAILED, { name: featureName, stage: 'ready', error: error.message });
            throw error;
        }
    }

    async unmount(featureName, featureDef) {
        if (!featureName || !featureDef) {
            throw new TypeError("Feature lifecycle unmount requires valid feature name and definition.");
        }

        const currentState = this.getLifecycleState(featureName);
        if (currentState === FEATURE_STATES.UNMOUNTED || currentState === FEATURE_STATES.DESTROYED) {
            return true; // Idempotent guard
        }

        Core.Logger.info(`Feature lifecycle unmount starting for: ${featureName}`);
        try {
            if (typeof featureDef.unmount === 'function') {
                await featureDef.unmount();
            }
            this._setState(featureName, FEATURE_STATES.UNMOUNTED);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.UNMOUNTED, { name: featureName });
            Core.Logger.info(`Feature unmounted successfully: ${featureName}`);
            return true;
        } catch (error) {
            this._setState(featureName, FEATURE_STATES.FAILED);
            Core.Logger.error(`Feature unmount failed for '${featureName}': ${error.message}`);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.FAILED, { name: featureName, stage: 'unmount', error: error.message });
            throw error;
        }
    }

    async destroy(featureName, featureDef) {
        if (!featureName || !featureDef) {
            throw new TypeError("Feature lifecycle destroy requires valid feature name and definition.");
        }

        const currentState = this.getLifecycleState(featureName);
        if (currentState === FEATURE_STATES.DESTROYED) {
            return true; // Idempotent guard
        }

        Core.Logger.info(`Feature lifecycle destroy starting for: ${featureName}`);
        try {
            if (typeof featureDef.destroy === 'function') {
                await featureDef.destroy();
            }
            this._setState(featureName, FEATURE_STATES.DESTROYED);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.DESTROYED, { name: featureName });
            Core.Logger.info(`Feature destroyed successfully: ${featureName}`);
            return true;
        } catch (error) {
            this._setState(featureName, FEATURE_STATES.FAILED);
            Core.Logger.error(`Feature destroy failed for '${featureName}': ${error.message}`);
            Core.Event.emit(FEATURE_LIFECYCLE_EVENTS.FAILED, { name: featureName, stage: 'destroy', error: error.message });
            throw error;
        }
    }
}
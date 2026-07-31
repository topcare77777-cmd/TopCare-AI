/**
 * file: assets/js/features/feature.base.js
 */

import { Core } from '../core/index.js';
import { Container } from '../container/index.js';
import { ViewRegistry } from '../view/index.js';
import { FeatureLifecycleRegistry } from './feature.lifecycle.registry.js';
import { FeatureInterface } from './feature.interface.js';
import { FEATURE_EVENTS } from './feature.types.js';

export class FeatureBase extends FeatureInterface {
    constructor() {
        super();
        this._registry = new Map();
        this._viewIndex = new Map(); // O(1) index mapping viewName -> featureName
        this._initialized = false;
        Object.seal(this);
    }

    register(name, definition, options = {}) {
        if (!name || typeof name !== 'string') {
            throw new TypeError("Feature registration name must be a valid non-empty string.");
        }
        if (!definition || typeof definition !== 'object') {
            throw new TypeError("Feature definition must be a valid object.");
        }

        if (this._registry.has(name)) {
            Core.Logger.warn(`Feature already registered: ${name}. Overwriting.`);
        }

        const featureMeta = {
            name,
            definition,
            options,
            initialized: false
        };

        this._registry.set(name, featureMeta);

        // Build O(1) index for views exposed by this feature
        if (definition && definition.views && typeof definition.views === 'object') {
            for (const [viewName, viewComponent] of Object.entries(definition.views)) {
                this._viewIndex.set(viewName, name);
                if (!ViewRegistry.has(viewName)) {
                    ViewRegistry.register(viewName, viewComponent, { feature: name });
                    Core.Logger.info(`Feature lifecycle adapter registered view '${viewName}' from feature '${name}'`);
                }
            }
        }

        Core.Logger.info(`Feature registered successfully: ${name}`);
        Core.Event.emit(FEATURE_EVENTS.REGISTERED, { name, options });

        return this;
    }

    resolve(name) {
        if (!name || typeof name !== 'string') {
            throw new TypeError("Feature resolve name must be a valid non-empty string.");
        }

        if (!this._registry.has(name)) {
            throw new Error(`Feature not found in registry: ${name}`);
        }

        return this._registry.get(name).definition;
    }

    getFeatureNameByView(viewName) {
        return this._viewIndex.get(viewName) || null;
    }

    has(name) {
        try {
            return this._registry.has(name);
        } catch (e) {
            return false;
        }
    }

    getAll() {
        const features = {};
        for (const [name, meta] of this._registry.entries()) {
            features[name] = meta.definition;
        }
        return Core.Utils.clone(features);
    }

    async initializeAll() {
        if (this._initialized) {
            Core.Logger.info("Features already initialized. Skipping.");
            return true;
        }

        Core.Logger.info("Booting and initializing registered feature modules...");

        for (const [name, meta] of this._registry.entries()) {
            try {
                if (!meta.initialized) {
                    const def = meta.definition;
                    await FeatureLifecycleRegistry.boot(name, def);
                    await FeatureLifecycleRegistry.initialize(name, def, Container);
                    meta.initialized = true;
                }
            } catch (error) {
                Core.Logger.error(`Failed feature initialization for '${name}': ${error.message}`);
                throw error;
            }
        }

        this._initialized = true;
        Core.Logger.info("All registered feature modules completed initialization successfully.");
        return true;
    }
}
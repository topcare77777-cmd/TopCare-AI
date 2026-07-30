/**
 * file: assets/js/features/feature.base.js
 */

import { Core } from '../core/index.js';
import { Container } from '../container/index.js';
import { ViewRegistry } from '../view/index.js';
import { FeatureInterface } from './feature.interface.js';
import { FEATURE_EVENTS } from './feature.types.js';

export class FeatureBase extends FeatureInterface {
    constructor() {
        super();
        this._registry = new Map();
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

        Core.Logger.info("Initializing registered feature modules...");

        for (const [name, meta] of this._registry.entries()) {
            try {
                if (!meta.initialized) {
                    // Check if feature definition exposes views and register them automatically to ViewRegistry
                    if (meta.definition && meta.definition.views && typeof meta.definition.views === 'object') {
                        for (const [viewName, viewComponent] of Object.entries(meta.definition.views)) {
                            if (!ViewRegistry.has(viewName)) {
                                ViewRegistry.register(viewName, viewComponent, { feature: name });
                                Core.Logger.info(`Feature adapter registered view '${viewName}' from feature '${name}'`);
                            }
                        }
                    }

                    // Check if feature definition has an initialize lifecycle hook
                    if (meta.definition && typeof meta.definition.initialize === 'function') {
                        await meta.definition.initialize(Container);
                    }
                    meta.initialized = true;
                    Core.Logger.info(`Feature initialized: ${name}`);
                    Core.Event.emit(FEATURE_EVENTS.INITIALIZED, { name });
                }
            } catch (error) {
                Core.Logger.error(`Failed to initialize feature '${name}': ${error.message}`);
                Core.Event.emit(FEATURE_EVENTS.FAILED, { name, error: error.message });
                throw error;
            }
        }

        this._initialized = true;
        Core.Event.emit(FEATURE_EVENTS.ALL_INITIALIZED, {});
        Core.Logger.info("All registered feature modules initialized successfully.");
        return true;
    }
}
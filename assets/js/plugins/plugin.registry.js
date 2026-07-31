/**
 * file: assets/js/plugins/plugin.registry.js
 * Memisahkan pencatatan internal agar tidak bercampur aduk (Clean Internal State).
 */
import { Core } from '../core/index.js';
import { PluginBase } from './plugin.base.js';
import { PluginManifestRegistry } from './plugin.manifest.registry.js';
import { PluginValidationService } from './plugin.validation.service.js';

class PluginRegistryBase {
    constructor() {
        this._plugins = new Map();   // id -> PluginBase Wrapper
        this._states = new Map();    // id -> PLUGIN_LIFECYCLE_STATES
        this._instances = new Map(); // id -> Instance
        Object.seal(this);
    }

    async register(manifest) {
        const validation = await PluginValidationService.validate(manifest);
        if (!validation.valid) {
            throw new Error(`Validation failed for '${manifest && manifest.id}': ${validation.errors.map(e => e.message).join('; ')}`);
        }

        await PluginManifestRegistry.registerAsync(manifest);

        const id = manifest.id;
        const ssotManifest = PluginManifestRegistry.get(id);
        const wrapper = new PluginBase(ssotManifest);

        this._plugins.set(id, wrapper);
        this._states.set(id, wrapper.state);
        this._instances.set(id, wrapper.instance);

        Core.Logger.info(`Plugin registered: ${id}`);
        return wrapper;
    }

    get(id) {
        return this._plugins.get(id) || null;
    }

    getState(id) {
        return this._states.get(id) || null;
    }

    has(id) {
        return this._plugins.has(id);
    }
}

export const PluginRegistry = Object.freeze(new PluginRegistryBase());
/**
 * file: assets/js/plugins/plugin.context.js
 */

import { Core } from '../core/index.js';
import { Container } from '../container/index.js';

export class ManifestContext {
    constructor(manifest) {
        this.id = manifest.id;
        this.name = manifest.name;
        this.version = manifest.version;
        this.permissions = Core.Utils.clone(manifest.permissions || {});
        this.capabilities = Core.Utils.clone(manifest.capabilities || []);
        this.meta = Core.Utils.clone(manifest.meta || {});
        Object.freeze(this);
    }
}

export class RuntimeContext {
    constructor(options = {}) {
        this.services = Core.Utils.clone(options.services || {});
        this.apis = Core.Utils.clone(options.apis || {});
        this.config = Core.Utils.clone(options.config || {});
        this.storage = Core.Utils.clone(options.storage || {});
        Object.freeze(this);
    }
}

export class ExecutionContext {
    constructor(options = {}) {
        this.customData = Core.Utils.clone(options.customData || {});
        this.requestId = Core.Utils.uuid ? Core.Utils.uuid() : Math.random().toString(36).substring(2);
        Object.freeze(this);
    }
}

export class PluginContext {
    constructor(pluginManifest, options = {}) {
        this.manifest = new ManifestContext(pluginManifest);
        this.runtime = new RuntimeContext(options);
        this.execution = new ExecutionContext(options);

        // Aliases for ergonomic access
        this.id = this.manifest.id;
        this.name = this.manifest.name;
        this.version = this.manifest.version;

        this.logger = Object.freeze({
            info: (msg) => Core.Logger.info(`[Plugin:${this.id}] ${msg}`),
            warn: (msg) => Core.Logger.warn(`[Plugin:${this.id}] ${msg}`),
            error: (msg) => Core.Logger.error(`[Plugin:${this.id}] ${msg}`)
        });

        this.event = Object.freeze({
            emit: (event, data) => Core.Event.emit(event, data),
            on: (event, cb) => Core.Event.on(event, cb),
            off: (event, cb) => Core.Event.off(event, cb)
        });

        this.utils = Object.freeze({
            clone: (obj) => Core.Utils.clone(obj),
            uuid: () => Core.Utils.uuid ? Core.Utils.uuid() : Math.random().toString(36).substring(2),
            now: () => Core.Utils.now ? Core.Utils.now() : Date.now(),
            deepFreeze: (obj) => Core.Utils.deepFreeze ? Core.Utils.deepFreeze(obj) : Object.freeze(obj)
        });

        const allowedServices = this.manifest.permissions.services || [];
        const allowAllServices = allowedServices === '*' || (Array.isArray(allowedServices) && allowedServices.includes('*'));

        this.container = Object.freeze({
            resolve: (key) => {
                if (!allowAllServices && !allowedServices.includes(key)) {
                    throw new Error(`Plugin '${this.id}' is unauthorized to resolve service '${key}'.`);
                }
                return Container.resolve(key);
            },
            has: (key) => (allowAllServices || allowedServices.includes(key)) && (Container.has ? Container.has(key) : false),
            optional: (key) => {
                if (!allowAllServices && !allowedServices.includes(key)) return null;
                try { return Container.resolve(key); } catch { return null; }
            }
        });

        Object.freeze(this);
    }
}
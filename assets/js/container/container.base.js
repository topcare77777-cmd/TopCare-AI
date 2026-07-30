/**
 * file: assets/js/container/container.base.js
 */

import { Core } from '../core/index.js';
import { ContainerInterface } from './container.interface.js';
import { LIFECYCLE_TYPES, CONTAINER_EVENTS } from './container.types.js';

export class ContainerBase extends ContainerInterface {
    constructor() {
        super();
        this._registry = new Map();
        Object.seal(this);
    }

    register(name, dependency, options = {}) {
        if (!name || typeof name !== 'string') {
            throw new TypeError("Container registration name must be valid.");
        }

        if (!dependency) {
            throw new TypeError("Container dependency cannot be empty.");
        }

        const lifecycle = options.lifecycle || LIFECYCLE_TYPES.SINGLETON;

        this._registry.set(name, {
            dependency,
            lifecycle,
            instance: lifecycle === LIFECYCLE_TYPES.SINGLETON ? dependency : null
        });

        Core.Logger.debug(`Container registered: ${name}`);
        Core.Event.emit(CONTAINER_EVENTS.REGISTERED, { name, lifecycle });

        return this;
    }

    resolve(name) {
        if (!this._registry.has(name)) {
            throw new Error(`Dependency not found: ${name}`);
        }

        const item = this._registry.get(name);

        if (item.lifecycle === LIFECYCLE_TYPES.TRANSIENT) {
            return new item.dependency();
        }

        Core.Event.emit(CONTAINER_EVENTS.RESOLVED, { name });
        return item.instance;
    }

    has(name) {
        return this._registry.has(name);
    }

    remove(name) {
        this._registry.delete(name);
        Core.Event.emit(CONTAINER_EVENTS.REMOVED, { name });
        return this;
    }

    clear() {
        this._registry.clear();
        Core.Event.emit(CONTAINER_EVENTS.CLEARED, {});
        return this;
    }

    getAll() {
        return Array.from(this._registry.keys());
    }
}
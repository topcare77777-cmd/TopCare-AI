/**
 * file: assets/js/view/view.base.js
 */

import { Core } from '../core/index.js';
import { ViewInterface } from './view.interface.js';
import { VIEW_EVENTS } from './view.types.js';

export class ViewBase extends ViewInterface {
    constructor() {
        super();
        this._registry = new Map();
        this._currentMountedComponent = null;
        Object.seal(this);
    }

    register(name, component, options = {}) {
        if (!name || typeof name !== 'string') {
            throw new TypeError("View registration name must be a valid non-empty string.");
        }
        if (!component || (typeof component !== 'function' && typeof component !== 'object')) {
            throw new TypeError("View component must be a valid renderable function or object.");
        }

        if (this._registry.has(name)) {
            Core.Logger.warn(`View already registered: ${name}. Overwriting.`);
        }

        const viewMeta = {
            name,
            component,
            options
        };

        this._registry.set(name, viewMeta);

        Core.Logger.info(`View registered successfully: ${name}`);
        Core.Event.emit(VIEW_EVENTS.REGISTERED, { name, options });

        return this;
    }

    resolve(name) {
        if (!name || typeof name !== 'string') {
            throw new TypeError("View resolve name must be a valid non-empty string.");
        }

        if (!this._registry.has(name)) {
            throw new Error(`View not found in registry: ${name}`);
        }

        return this._registry.get(name).component;
    }

    has(name) {
        try {
            return this._registry.has(name);
        } catch (e) {
            return false;
        }
    }

    async mount(name, rootContainer, data = {}) {
        if (!name || typeof name !== 'string') {
            throw new TypeError("View mount name must be a valid non-empty string.");
        }

        const container = typeof rootContainer === 'string'
            ? document.querySelector(rootContainer)
            : rootContainer;

        if (!container || !(container instanceof HTMLElement)) {
            throw new TypeError("View mount container must be a valid DOM HTMLElement or valid selector.");
        }

        Core.Logger.info(`View attempting to mount: ${name}`);

        try {
            const component = this.resolve(name);

            // Unmount/clean previous component if active
            if (this._currentMountedComponent && typeof this._currentMountedComponent.unmount === 'function') {
                try {
                    this._currentMountedComponent.unmount();
                } catch (e) {
                    Core.Logger.warn(`Error unmounting previous view component: ${e.message}`);
                }
            }

            // Clear container root
            container.innerHTML = '';

            let renderedNode = null;

            if (typeof component === 'function') {
                // Check if it's a class constructor or render function
                if (component.prototype && typeof component.prototype.render === 'function') {
                    const instance = new component(data);
                    renderedNode = typeof instance.render === 'function' ? instance.render() : instance;
                    this._currentMountedComponent = instance;
                } else {
                    renderedNode = component(data);
                    this._currentMountedComponent = { unmount: null };
                }
            } else if (component && typeof component.render === 'function') {
                renderedNode = component.render(data);
                this._currentMountedComponent = component;
            } else if (component instanceof HTMLElement) {
                renderedNode = component;
                this._currentMountedComponent = { unmount: null };
            }

            if (renderedNode instanceof HTMLElement) {
                container.appendChild(renderedNode);
            } else if (typeof renderedNode === 'string') {
                container.innerHTML = renderedNode;
            } else {
                throw new Error(`Component '${name}' did not return a valid HTMLElement or HTML string.`);
            }

            Core.Logger.info(`View successfully mounted: ${name}`);
            Core.Event.emit(VIEW_EVENTS.MOUNTED, { name, container });

            return true;
        } catch (error) {
            Core.Logger.error(`View mounting failed for '${name}': ${error.message}`);
            Core.Event.emit(VIEW_EVENTS.FAILED, { name, error: error.message });
            throw error;
        }
    }
}
/**
 * file: assets/js/view/view.mount.base.js
 */

import { Core } from '../core/index.js';
import { ViewRegistry } from './view.registry.js';
import { ROUTER_EVENTS } from '../router/index.js';
import { ViewMountInterface } from './view.mount.interface.js';

export class ViewMountBase extends ViewMountInterface {
    constructor(rootSelector = '#app') {
        super();
        this._rootSelector = rootSelector;
        this._listening = false;
        Object.seal(this);
    }

    start() {
        if (this._listening) {
            return this;
        }

        const eventName = ROUTER_EVENTS.CHANGED || 'router.changed';
        Core.Event.on(eventName, this._handleRouteChanged.bind(this));
        
        this._listening = true;
        Core.Logger.info("ViewMountService started listening to router events.");
        return this;
    }

    stop() {
        this._listening = false;
        Core.Logger.info("ViewMountService stopped listening.");
        return this;
    }

    isStarted() {
        return this._listening;
    }

    async _handleRouteChanged(eventData) {
        try {
            const route = eventData && (eventData.route || eventData.path || eventData.name);
            if (!route) {
                Core.Logger.warn("ViewMountService received route change event without valid route information.");
                return;
            }

            const viewName = typeof route === 'string' ? route : (route.name || route.path);
            
            if (ViewRegistry.has(viewName)) {
                await ViewRegistry.mount(viewName, this._rootSelector, eventData);
            } else {
                Core.Logger.warn(`ViewMountService: No registered view found for route '${viewName}'.`);
            }
        } catch (error) {
            Core.Logger.error(`ViewMountService route change handling failed: ${error.message}`);
        }
    }
}
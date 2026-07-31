/**
 * file: assets/js/view/view.mount.base.js
 */

import { Core } from '../core/index.js';
import { ViewRegistry } from './view.registry.js';
import { FeatureRegistry, FeatureLifecycleRegistry, FeatureLoaderService } from '../features/index.js';
import { ROUTER_EVENTS, RouteLoader } from '../router/index.js';
import { Container } from '../container/index.js';
import { ViewMountInterface } from './view.mount.interface.js';

export class ViewMountBase extends ViewMountInterface {
    constructor(rootSelector = '#app') {
        super();
        this._rootSelector = rootSelector;
        this._listening = false;
        this._previousFeatureName = null;
        this._transitionLock = Promise.resolve();
        Object.seal(this);
    }

    start() {
        if (this._listening) {
            return this;
        }

        const eventName = ROUTER_EVENTS.CHANGED || 'router.changed';
        Core.Event.on(eventName, (eventData) => {
            this._transitionLock = this._transitionLock.then(() => this._handleRouteChanged(eventData)).catch(err => {
                Core.Logger.error(`Transition lock caught error: ${err.message}`);
            });
        });

        this._listening = true;
        Core.Logger.info("ViewMountService started with Dynamic Lazy Loader Integration.");
        return this;
    }

    stop() {
        this._listening = false;
        return this;
    }

    isStarted() {
        return this._listening;
    }

    async _handleRouteChanged(eventData) {
        try {
            const route = eventData && (eventData.route || eventData.path || eventData.name);
            if (!route) return;

            const path = typeof route === 'string' ? route : (route.path || route.name);
            const viewName = typeof route === 'string' ? route : (route.name || route.path);

            // 1. Check RouteLoader metadata to see if feature is lazy and needs dynamic import
            const routeMeta = RouteLoader.resolve ? RouteLoader.resolve(path) : null;
            if (routeMeta && routeMeta.feature) {
                const featureId = routeMeta.feature;
                if (!FeatureLoaderService.isFeatureLoaded(featureId)) {
                    Core.Logger.info(`Lazy loading feature module on route navigation: ${featureId}`);
                    await FeatureLoaderService.loadFeature(featureId);
                }
            }

            if (ViewRegistry.has(viewName)) {
                const currentFeatureName = typeof FeatureRegistry.getFeatureNameByView === 'function'
                    ? FeatureRegistry.getFeatureNameByView(viewName)
                    : null;

                if (this._previousFeatureName && this._previousFeatureName !== currentFeatureName) {
                    try {
                        const prevDef = FeatureRegistry.resolve(this._previousFeatureName);
                        await FeatureLifecycleRegistry.unmount(this._previousFeatureName, prevDef);
                    } catch (e) {
                        Core.Logger.warn(`Error during previous feature unmount: ${e.message}`);
                    }
                }

                const richContext = {
                    route: eventData,
                    params: eventData.params || {},
                    query: eventData.query || {},
                    container: Container,
                    runtime: { logger: Core.Logger, event: Core.Event, utils: Core.Utils }
                };

                if (currentFeatureName) {
                    const currDef = FeatureRegistry.resolve(currentFeatureName);
                    await FeatureLifecycleRegistry.mount(currentFeatureName, currDef, richContext);
                    await ViewRegistry.mount(viewName, this._rootSelector, richContext);
                    await FeatureLifecycleRegistry.ready(currentFeatureName, currDef);
                    this._previousFeatureName = currentFeatureName;
                } else {
                    await ViewRegistry.mount(viewName, this._rootSelector, richContext);
                    this._previousFeatureName = null;
                }
            } else {
                Core.Logger.warn(`ViewMountService: No registered view found for route '${viewName}'.`);
            }
        } catch (error) {
            Core.Logger.error(`ViewMountService route change handling failed: ${error.message}`);
        }
    }
}
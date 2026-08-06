/**
 * TOPCARE AI PLATFORM V2 — CANONICAL VIEW MOUNT SERVICE
 * Path: assets/js/view/view.mount.service.js
 * Version: 130.0.0 (BUILD 130 — LIFECYCLE SINGLETON FIX)
 * Status: APPROVED & LOCKED
 * SRP: Resolves active views from ViewRegistry and mounts them safely into the DOM Host with unified lifecycle.
 */

import { ViewRegistry } from './view.registry.js';
import { ViewManager } from '../core/view-manager.js';
import { Core } from '../core/index.js';

export class ViewMountService {
    constructor() {
        this._activeViewInstance = null;
        this._activeViewId = null;
        Object.seal(this);
    }

    /**
     * Extracts canonical view identifier from route object or raw path string.
     * @param {Object|string} route 
     * @returns {string}
     */
    extractViewId(route) {
        if (!route) return '';

        if (typeof route === 'string') {
            return ViewRegistry.normalizeKey(route);
        }

        if (route.viewId) {
            return ViewRegistry.normalizeKey(route.viewId);
        }

        if (route.feature) {
            return ViewRegistry.normalizeKey(route.feature);
        }

        if (route.name) {
            return ViewRegistry.normalizeKey(route.name);
        }

        if (route.path) {
            return ViewRegistry.normalizeKey(route.path);
        }

        return '';
    }

    /**
     * Mounts the view corresponding to the provided route object.
     * @param {Object} route - Route metadata object
     * @returns {Promise<boolean>}
     */
    async mount(route) {
        const viewId = this.extractViewId(route);

        Core.Logger.info(`[ViewMountService] Attempting to mount view for route path '${route?.path || route}' resolved as viewId '${viewId}'`);

        if (!viewId) {
            Core.Logger.error('[ViewMountService] Failed to mount: View identifier could not be extracted.');
            this._renderErrorView(new Error('Invalid route parameter for ViewMountService.'));
            return false;
        }

        const TargetView = ViewRegistry.resolve(viewId);

        if (!TargetView) {
            Core.Logger.error(`[ViewMountService] No registered view found for viewId '${viewId}' (Route Path: '${route?.path || route}')`);
            this._renderErrorView(new Error(`Page view '${viewId}' is not registered.`));
            return false;
        }

        try {
            const hostContainer = ViewManager.getAppHost();
            let instanceToMount = TargetView;

            // Instantiation if TargetView is a Constructor Class
            if (typeof TargetView === 'function') {
                try {
                    instanceToMount = new TargetView(hostContainer);
                } catch (e) {
                    // Fallback for factory/functional components
                    instanceToMount = TargetView(hostContainer);
                }
            }

            // ViewManager.mountView handles old view cleanup internally.
            // Delegate directly to avoid duplicate destroy() execution.
            await ViewManager.mountView(instanceToMount);

            this._activeViewInstance = instanceToMount;
            this._activeViewId = viewId;

            Core.Logger.info(`[ViewMountService] Successfully mounted viewId '${viewId}'`);
            return true;
        } catch (mountError) {
            Core.Logger.error(`[ViewMountService] Exception while mounting viewId '${viewId}': ${mountError.message}`);
            this._renderErrorView(mountError);
            return false;
        }
    }

    /**
     * Helper to render error fallback view via ViewManager.
     * @private
     * @param {Error} error 
     */
    _renderErrorView(error) {
        if (ViewManager && typeof ViewManager.renderErrorView === 'function') {
            ViewManager.renderErrorView(error);
        }
    }
}

export const ViewMount = new ViewMountService();
export default ViewMount;
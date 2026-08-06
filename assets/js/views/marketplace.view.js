/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE PAGE VIEW ORCHESTRATOR
 * Path: assets/js/views/marketplace.view.js
 * Version: 133.1.0 (BUILD 133.1 — MARKETPLACE NAVIGATION INTEGRATION)
 * Status: APPROVED & LOCKED
 * SRP: Dedicated View Orchestrator for full page Marketplace rendering via MarketplaceComponent.
 */

import { MarketplaceComponent } from '../features/marketplace/index.js';

export class MarketplaceView {
    constructor() {
        this._marketplace = new MarketplaceComponent();
        this._isMounted = false;
    }

    /**
     * Mounts dedicated Marketplace feature view into the viewport.
     * @param {string} containerSelector 
     */
    async mount(containerSelector = "#app") {
        if (this._isMounted) return;

        await this._marketplace.mount(containerSelector);
        this._isMounted = true;
    }

    /**
     * Refreshes Marketplace state and UI.
     */
    refresh() {
        if (this._marketplace) {
            this._marketplace.refresh();
        }
    }

    /**
     * Unmounts Marketplace feature view and executes clean memory teardown.
     */
    destroy() {
        if (!this._isMounted) return;

        if (this._marketplace && typeof this._marketplace.destroy === 'function') {
            this._marketplace.destroy();
        }
        this._isMounted = false;
    }
}

export default MarketplaceView;
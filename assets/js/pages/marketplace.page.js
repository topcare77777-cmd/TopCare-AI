/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE PAGE ORCHESTRATOR
 * Path: assets/js/pages/marketplace.page.js
 * Version: 133.1.3 (BUILD 133.1.3 — RENDER PIPELINE REPAIR)
 * Status: APPROVED & LOCKED
 * SRP: Page orchestrator mounting Marketplace Feature with explicit HTMLElement creation and replaceChildren.
 */

import { MarketplaceComponent } from '../features/marketplace/index.js';

export class MarketplacePage {
    constructor(hostElement) {
        this.hostElement = hostElement || null;
        this._marketplace = null;
        this._isMounted = false;
    }

    /**
     * Accepts container element passed from ViewManager lifecycle.
     * @param {HTMLElement} container 
     */
    async mount(container) {
        if (this._isMounted) return;

        const targetHost = container || this.hostElement || document.getElementById('app');
        if (!targetHost) return;

        // Create page host element directly to eliminate selector string lookups
        const pageHost = document.createElement("div");
        pageHost.id = "tc-marketplace-page-host";
        targetHost.replaceChildren(pageHost);

        // Lazy Instantiation and Direct HTMLElement Passing
        this._marketplace = new MarketplaceComponent();
        await this._marketplace.mount(pageHost);

        this._isMounted = true;
    }

    refresh() {
        if (this._marketplace && typeof this._marketplace.refresh === 'function') {
            this._marketplace.refresh();
        }
    }

    destroy() {
        if (!this._isMounted) return;

        if (this._marketplace && typeof this._marketplace.destroy === 'function') {
            this._marketplace.destroy();
        }

        const targetHost = this.hostElement || document.getElementById('app');
        if (targetHost) {
            targetHost.replaceChildren();
        }

        this._marketplace = null;
        this.hostElement = null;
        this._isMounted = false;
    }
}

export default MarketplacePage;
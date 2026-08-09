/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE PAGE ORCHESTRATOR
 * Path: assets/js/pages/marketplace.page.js
 * Version: 134.2.0 (BUILD 134.2 — PAGE LIFECYCLE REPAIR)
 * Status: APPROVED & LOCK CANDIDATE
 * SRP: Page orchestrator mounting Marketplace Feature.
 */

import { MarketplaceComponent } from '../features/marketplace/index.js';

export class MarketplacePage {
    constructor(hostElement) {
        this.hostElement = hostElement || null;
        this._marketplace = null;
        this._pageHost = null;
        this._isMounted = false;
    }

    async mount(container) {
        if (this._isMounted) return;

        const targetHost =
            container ||
            this.hostElement ||
            document.getElementById('app');

        if (!targetHost) {
            throw new Error(
                '[MarketplacePage] Target host element was not found.'
            );
        }

        const pageHost = document.createElement('div');
        pageHost.id = 'tc-marketplace-page-host';

        targetHost.replaceChildren(pageHost);

        this._pageHost = pageHost;

        this._marketplace = new MarketplaceComponent();

        await this._marketplace.mount(pageHost);

        this._isMounted = true;
    }

    refresh() {
        if (
            this._marketplace &&
            typeof this._marketplace.refresh === 'function'
        ) {
            this._marketplace.refresh();
        }
    }

    destroy() {
        if (!this._isMounted) return;

        if (
            this._marketplace &&
            typeof this._marketplace.destroy === 'function'
        ) {
            this._marketplace.destroy();
        }

        if (this._pageHost) {
            this._pageHost.replaceChildren();
        }

        this._marketplace = null;
        this._pageHost = null;
        this.hostElement = null;
        this._isMounted = false;
    }
}

export default MarketplacePage;
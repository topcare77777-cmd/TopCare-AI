/**
 * TOPCARE AI PLATFORM V2 — MARKETPLACE PAGE ORCHESTRATOR
 * Path: assets/js/pages/marketplace.page.js
 * Version: 134.2.1 (FIXED ROUTE MOUNTING & LIFECYCLE REPAIR)
 * Status: APPROVED & STABILIZED
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
        // Tentukan target host kontainer DOM yang valid
        const targetHost =
            container ||
            this.hostElement ||
            document.getElementById('app') ||
            document.body;

        if (!targetHost) {
            console.error('[MarketplacePage] Target host element not found.');
            return;
        }

        // Jika modul pernah dimount sebelumnya pada kontainer lain, bersihkan dahulu
        if (this._isMounted && this._marketplace) {
            this.destroy();
        }

        const pageHost = document.createElement('div');
        pageHost.id = 'tc-marketplace-page-host';

        // Bersihkan isi kontainer utama dan masukkan host baru
        targetHost.innerHTML = '';
        targetHost.appendChild(pageHost);

        this._pageHost = pageHost;
        this._marketplace = new MarketplaceComponent();

        if (this._marketplace && typeof this._marketplace.mount === 'function') {
            await this._marketplace.mount(pageHost);
        }

        this._isMounted = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
            try {
                this._marketplace.destroy();
            } catch (e) {
                console.warn('[MarketplacePage] Destroy warning:', e);
            }
        }

        if (this._pageHost && this._pageHost.parentNode) {
            this._pageHost.parentNode.removeChild(this._pageHost);
        }

        this._marketplace = null;
        this._pageHost = null;
        this.hostElement = null;
        this._isMounted = false;
    }
}

export default MarketplacePage;
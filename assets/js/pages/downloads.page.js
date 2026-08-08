/**
 * TOPCARE AI PLATFORM V2 — DOWNLOADS PAGE ORCHESTRATOR
 * Path: assets/js/pages/downloads.page.js
 * Version: 135.0.0 (BUILD 135.0 — DIGITAL PRODUCT DELIVERY CENTER)
 * Status: APPROVED & LOCKED
 * SRP: Page orchestrator lazy loading and mounting DownloadCenterComponent only.
 */

import { DownloadCenterComponent } from '../features/download-center/download-center.component.js';

export class DownloadsPage {
    constructor(hostElement) {
        this.hostElement = hostElement || null;
        this._downloadCenter = null;
        this._isMounted = false;
    }

    /**
     * Accepts container element passed directly from ViewManager lifecycle.
     * @param {HTMLElement} container
     */
    async mount(container) {
        if (this._isMounted) return;

        const targetHost = container || this.hostElement || document.getElementById('app');
        if (!targetHost) return;

        const pageHost = document.createElement("div");
        pageHost.id = "tc-downloads-page-host";
        targetHost.appendChild(pageHost);

        this._downloadCenter = new DownloadCenterComponent();
        await this._downloadCenter.mount(pageHost);

        this._isMounted = true;
    }

    destroy() {
        if (!this._isMounted) return;

        if (this._downloadCenter && typeof this._downloadCenter.destroy === 'function') {
            this._downloadCenter.destroy();
        }

        this._downloadCenter = null;
        this.hostElement = null;
        this._isMounted = false;
    }
}

export default DownloadsPage;

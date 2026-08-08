/**
 * TOPCARE AI PLATFORM V2 — DOWNLOAD CENTER PAGE ADAPTER
 * Path: assets/js/pages/download-center.page.js
 * Version: 137.3.0 (BUILD 137.3 — PREMIUM DOWNLOAD CENTER INTEGRATION)
 * Status: APPROVED & LOCKED
 * SRP: Native ViewManager page lifecycle adapter for mounting and destroying DownloadCenterComponent.
 */

import { DownloadCenterComponent } from '../features/download-center/download-center.component.js';

export default class DownloadCenterPage {
    constructor(hostElement) {
        this.container = hostElement || null;
        this.component = new DownloadCenterComponent();
        Object.seal(this);
    }

    /**
     * Standard ViewManager lifecycle hook executed before page entry.
     */
    async beforeEnter() {
        // Safe lifecycle guard hook
    }

    /**
     * Mounts DownloadCenterComponent into the target viewport container.
     * @param {HTMLElement} hostElement
     */
    async mount(hostElement) {
        this.container = hostElement || this.container || document.getElementById('app');
        if (!this.container) {
            throw new Error("[DownloadCenterPage] Target host element is required for mounting.");
        }

        await this.component.mount(this.container);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Unmounts component and purges viewport host container.
     */
    unmount() {
        if (this.component && typeof this.component.destroy === 'function') {
            this.component.destroy();
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.container = null;
    }

    /**
     * Alias method for ViewManager unmount protocol.
     */
    destroy() {
        this.unmount();
    }
}

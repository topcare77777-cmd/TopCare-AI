/**
 * TOPCARE AI PLATFORM V2 — PREMIUM PAGE LIFECYCLE
 * Path: assets/js/pages/premium.page.js
 * Status: APPROVED & LOCKED (BUILD 128.3)
 * SRP: Mounts PremiumController into the main viewport host.
 */

import { PremiumController } from '../premium/premium.controller.js';

export class PremiumPage {
    constructor() {
        this.container = null;
        this.controller = null;
    }

    async beforeEnter() {
        // Lifecycle hook sebelum halaman dirender
    }

    mount(hostElement) {
        this.container = hostElement || document.getElementById('app');
        if (!this.container) return;

        this.controller = new PremiumController(this.container);
        this.controller.init();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    unmount() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.container = null;
        this.controller = null;
    }
}

export default PremiumPage;
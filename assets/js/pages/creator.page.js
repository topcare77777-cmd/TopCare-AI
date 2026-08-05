/**
 * TOPCARE AI PLATFORM V2 — CREATOR PAGE LIFECYCLE
 * Path: assets/js/pages/creator.page.js
 * Status: APPROVED & LOCKED (BUILD 128.6)
 * SRP: Page lifecycle manager for Creator Domain & Sub-states.
 */

import { CreatorController } from '../creator/creator.controller.js';

export class CreatorPage {
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

        this.controller = new CreatorController(this.container);
        
        // Deteksi sub-state dari URL Hash jika diakses langsung via Header
        const hash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
        if (hash === 'ebook') {
            this.controller.viewState = 'EBOOK';
        } else if (hash === 'artikel') {
            this.controller.viewState = 'ARTIKEL';
        } else if (hash === 'prompt') {
            this.controller.viewState = 'PROMPT';
        } else {
            this.controller.viewState = 'HUB';
        }

        this.controller.init();
    }

    unmount() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.container = null;
        this.controller = null;
    }
}

export default CreatorPage;
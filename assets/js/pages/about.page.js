/**
 * TOPCARE AI PLATFORM V2 — ABOUT PAGE SPA VIEW CONTROLLER
 * Path: assets/js/pages/about.page.js
 * Status: APPROVED & LOCKED (BUILD 127.0)
 * SRP: Dynamic SPA entry point mounting the About Controller into the #app viewport.
 */

import { AboutController } from '../about/about.controller.js';

export class AboutPage {
    constructor(container) {
        this.container = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        this.controllerInstance = null;
    }

    async mount() {
        if (!this.container) {
            this.container = document.getElementById('app');
        }

        if (!this.container) {
            console.error('[AboutPage] Host container #app not found.');
            return;
        }

        this.controllerInstance = new AboutController(this.container);
        this.controllerInstance.init();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.controllerInstance = null;
    }
}

export default AboutPage;
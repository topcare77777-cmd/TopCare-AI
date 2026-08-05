/**
 * TOPCARE AI PLATFORM V2 — AI PAGE SPA ENTRY POINT
 * Path: assets/js/pages/ai.page.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Bridge between SPA Router and AiController Lifecycle.
 */

import AiController from '../learning/ai/ai.controller.js';

export class AiPage {
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
            console.error('[AiPage] Host container #app not found.');
            return;
        }

        this.controllerInstance = new AiController(this.container);
        this.controllerInstance.init();
        this.controllerInstance.mount();

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    destroy() {
        if (this.controllerInstance) {
            this.controllerInstance.destroy();
        }
        this.controllerInstance = null;
    }
}

export default AiPage;
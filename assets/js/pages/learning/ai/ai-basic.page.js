/**
 * TOPCARE AI PLATFORM V2 — AI BASIC PAGE SPA VIEW CONTROLLER
 * Path: assets/js/pages/learning/ai/ai-basic.page.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: SPA View Entry Point mounting Basic Level AI Controller into host viewport.
 */

import { BasicController } from '../../../learning/ai/basic/basic.controller.js';

export class AiBasicPage {
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
            console.error('[AiBasicPage] Host container #app not found.');
            return;
        }

        this.controllerInstance = new BasicController(this.container);
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

export default AiBasicPage;
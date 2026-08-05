/**
 * TOPCARE AI PLATFORM V2 — COMMUNITY PAGE SPA VIEW CONTROLLER
 * Path: assets/js/pages/community.page.js
 * Status: APPROVED & LOCKED (GOLDEN BASELINE)
 * SRP: Dynamic SPA entry point mounting the Community Controller into the #app viewport.
 */

import { CommunityController } from '../community/community.controller.js';

export class CommunityPage {
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
            console.error('[CommunityPage] Host container #app not found.');
            return;
        }

        this.controllerInstance = new CommunityController(this.container);
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

export default CommunityPage;
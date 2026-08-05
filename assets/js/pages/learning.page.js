/**
 * TOPCARE AI PLATFORM V2 — LEARNING PAGE SPA VIEW CONTROLLER
 * Path: assets/js/pages/learning.page.js
 * Status: APPROVED & LOCKED (BUILD 127.2 — STABLE ENTRY)
 * SRP: Dynamic SPA entry point mounting the Learning Controller into the #app viewport.
 */

import { LearningController } from '../learning/learning.controller.js';

export class LearningPage {
    constructor(container) {
        this.container = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
        this.controllerInstance = null;
    }

    /**
     * SPA Page Lifecycle Mount
     */
    async mount() {
        if (!this.container) {
            this.container = document.getElementById('app');
        }

        if (!this.container) {
            console.error('[LearningPage] Host container #app not found.');
            return;
        }

        // Initialize Learning Domain Controller
        this.controllerInstance = new LearningController(this.container);
        this.controllerInstance.init();
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * SPA Page Lifecycle Destroy Cleanup
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.controllerInstance = null;
    }
}

export default LearningPage;
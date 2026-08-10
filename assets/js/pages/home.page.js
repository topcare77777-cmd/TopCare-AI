/**
 * TOPCARE AI PLATFORM V2 — HOME PAGE CONTROLLER
 * Path: assets/js/pages/home.page.js
 * Status: FIXED (BUILD 139.4 — STABLE IMPORT PATHS)
 */

import HomeRenderer from './home.renderer.js';

export class HomePage {
    constructor() {
        this.container = null;
    }

    async mount() {
        const appMount = document.getElementById('app');
        if (!appMount) return;

        // Render HTML template
        appMount.innerHTML = HomeRenderer.renderPage();
        this.container = appMount.querySelector('.tc-home-wrapper');
    }

    unmount() {
        if (this.container) {
            this.container = null;
        }
    }
}

export default new HomePage();
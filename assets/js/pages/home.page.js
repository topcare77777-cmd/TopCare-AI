/**
 * TOPCARE AI PLATFORM V2 — HOME PAGE CONTROLLER
 * Path: assets/js/pages/home.page.js
 * Status: APPROVED & FIXED (RESOLVED ReferenceError appMount)
 */

import HomeRenderer from './home.renderer.js';
import { Router } from '../router/router.service.js';

export class HomePage {
    constructor() {
        this.container = null;
    }

    async mount() {
        const appMount = document.getElementById('app');
        if (!appMount) return;

        // Render HTML template dari renderer
        appMount.innerHTML = HomeRenderer.renderPage();
        this.container = appMount.querySelector('.tc-home-wrapper');

        // Pasang Event Listener Khusus untuk Kartu Hero Interaktif
        this._bindHeroNavigation(appMount);
    }

    _bindHeroNavigation(appContainer) {
        if (!appContainer) return;

        appContainer.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#/"]');
            if (link) {
                const targetRoute = link.getAttribute('href').replace('#', '');
                
                // Panggil Router platform jika tersedia
                if (Router && typeof Router.dispatch === 'function') {
                    e.preventDefault();
                    Router.dispatch(targetRoute);
                    window.location.hash = '#' + targetRoute;
                }
            }
        });
    }

    unmount() {
        if (this.container) {
            this.container = null;
        }
    }
}

export default new HomePage();
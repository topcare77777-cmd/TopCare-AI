/**
 * TOPCARE AI PLATFORM V2
 * Path: assets/js/pages/home.page.js
 * Status: APPROVED & FIXED (Removed Invalid Constructor Call)
 */

import { appRouter } from '../core/router/app-router.js';
import * as HomeRendererModule from './home.renderer.js';

export class HomePage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
        
        // Resolve HomeRenderer safely as an Object, DO NOT use 'new'
        this.renderer = HomeRendererModule.HomeRenderer || HomeRendererModule.default || HomeRendererModule;
    }
    
    async mount(target) {
        const container = target || this.container;
        
        // Call the render method directly from the resolved object
        if (this.renderer && typeof this.renderer.render === 'function') {
            container.innerHTML = this.renderer.render();
        } else if (this.renderer && typeof this.renderer.renderPage === 'function') {
            container.innerHTML = this.renderer.renderPage();
        } else {
            console.error('[HomePage] HomeRenderer object does not expose a render method:', this.renderer);
        }

        this.bindEvents();
    }
    
    bindEvents() {
        const loginBtn = document.getElementById('btn-login');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                if (appRouter && typeof appRouter.navigate === 'function') {
                    appRouter.navigate('/login');
                }
            });
        }
        
        const registerBtn = document.getElementById('btn-register');
        if (registerBtn) {
            registerBtn.addEventListener('click', () => {
                if (appRouter && typeof appRouter.navigate === 'function') {
                    appRouter.navigate('/register');
                }
            });
        }
        
        const ctaBtn = document.getElementById('btn-hero-cta');
        if (ctaBtn) {
            ctaBtn.addEventListener('click', () => {
                if (appRouter && typeof appRouter.navigate === 'function') {
                    appRouter.navigate('/register');
                }
            });
        }
    }
    
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export default HomePage;
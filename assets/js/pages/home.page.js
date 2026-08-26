/**
 * TOPCARE AI PLATFORM V3 — HOME PAGE
 * Path: assets/js/pages/home.page.js
 * Status: PHASE 2.7.0 AUTH STATE & REAL METRIC ADAPTER
 */

import { PlatformService } from '../core/services/platform.service.js';
import { DOMListenerUtil } from '../core/utils/dom-listener.util.js';
import * as HomeRendererModule from './home.renderer.js';

export class HomePage {
    constructor(container) {
        this.container = container || document.getElementById('app') || document.body;
        this.domListeners = new DOMListenerUtil();
        this.renderer = HomeRendererModule.HomeRenderer || HomeRendererModule.default || HomeRendererModule;
    }

    async mount(target) {
        this.domListeners.cleanup();
        const container = target || this.container;

        let userCount = 0;
        let isAuthenticated = false;

        try {
            const session = await PlatformService.getCurrentUserSession();
            isAuthenticated = !!session;
        } catch {
            isAuthenticated = false;
        }

        try {
            const { total } = await PlatformService.getRegisteredUsersList({ page: 1, limit: 1 });
            userCount = total || 0;
        } catch {
            userCount = 0;
        }

        if (this.renderer && typeof this.renderer.renderPage === 'function') {
            container.innerHTML = await this.renderer.renderPage(userCount, isAuthenticated);
        } else if (this.renderer && typeof this.renderer.render === 'function') {
            container.innerHTML = await this.renderer.render(userCount, isAuthenticated);
        }

        this.bindEvents();
    }

    bindEvents() {
        this.domListeners.add(window, 'tcr:platform-settings-updated', async () => {
            await this.mount();
        });
    }

    destroy() {
        this.domListeners.cleanup();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export default HomePage;
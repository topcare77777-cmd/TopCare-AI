/**
 * TOPCARE AI PLATFORM V3 — HOME PAGE
 * Path: assets/js/pages/home.page.js
 * Status: PHASE 2.3 REAL DATA & LIFECYCLE CONNECTED
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
        try {
            const { total } = await PlatformService.getRegisteredUsersList({ page: 1, limit: 1 });
            userCount = total || 0;
        } catch {
            userCount = 0;
        }

        if (this.renderer && typeof this.renderer.renderPage === 'function') {
            container.innerHTML = await this.renderer.renderPage(userCount);
        } else if (this.renderer && typeof this.renderer.render === 'function') {
            container.innerHTML = await this.renderer.render(userCount);
        }

        this.bindEvents();
    }

    bindEvents() {
        // Reaktif listener jika ada pembaruan platform settings via event bus
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
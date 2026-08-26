/**
 * TOPCARE AI PLATFORM V3 — HOME FOOTER COMPONENT
 * Path: assets/js/components/home/footer.component.js
 * Status: V3-FIX-06 LIFECYCLE DOM LISTENER INTEGRATED
 */

import { FooterRenderer } from '../../renderers/footer.renderer.js';
import { DOMListenerUtil } from '../../core/utils/dom-listener.util.js';

export const FooterComponent = {
    container: null,
    isMounted: false,
    domListeners: new DOMListenerUtil(),

    /**
     * Mount footer ke target container dan pasang reaktif listener
     * @param {HTMLElement} container 
     */
    async mount(container) {
        if (!container) return;
        this.container = container;

        if (this.isMounted) {
            return await this.update();
        }

        try {
            const footerHtml = await FooterRenderer.render();
            this.container.innerHTML = footerHtml;
            this.isMounted = true;

            // Daftarkan listener global via DOMListenerUtil (Anti-Memory Leak)
            this.domListeners.add(window, 'tcr:platform-settings-updated', async () => {
                await this.update();
            });
        } catch (err) {
            console.error('[FooterComponent] Error mounting dynamic footer:', err);
        }
    },

    /**
     * Update/refresh data footer secara reaktif
     */
    async update() {
        if (!this.isMounted || !this.container) return;

        try {
            const footerHtml = await FooterRenderer.render();
            this.container.innerHTML = footerHtml;
        } catch (err) {
            console.error('[FooterComponent] Error updating footer:', err);
        }
    },

    /**
     * Render string HTML murni (Static helper)
     */
    async render() {
        return await FooterRenderer.render();
    },

    /**
     * Membersihkan elemen DOM, melepas listener dari window, dan reset state
     */
    destroy() {
        // Lepas seluruh listener (termasuk listener window 'tcr:platform-settings-updated')
        this.domListeners.cleanup();

        if (this.container) {
            if (typeof this.container.replaceChildren === 'function') {
                this.container.replaceChildren();
            } else {
                this.container.innerHTML = '';
            }
        }

        this.isMounted = false;
        this.container = null;
    },

    /**
     * Reset internal memory state
     */
    cleanup() {
        this.destroy();
    }
};

export default FooterComponent;
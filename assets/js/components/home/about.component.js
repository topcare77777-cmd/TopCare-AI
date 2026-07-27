/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 4.5 - Component
 * Status       : ACTIVE
 * Version      : 2.3.0
 * Owner        : Home Module
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.6
 *
 * Architecture : Development Constitution v1.1
 * Pattern      : Conductor Component
 * Migration    : SPRINT 46A
 * Revision     : 46A.6
 * Runtime      : V2 Runtime
 * Compatible   : TopCare AI Runtime 2.x
 *
 * Dependencies :
 *   - AboutWidget
 *
 * Forbidden :
 *   - Router
 *   - TopCareApp
 *   - ViewManager
 *
 * Component API :
 *   mount(container)
 *   update()
 *   destroy()
 *   cleanup()
 * -----------------------------------------------------------------
 */

import { AboutWidget } from '../../widgets/home/about.widget.js';

const AboutComponent = {
    container: null,
    isMounted: false,

    async mount(container) {
        if (!container) return;
        
        if (this.container !== container) {
            this.container = container;
        }

        if (this.isMounted) {
            return this.update();
        }

        try {
            await AboutWidget.render(this.container);
            this.isMounted = true;
        } catch (err) {
            console.error("[AboutComponent] mount:", err);
        }
    },

    async update() {
        if (!this.isMounted || !this.container) return;
        
        try {
            if (typeof AboutWidget.refresh === 'function') {
                await AboutWidget.refresh();
            } else {
                await AboutWidget.render(this.container);
            }
        } catch (err) {
            console.error("[AboutComponent] update:", err);
        }
    },

    destroy() {
        if (!this.container) return;

        if (typeof AboutWidget.destroy === 'function') {
            try {
                AboutWidget.destroy();
            } catch (err) {
                console.error("[AboutComponent] destroy:", err);
            }
        }

        if (typeof this.container.replaceChildren === 'function') {
            this.container.replaceChildren();
        } else {
            this.container.innerHTML = '';
        }

        this.isMounted = false;
        this.container = null;
    },

    cleanup() {
        this.isMounted = false;
        this.container = null;
    }
};

export default Object.freeze(AboutComponent);
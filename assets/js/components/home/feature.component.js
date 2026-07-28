/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 4.5 - Component
 * Status       : ACTIVE
 * Version      : 2.3.0
 * Owner        : Home Module
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.7
 *
 * Architecture : Development Constitution v1.1
 * Pattern      : Conductor Component
 * Migration    : SPRINT 46A.7
 * Revision     : 46A.7
 * Runtime      : V2 Runtime
 * Compatible   : TopCare AI Runtime 2.x
 *
 * Dependencies :
 *   - FeatureWidget
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

import { FeatureWidget } from '../../widgets/home/feature.widget.js';

const FeatureComponent = {
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
            await FeatureWidget.render(this.container);
            this.isMounted = true;
        } catch (err) {
            console.error("[FeatureComponent] mount:", err);
        }
    },

    async update() {
        if (!this.isMounted || !this.container) return;

        try {
            if (typeof FeatureWidget.refresh === 'function') {
                await FeatureWidget.refresh();
            } else {
                await FeatureWidget.render(this.container);
            }
        } catch (err) {
            console.error("[FeatureComponent] update:", err);
        }
    },

    destroy() {
        if (!this.container) return;

        if (typeof FeatureWidget.destroy === 'function') {
            try {
                FeatureWidget.destroy();
            } catch (err) {
                console.error("[FeatureComponent] destroy:", err);
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

export default FeatureComponent;
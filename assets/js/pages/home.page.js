/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 4 - Page
 * Status       : ACTIVE
 * Version      : 2.5.0 (BUILD 128.4 - ECOSYSTEM EVOLUTION UPDATE)
 * Architecture : Development Constitution v1.1
 * Owner        : Home Page Conductor
 *
 * Pattern      : Page Conductor (Layer 4)
 * Compatible   : TopCare AI Runtime 2.x
 *
 * Page API :
 *   init()
 *   mount(container)
 *   render(container)
 *   update()
 *   destroy()
 *   cleanup()
 * -----------------------------------------------------------------
 */

import { HomeRenderer } from '../home/home.renderer.js';

const HomePage = {
    activeContainer: null,
    isMounted: false,

    init() {
        // Initialization hook for backward compatibility
    },

    async beforeEnter() {
        // Lifecycle hook for ViewManager & Router compatibility
    },

    async afterEnter() {
        // Lifecycle hook for ViewManager & Router compatibility
    },

    async mount(container) {
        return await this.render(container);
    },

    async render(container) {
        const targetContainer = container || this.activeContainer || document.getElementById('app') || document.getElementById('app-host') || document.body;
        if (!targetContainer) return;

        if (this.isMounted && this.activeContainer === targetContainer) {
            await this.update();
            return;
        }

        if (this.activeContainer !== targetContainer) {
            this.activeContainer = targetContainer;
        }

        try {
            // Render Landing Page Ekosistem TopCare AI V2
            this.activeContainer.innerHTML = HomeRenderer.renderPage();
            window.scrollTo({ top: 0, behavior: 'smooth' });

            this.isMounted = true;
        } catch (err) {
            console.error("[HomePage] render error:", err);
        }
    },

    async update() {
        if (!this.isMounted) return;

        try {
            if (this.activeContainer) {
                this.activeContainer.innerHTML = HomeRenderer.renderPage();
            }
        } catch (err) {
            console.error("[HomePage] update error:", err);
        }
    },

    destroy() {
        if (this.activeContainer) {
            this.activeContainer.innerHTML = '';
        }

        this.isMounted = false;
        this.activeContainer = null;
    },

    cleanup() {
        this.isMounted = false;
        this.activeContainer = null;
    }
};

export const homePage = HomePage;
export default HomePage;
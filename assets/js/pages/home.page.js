/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 4 - Page
 * Status       : ACTIVE
 * Version      : 2.4.2 (BUILD 124.2 - ROUTER COMPATIBILITY FIX)
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

import HeroComponent from '../components/home/hero.component.js';
import CoachComponent from '../components/home/coach.component.js';
import FeatureComponent from '../components/home/feature.component.js';
import AboutComponent from '../components/home/about.component.js';
import CTAComponent from '../components/home/cta.component.js';
import FooterComponent from '../components/home/footer.component.js';

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
        const targetContainer = container || this.activeContainer || document.getElementById('app-host') || document.body;
        if (!targetContainer) return;

        if (this.isMounted && this.activeContainer === targetContainer) {
            await this.update();
            return;
        }

        if (this.activeContainer !== targetContainer) {
            this.activeContainer = targetContainer;
        }

        try {
            // Ensure standard section wrappers exist within the active container view
            this.activeContainer.innerHTML = `
                <div id="hero-container" class="home-section-wrapper"></div>
                <div id="coach-container" class="home-section-wrapper"></div>
                <div id="feature-container" class="home-section-wrapper"></div>
                <div id="about-container" class="home-section-wrapper"></div>
                <div id="cta-container" class="home-section-wrapper"></div>
                <div id="footer-container" class="home-section-wrapper"></div>
            `;

            const heroEl = this.activeContainer.querySelector('#hero-container');
            const coachEl = this.activeContainer.querySelector('#coach-container');
            const featureEl = this.activeContainer.querySelector('#feature-container');
            const aboutEl = this.activeContainer.querySelector('#about-container');
            const ctaEl = this.activeContainer.querySelector('#cta-container');
            const footerEl = this.activeContainer.querySelector('#footer-container');

            await Promise.all([
                heroEl && HeroComponent && typeof HeroComponent.mount === 'function' ? HeroComponent.mount(heroEl) : Promise.resolve(),
                coachEl && CoachComponent && typeof CoachComponent.mount === 'function' ? CoachComponent.mount(coachEl) : Promise.resolve(),
                featureEl && FeatureComponent && typeof FeatureComponent.mount === 'function' ? FeatureComponent.mount(featureEl) : Promise.resolve(),
                aboutEl && AboutComponent && typeof AboutComponent.mount === 'function' ? AboutComponent.mount(aboutEl) : Promise.resolve(),
                ctaEl && CTAComponent && typeof CTAComponent.mount === 'function' ? CTAComponent.mount(ctaEl) : Promise.resolve(),
                footerEl && FooterComponent && typeof FooterComponent.mount === 'function' ? FooterComponent.mount(footerEl) : Promise.resolve()
            ]);

            this.isMounted = true;
        } catch (err) {
            console.error("[HomePage] render error:", err);
        }
    },

    async update() {
        if (!this.isMounted) return;

        try {
            await Promise.all([
                HeroComponent && typeof HeroComponent.update === 'function' ? HeroComponent.update() : Promise.resolve(),
                CoachComponent && typeof CoachComponent.update === 'function' ? CoachComponent.update() : Promise.resolve(),
                FeatureComponent && typeof FeatureComponent.update === 'function' ? FeatureComponent.update() : Promise.resolve(),
                AboutComponent && typeof AboutComponent.update === 'function' ? AboutComponent.update() : Promise.resolve(),
                CTAComponent && typeof CTAComponent.update === 'function' ? CTAComponent.update() : Promise.resolve(),
                FooterComponent && typeof FooterComponent.update === 'function' ? FooterComponent.update() : Promise.resolve()
            ]);
        } catch (err) {
            console.error("[HomePage] update error:", err);
        }
    },

    destroy() {
        try {
            if (HeroComponent && typeof HeroComponent.destroy === 'function') HeroComponent.destroy();
            if (CoachComponent && typeof CoachComponent.destroy === 'function') CoachComponent.destroy();
            if (FeatureComponent && typeof FeatureComponent.destroy === 'function') FeatureComponent.destroy();
            if (AboutComponent && typeof AboutComponent.destroy === 'function') AboutComponent.destroy();
            if (CTAComponent && typeof CTAComponent.destroy === 'function') CTAComponent.destroy();
            if (FooterComponent && typeof FooterComponent.destroy === 'function') FooterComponent.destroy();
        } catch (err) {
            console.error("[HomePage] destroy error:", err);
        }

        if (this.activeContainer) {
            this.activeContainer.innerHTML = '';
        }

        this.isMounted = false;
        this.activeContainer = null;
    },

    cleanup() {
        try {
            if (HeroComponent && typeof HeroComponent.cleanup === 'function') HeroComponent.cleanup();
            if (CoachComponent && typeof CoachComponent.cleanup === 'function') CoachComponent.cleanup();
            if (FeatureComponent && typeof FeatureComponent.cleanup === 'function') FeatureComponent.cleanup();
            if (AboutComponent && typeof AboutComponent.cleanup === 'function') AboutComponent.cleanup();
            if (CTAComponent && typeof CTAComponent.cleanup === 'function') CTAComponent.cleanup();
            if (FooterComponent && typeof FooterComponent.cleanup === 'function') FooterComponent.cleanup();
        } catch (err) {
            console.error("[HomePage] cleanup error:", err);
        }

        this.isMounted = false;
        this.activeContainer = null;
    }
};

export const homePage = HomePage;
export default HomePage;
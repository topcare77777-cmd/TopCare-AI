/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 4 - Page
 * Status       : ACTIVE
 * Version      : 2.4.1
 * Architecture : Development Constitution v1.1
 * Owner        : Home Page Conductor
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.10
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

    async mount(container) {
        return await this.render(container);
    },

    async render(container) {
        if (!container) return;

        if (this.isMounted && this.activeContainer === container) {
            await this.update();
            return;
        }

        if (this.activeContainer !== container) {
            this.activeContainer = container;
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
                heroEl ? HeroComponent.mount(heroEl) : Promise.resolve(),
                coachEl ? CoachComponent.mount(coachEl) : Promise.resolve(),
                featureEl ? FeatureComponent.mount(featureEl) : Promise.resolve(),
                aboutEl ? AboutComponent.mount(aboutEl) : Promise.resolve(),
                ctaEl ? CTAComponent.mount(ctaEl) : Promise.resolve(),
                footerEl ? FooterComponent.mount(footerEl) : Promise.resolve()
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
                HeroComponent.update(),
                CoachComponent.update(),
                FeatureComponent.update(),
                AboutComponent.update(),
                CTAComponent.update(),
                FooterComponent.update()
            ]);
        } catch (err) {
            console.error("[HomePage] update error:", err);
        }
    },

    destroy() {
        try {
            if (typeof HeroComponent.destroy === 'function') HeroComponent.destroy();
            if (typeof CoachComponent.destroy === 'function') CoachComponent.destroy();
            if (typeof FeatureComponent.destroy === 'function') FeatureComponent.destroy();
            if (typeof AboutComponent.destroy === 'function') AboutComponent.destroy();
            if (typeof CTAComponent.destroy === 'function') CTAComponent.destroy();
            if (typeof FooterComponent.destroy === 'function') FooterComponent.destroy();
        } catch (err) {
            console.error("[HomePage] destroy error:", err);
        }

        this.isMounted = false;
        this.activeContainer = null;
    },

    cleanup() {
        try {
            if (typeof HeroComponent.cleanup === 'function') HeroComponent.cleanup();
            if (typeof CoachComponent.cleanup === 'function') CoachComponent.cleanup();
            if (typeof FeatureComponent.cleanup === 'function') FeatureComponent.cleanup();
            if (typeof AboutComponent.cleanup === 'function') AboutComponent.cleanup();
            if (typeof CTAComponent.cleanup === 'function') CTAComponent.cleanup();
            if (typeof FooterComponent.cleanup === 'function') FooterComponent.cleanup();
        } catch (err) {
            console.error("[HomePage] cleanup error:", err);
        }

        this.isMounted = false;
        this.activeContainer = null;
    }
};

export default HomePage;
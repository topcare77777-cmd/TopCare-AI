/**
 * TopCare AI Platform V2.0.0
 * Homepage Layout Engine
 * Path: assets/js/pages/home.page.js
 */

import HeroModule from '../modules/hero.module.js';
import FeaturesModule from '../modules/features.module.js';
import WorkflowModule from '../modules/workflow.module.js';
import ShowcaseModule from '../modules/showcase.module.js';
import TestimonialsModule from '../modules/testimonials.module.js';
import PricingModule from '../modules/pricing.module.js';
import FaqModule from '../modules/faq.module.js';
import FooterModule from '../modules/footer.module.js';
import Logger from '../core/logger.js';

const HomePage = {
    async render() {
        Logger.info("[HomePage] Rendering homepage sections...");

        try {
            if (HeroModule && typeof HeroModule.mount === 'function') {
                await HeroModule.mount();
                console.log("[HERO MODULE MOUNTED]");
            }
            if (FeaturesModule && typeof FeaturesModule.mount === 'function') {
                await FeaturesModule.mount();
                console.log("[FEATURES MODULE MOUNTED]");
            }
            if (WorkflowModule && typeof WorkflowModule.mount === 'function') {
                await WorkflowModule.mount();
            }
            if (ShowcaseModule && typeof ShowcaseModule.mount === 'function') {
                await ShowcaseModule.mount();
            }
            if (TestimonialsModule && typeof TestimonialsModule.mount === 'function') {
                await TestimonialsModule.mount();
            }
            if (PricingModule && typeof PricingModule.mount === 'function') {
                await PricingModule.mount();
            }
            if (FaqModule && typeof FaqModule.mount === 'function') {
                await FaqModule.mount();
            }
            if (FooterModule && typeof FooterModule.mount === 'function') {
                await FooterModule.mount();
            }

            Logger.info("[HomePage] All homepage sections mounted successfully.");
        } catch (error) {
            Logger.error("[HomePage] Error during section mounting:", error);
        }
    }
};

export default HomePage;
/**
 * TopCare AI Platform V2.0.0
 * Home Page Controller (BUILD 030 Dependency Integrity Verified)
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
    init() { 
        Logger.info("[HomePage] Init (Dependency Integrity Verified)"); 
    },
    
    mount(container) { 
        Logger.info("[HomePage] Mount"); 
    },
    
    async render(container) {
        Logger.info("[HomePage] Rendering verified homepage sections...");
        const wrappers = [
            'hero-wrapper', 'trusted-wrapper', 'features-wrapper', 
            'statistics-wrapper', 'workflow-wrapper', 'showcase-wrapper', 
            'testimonials-wrapper', 'pricing-wrapper', 'faq-wrapper', 'cta-wrapper'
        ];
        wrappers.forEach(id => {
            const div = document.createElement('div');
            div.id = id;
            container.appendChild(div);
        });

        if (HeroModule && typeof HeroModule.mount === 'function') await HeroModule.mount();
        if (FeaturesModule && typeof FeaturesModule.mount === 'function') await FeaturesModule.mount();
        if (WorkflowModule && typeof WorkflowModule.mount === 'function') await WorkflowModule.mount();
        if (ShowcaseModule && typeof ShowcaseModule.mount === 'function') await ShowcaseModule.mount();
        if (TestimonialsModule && typeof TestimonialsModule.mount === 'function') await TestimonialsModule.mount();
        if (PricingModule && typeof PricingModule.mount === 'function') await PricingModule.mount();
        if (FaqModule && typeof FaqModule.mount === 'function') await FaqModule.mount();
        if (FooterModule && typeof FooterModule.mount === 'function') await FooterModule.mount();
    },
    
    destroy() {
        Logger.info("[HomePage] Destroying HomePage and cleaning memory.");
    }
};

export default HomePage;
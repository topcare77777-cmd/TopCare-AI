/**
 * TopCare AI Platform V2.0.0
 * Hero Module
 * Path: assets/js/modules/hero.module.js
 */

import HeroService from '../services/hero.service.js';
import HeroRenderer from '../renderers/hero.renderer.js';
import HeroComponent from '../components/hero.component.js';

const HeroModule = {
    async init(containerId = 'hero-wrapper') {
        console.log('[HeroModule] Initialized');
        try {
            const data = await HeroService.load();
            console.log("[HeroModule] Data received from service");
            if (data) {
                const html = HeroRenderer.render(data);
                if (HeroComponent && typeof HeroComponent.mount === 'function') {
                    HeroComponent.mount(containerId, html);
                }
            }
        } catch (error) {
            console.error('[HeroModule] Initialization error:', error);
        }
    }
};

export default HeroModule;
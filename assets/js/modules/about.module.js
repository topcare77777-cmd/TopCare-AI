/**
 * TopCare AI Platform V2.0.0
 * About Module
 * Path: assets/js/modules/about.module.js
 */

import AboutService from '../services/about.service.js';
import AboutRenderer from '../renderers/about.renderer.js';
import AboutComponent from '../components/about.component.js';

const AboutModule = {
    async init(containerId = 'about-wrapper') {
        console.log('[AboutModule] Initialized');
        try {
            const data = await AboutService.load();
            if (data) {
                const html = AboutRenderer.render(data);
                if (AboutComponent && typeof AboutComponent.mount === 'function') {
                    AboutComponent.mount(containerId, html);
                }
            }
        } catch (error) {
            console.error('[AboutModule] Initialization error:', error);
        }
    }
};

export default AboutModule;
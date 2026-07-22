/**
 * TopCare AI Platform V2.0.0
 * Personality Module
 * Path: assets/js/modules/personality.module.js
 */

import PersonalityService from '../services/personality.service.js';
import PersonalityRenderer from '../renderers/personality.renderer.js';
import PersonalityComponent from '../components/personality.component.js';

const PersonalityModule = {
    async init(containerId = 'personality-wrapper') {
        console.log('[PersonalityModule] Initialized');
        try {
            const data = await PersonalityService.load();
            if (data) {
                const html = PersonalityRenderer.render(data);
                if (PersonalityComponent && typeof PersonalityComponent.mount === 'function') {
                    PersonalityComponent.mount(containerId, html);
                }
            }
        } catch (error) {
            console.error('[PersonalityModule] Initialization error:', error);
        }
    }
};

export default PersonalityModule;
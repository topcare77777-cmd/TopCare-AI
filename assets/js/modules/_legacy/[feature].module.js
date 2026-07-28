/**
 * TopCare AI Platform V2.0.0
 * Feature Module Template
 */

import FeatureService from '../services/[feature].service.js';
import FeatureRenderer from '../renderers/[feature].renderer.js';
import FeatureComponent from '../components/[feature].component.js';

const FeatureModule = {
    async init(containerId = '[feature]-wrapper') {
        console.log('[FeatureModule] Initialized');
        try {
            const data = await FeatureService.load();
            if (data) {
                const html = FeatureRenderer.render(data);
                if (FeatureComponent && typeof FeatureComponent.mount === 'function') {
                    FeatureComponent.mount(containerId, html);
                }
            }
        } catch (error) {
            console.error('[FeatureModule] Initialization error:', error);
        }
    }
};

export default FeatureModule;
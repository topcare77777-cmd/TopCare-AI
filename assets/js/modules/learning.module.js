/**
 * TopCare AI Platform V2.0.0
 * Learning Module
 * Path: assets/js/modules/learning.module.js
 */

import LearningService from '../services/learning.service.js';
import LearningRenderer from '../renderers/learning.renderer.js';
import LearningComponent from '../components/learning.component.js';

const LearningModule = {
    async init(containerId = "learning-wrapper") {
        console.log("[LearningModule] Initialized");
        try {
            const data = await LearningService.load();
            if (data) {
                const html = LearningRenderer.render(data);
                if (LearningComponent && typeof LearningComponent.mount === 'function') {
                    LearningComponent.mount(containerId, html);
                }
            }
        } catch (error) {
            console.error("[LearningModule] Initialization error:", error);
        }
    }
};

export default LearningModule;
/**
 * TopCare AI Platform V2.0.0
 * Footer Module
 * Path: assets/js/modules/footer.module.js
 */

import BaseModule from '../core/base.module.js';
import FooterService from '../services/footer.service.js';
import FooterRenderer from '../renderers/footer.renderer.js';
import FooterComponent from '../components/footer.component.js';
import MotionEngine from '../engine/motion.engine.js';

class FooterModuleClass extends BaseModule {
    constructor() {
        super('Footer', 'footer-wrapper');
        this.service = FooterService;
        this.renderer = FooterRenderer;
        this.component = FooterComponent;
    }

    afterMount() {
        MotionEngine.init();
    }
}

export default new FooterModuleClass();
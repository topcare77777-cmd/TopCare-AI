/**
 * TopCare AI Platform V2.0.0
 * Trusted Module
 * Path: assets/js/modules/trusted.module.js
 */

import BaseModule from '../core/base.module.js';
import TrustedService from '../services/trusted.service.js';
import TrustedRenderer from '../renderers/trusted.renderer.js';
import TrustedComponent from '../components/trusted.component.js';
import MotionEngine from '../core/motion.engine.js';

class TrustedModuleClass extends BaseModule {
    constructor() {
        super('Trusted', 'trusted-wrapper');
        this.service = TrustedService;
        this.renderer = TrustedRenderer;
        this.component = TrustedComponent;
    }

    afterMount() {
        MotionEngine.init();
    }
}

export default new TrustedModuleClass();
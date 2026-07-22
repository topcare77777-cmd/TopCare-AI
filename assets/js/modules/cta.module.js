/**
 * TopCare AI Platform V2.0.0
 * CTA Module
 * Path: assets/js/modules/cta.module.js
 */

import BaseModule from '../core/base.module.js';
import CtaService from '../services/cta.service.js';
import CtaRenderer from '../renderers/cta.renderer.js';
import CtaComponent from '../components/cta.component.js';
import MotionEngine from '../core/motion.engine.js';
import GlowEffect from '../core/glow.effect.js';
import Logger from '../core/logger.js';

class CtaModuleClass extends BaseModule {
    constructor() {
        super('Cta', 'cta-wrapper');
        this.service = CtaService;
        this.renderer = CtaRenderer;
        this.component = CtaComponent;
    }

    afterMount() {
        MotionEngine.init();
        const container = document.getElementById(this.containerId);
        if (container) {
            GlowEffect.attach(container);
        } else {
            GlowEffect.attach(document);
        }
        Logger.info("[CtaModule] Mounted successfully with canonical GlowEffect.attach()");
    }
}

export default new CtaModuleClass();
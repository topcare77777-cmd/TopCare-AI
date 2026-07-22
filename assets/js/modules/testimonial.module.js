/**
 * TopCare AI Platform V2.0.0
 * Testimonials Module
 * Path: assets/js/modules/testimonials.module.js
 */
import BaseModule from '../core/base.module.js';
import TestimonialsService from '../services/testimonials.service.js';
import TestimonialsRenderer from '../renderers/testimonials.renderer.js';
import TestimonialsComponent from '../components/testimonials.component.js';
import MotionEngine from '../core/motion.engine.js';
import GlowEffect from '../core/glow.effect.js';
import Logger from '../core/logger.js';

class TestimonialsModuleClass extends BaseModule {
    constructor() {
        super('Testimonials', 'testimonials-wrapper');
        this.service = TestimonialsService;
        this.renderer = TestimonialsRenderer;
        this.component = TestimonialsComponent;
    }

    afterMount() {
        MotionEngine.init();
        GlowEffect.attach(document.getElementById(this.containerId));
        Logger.info("[TestimonialsModule] Initialized successfully");
    }
}

export default new TestimonialsModuleClass();
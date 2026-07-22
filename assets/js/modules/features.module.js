/**
 * TopCare AI Platform V2.0.0
 * Features Module (Console Tracing)
 * Path: assets/js/modules/features.module.js
 */

import BaseModule from '../core/base.module.js';
import FeaturesService from '../services/features.service.js';
import FeaturesRenderer from '../renderers/features.renderer.js';
import FeaturesComponent from '../components/features.component.js';
import MotionEngine from '../core/motion.engine.js';
import GlowEffect from '../core/glow.effect.js';
import Logger from '../core/logger.js';

class FeaturesModuleClass extends BaseModule {
    constructor() {
        super('Features', 'features-wrapper');
        this.service = FeaturesService;
        this.renderer = FeaturesRenderer;
        this.component = FeaturesComponent;
    }

    afterMount() {
        console.log("[FEATURES MOUNT]");
        MotionEngine.init();
        GlowEffect.attach(document.getElementById(this.containerId));
        Logger.info("[FeaturesModule] Mounted successfully.");
    }
}

export default new FeaturesModuleClass();
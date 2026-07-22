/**
 * TopCare AI Platform V2.0.0
 * Hero Module (Console Tracing & Asset Integration)
 * Path: assets/js/modules/hero.module.js
 */

import BaseModule from '../core/base.module.js';
import HeroService from '../services/hero.service.js';
import HeroRenderer from '../renderers/hero.renderer.js';
import HeroComponent from '../components/hero.component.js';
import MotionEngine from '../core/motion.engine.js';
import GlowEffect from '../core/glow.effect.js';
import Parallax from '../core/parallax.js';
import Logger from '../core/logger.js';

class HeroModuleClass extends BaseModule {
    constructor() {
        super('Hero', 'hero-wrapper');
        this.service = HeroService;
        this.renderer = HeroRenderer;
        this.component = HeroComponent;
    }

    afterMount() {
        console.log("[HERO MOUNT]");
        MotionEngine.init();
        GlowEffect.attach(document.getElementById(this.containerId));
        Parallax.init();
        Logger.info("[HeroModule] Mounted successfully with complete image tracing.");
    }
}

export default new HeroModuleClass();
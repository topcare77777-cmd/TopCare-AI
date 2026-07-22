/**
 * TopCare AI Platform V2.0.0
 * Enterprise Dashboard Module
 * Path: assets/js/modules/dashboard.module.js
 */

import BaseModule from '../core/base.module.js';
import DashboardService from '../services/dashboard.service.js';
import DashboardRenderer from '../renderers/dashboard.renderer.js';
import DashboardComponent from '../components/dashboard.component.js';
import MotionEngine from '../core/motion.engine.js';
import GlowEffect from '../core/glow.effect.js';
import Logger from '../core/logger.js';

class DashboardModuleClass extends BaseModule {
    constructor() {
        super('Dashboard', 'dashboard-wrapper');
        this.service = DashboardService;
        this.renderer = DashboardRenderer;
        this.component = DashboardComponent;
    }

    afterMount() {
        MotionEngine.init();
        GlowEffect.attach(document.getElementById(this.containerId));
        Logger.info("[DashboardModule] Enterprise Dashboard mounted successfully.");
    }
}

export default new DashboardModuleClass();
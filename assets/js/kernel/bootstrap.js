/**
 * TopCare AI Platform V2.0.0
 * Kernel Bootstrap (Complete Tracing Pipeline)
 * Path: assets/js/kernel/bootstrap.js
 */

import ModuleRegistry from '../modules/module.registry.js';
import PageEngine from '../pages/page.engine.js';
import MotionEngine from '../core/motion.engine.js';
import GlowEffect from '../core/glow.effect.js';
import Parallax from '../core/parallax.js';
import EnterpriseUXEngine from '../core/enterprise-ux.engine.js';
import AccessibilityEngine from '../core/accessibility.engine.js';
import PerformanceEngine from '../core/performance.engine.js';
import StateEngine from '../core/state.engine.js';
import CommandPalette from '../core/command.palette.js';
import ThemeEngine from '../core/theme.engine.js';
import ErrorBoundary from '../core/error.boundary.js';
import DevTools from '../core/devtools.js';

import AssetsRegistry from '../config/assets.registry.js';
import AssetValidator from '../core/asset.validator.js';
import Logger from '../core/logger.js';

const Bootstrap = {
    async init() {
        console.log("[BOOT]");
        Logger.info("[Bootstrap] Initializing TopCare AI Platform V2.0.0...");
        
        try {
            AssetsRegistry.init();
            await AssetValidator.run();

            ErrorBoundary.init();
            AccessibilityEngine.init();
            PerformanceEngine.init();
            StateEngine.init({ user: null, preferences: {} });
            ThemeEngine.init();
            CommandPalette.init();

            console.log("[PAGE ENGINE]");
            PageEngine.createHomepageLayout();

            console.log("[MODULE REGISTRY]");
            await ModuleRegistry.init();

            MotionEngine.init();
            GlowEffect.attach(document);
            Parallax.init();
            EnterpriseUXEngine.init();
            DevTools.init();

            console.log("[IMAGE LOAD]");
            Logger.info("[Bootstrap] Platform initialization complete.");
        } catch (error) {
            Logger.error("[Bootstrap] Critical initialization error:", error);
            console.error("[BOOTSTRAP ERROR]", error);
        }
    }
};

export default Bootstrap;
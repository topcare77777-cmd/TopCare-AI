/**
 * TOPCARE AI PLATFORM V2 — APPLICATION BOOTSTRAP ENGINE
 * Path: assets/js/app.js
 * Version: 136.1.0 (BUILD 136.1 — PLUGGABLE INTEGRATION)
 * Status: APPROVED & LOCKED
 * SRP: Main entrypoint orchestrating app layout, installing feature modules, and booting router engine.
 */

import { appRouter } from './core/router/app-router.js';
import { sidebarNavigation } from './core/ui/sidebar-navigation.js';
import { DownloadCenterModule } from './features/download-center/download-center.module.js';
import { Core } from './core/index.js';

class ApplicationBootstrap {
    static init() {
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                if (Core && Core.Logger) {
                    Core.Logger.info("[App] Bootstrapping TopCare AI Platform V2 Engine (BUILD 136.1)...");
                }

                // 1. Mount Navigation Shell
                const sidebarContainer = document.getElementById('tc-sidebar-container');
                if (sidebarContainer) {
                    sidebarNavigation.mount(sidebarContainer);
                }

                // 2. Install Feature Modules into Core Router Engine (Pluggable Pattern)
                // Existing core routes (e.g. Marketplace, Coach, Profile) remain managed by Core Router
                DownloadCenterModule.install(appRouter);

                // 3. Initialize Core Router Engine
                const mainAppContainer = document.getElementById('tc-app-main');
                if (mainAppContainer) {
                    appRouter.init(mainAppContainer);
                }

                if (Core && Core.Logger) {
                    Core.Logger.info("[App] TopCare AI Platform V2 Engine fully initialized with DownloadCenterModule.");
                }

            } catch (err) {
                console.error("[App] Fatal bootstrap initialization exception:", err);
            }
        });
    }
}

// Start Platform Engine
ApplicationBootstrap.init();
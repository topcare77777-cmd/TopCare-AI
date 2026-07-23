/**
 * TopCare AI Platform V2.0.0
 * Enterprise Router Engine (BUILD 031 Unified Source of Truth)
 * Path: assets/js/core/router.engine.js
 */

import PageLoader from './page.loader.js';
import HistoryEngine from './history.engine.js';
import PageRegistry from '../pages/page.registry.js';
import NavigationEngine from './navigation.engine.js';
import Logger from './logger.js';

const RouterEngine = {
    init() {
        Logger.info("[RouterEngine] Initializing Enterprise Router Engine (BUILD 031 Unification)...");
        
        HistoryEngine.init((path) => {
            this.handleRoute(path, false);
        });

        // SINGLE SOURCE OF TRUTH: Intercept all data-route or internal anchor clicks
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-route], a[href^="/"], a[href^="#"]');
            if (!target) return;

            e.preventDefault();
            e.stopPropagation();

            let routePath = target.getAttribute('data-route') || target.getAttribute('href');
            if (!routePath) return;

            if (routePath.startsWith('#')) {
                const clean = routePath.substring(1);
                routePath = clean === 'hero' ? '/home' : `/${clean}`;
            }

            if (routePath.startsWith('/')) {
                this.navigate(routePath, true);
            }
        });

        // Resolve initial entry path
        const currentPath = window.location.pathname === '' || window.location.pathname === '/' || window.location.pathname === '/index.html' ? '/home' : window.location.pathname;
        this.navigate(currentPath, false);

        Logger.info("[RouterEngine] Router Engine active as sole navigation authority.");
    },

    navigate(path, push = true) {
        const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
        if (push) {
            HistoryEngine.push(cleanPath);
        }
        this.handleRoute(cleanPath, true);
    },

    async handleRoute(path, updateScroll = true) {
        const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
        const pageKey = PageRegistry.resolve(cleanPath);
        
        Logger.info(`[RouterEngine] Unifying route -> Path: ${cleanPath} | Resolved PageKey: ${pageKey}`);
        await PageLoader.load(pageKey);

        NavigationEngine.updateActiveNav(cleanPath);

        if (updateScroll) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    prefetch(path) {
        const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
        const pageKey = PageRegistry.resolve(cleanPath);
        if (pageKey) {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                    PageLoader.prefetch(pageKey);
                });
            } else {
                setTimeout(() => {
                    PageLoader.prefetch(pageKey);
                }, 200);
            }
        }
    }
};

export default RouterEngine;
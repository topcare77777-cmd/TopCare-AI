/**
 * TopCare AI Platform V2.0.0
 * Enterprise Navigation Engine (BUILD 031 Hover & Active State Only)
 * Path: assets/js/core/navigation.engine.js
 */

import RouterEngine from './router.engine.js';
import Logger from '../core/logger.js';

const NavigationEngine = {
    init() {
        Logger.info("[NavigationEngine] Initializing Navigation Event Listeners...");
        
        const navLinks = document.querySelectorAll('[data-route], .nav-links a, .auth-actions a, footer a');
        
        navLinks.forEach(link => {
            const routePath = link.getAttribute('data-route') || link.getAttribute('href');
            if (routePath && (routePath.startsWith('/') || routePath.startsWith('#'))) {
                let formattedPath = routePath;
                if (routePath.startsWith('#')) {
                    const clean = routePath.substring(1);
                    formattedPath = clean === 'hero' ? '/home' : `/${clean}`;
                }

                // Prefetch on hover for instant SPA loading
                link.addEventListener('mouseenter', () => {
                    RouterEngine.prefetch(formattedPath);
                });
            }
        });

        Logger.info("[NavigationEngine] Navigation hover and active state manager active.");
    },

    updateActiveNav(path) {
        const navLinks = document.querySelectorAll('[data-route], .nav-links a');
        navLinks.forEach(link => {
            const routePath = link.getAttribute('data-route') || link.getAttribute('href');
            if (routePath === path || (path === '/home' && (routePath === '/hero' || routePath === '/')) || routePath === `/${path}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};

export default NavigationEngine;
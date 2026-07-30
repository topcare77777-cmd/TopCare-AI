/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Navigation Engine (BUILD 096 Cleanup)
 * Status       : ACTIVE
 * Version      : 3.3.0
 * Architecture : Development Constitution v1.1
 * Description  : Enterprise Navigation Engine managing active states 
 *                and navigation event listeners safely.
 * -----------------------------------------------------------------
 */

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
            }
        });

        Logger.info("[NavigationEngine] Navigation active state manager active.");
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
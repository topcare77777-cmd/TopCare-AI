/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Navigation Engine (BUILD 093.4 Ultimate Hardened)
 * Status       : ACTIVE
 * Version      : 3.5.0
 * Architecture : Development Constitution v1.1
 * -----------------------------------------------------------------
 */

import RouterEngine from './router.engine.js';
import Logger from '../core/logger.js';

const NavigationEngine = {
    _authNavigationBound: false,
    _authModule: null,
    _boundAuthClickHandler: null,

    /**
     * Helper terpusat untuk memuat AuthUIController secara dinamis (Lazy Loading + Caching).
     * Mempermudah pengembangan fitur auth lanjutan di masa depan (OTP, MFA, Forgot Password, dll).
     */
    async getAuthController() {
        if (!this._authModule) {
            this._authModule = await import('../auth/ui/auth.ui.controller.js');
        }
        return this._authModule.default || this._authModule.authUIController;
    },

    init() {
        Logger.info("[NavigationEngine] Initializing Navigation Event Listeners...");
        
        const navLinks = document.querySelectorAll('[data-route], .nav-links a, .auth-actions a, footer a');
        
        navLinks.forEach(link => {
            if (link.dataset.prefetchBound) {
                return;
            }
            link.dataset.prefetchBound = "true";

            const routePath = link.getAttribute('data-route') || link.getAttribute('href');
            
            // Skip prefetch untuk rute auth modal agar tidak membuang resource network/module loader
            if (routePath === '#/login' || routePath === '#/register' || routePath === '/login' || routePath === '/register') {
                return;
            }

            if (routePath && (routePath.startsWith('/') || routePath.startsWith('#'))) {
                let formattedPath = routePath;
                if (routePath.startsWith('#')) {
                    const clean = routePath.substring(1);
                    formattedPath = clean === 'hero' ? '/home' : `/${clean}`;
                }

                // Skip prefetch jika path format berkorespondensi dengan auth
                if (formattedPath === '/login' || formattedPath === '/register') {
                    return;
                }

                link.addEventListener('mouseenter', () => {
                    RouterEngine.prefetch(formattedPath);
                });
            }
        });

        // Bind Auth Interception dengan pendukung cleanup (named handler) dan container fallback aman
        if (!this._authNavigationBound) {
            this._authNavigationBound = true;
            
            const navContainer = document.querySelector('.site-header') || document.querySelector('header');
            if (!navContainer) {
                Logger.warn("[NavigationEngine] Auth navigation container (.site-header / header) not found. Interception skipped.");
                return;
            }

            // Simpan handler sebagai properti agar dapat dibersihkan (removeEventListener) saat teardown/hot reload
            this._boundAuthClickHandler = async (event) => {
                const link = event.target.closest('a[data-target], a[href]');
                if (!link) return;

                const dataTarget = link.getAttribute('data-target');
                const href = link.getAttribute('href') || '';

                const isLogin = dataTarget === 'login' || href === '#/login';
                const isRegister = dataTarget === 'register' || href === '#/register';

                if (isLogin || isRegister) {
                    event.preventDefault();

                    try {
                        const controller = await this.getAuthController();

                        if (isLogin && typeof controller.openLogin === 'function') {
                            controller.openLogin();
                        } else if (isRegister && typeof controller.openRegister === 'function') {
                            controller.openRegister();
                        }
                    } catch (error) {
                        Logger.error("[NavigationEngine] Failed to load AuthUIController dynamically:", error);
                    }
                }
            };
            
            navContainer.addEventListener('click', this._boundAuthClickHandler);
        }

        Logger.info("[NavigationEngine] Navigation hover, active state, and secure auth interception active.");
    },

    updateActiveNav(path) {
        const navLinks = document.querySelectorAll('[data-route], .nav-links a');
        navLinks.forEach(link => {
            const routePath = link.getAttribute('data-route') || link.getAttribute('href');
            
            // Skip active navigation highlight untuk rute autentikasi modal
            if (routePath === '#/login' || routePath === '#/register' || routePath === '/login' || routePath === '/register') {
                return;
            }

            if (routePath === path || (path === '/home' && (routePath === '/hero' || routePath === '/')) || routePath === `/${path}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    destroy() {
        // Membersihkan event listener secara bersih untuk mencegah memory leak dan mendukung hot reload
        if (this._authNavigationBound) {
            const navContainer = document.querySelector('.site-header') || document.querySelector('header');
            if (navContainer && this._boundAuthClickHandler) {
                navContainer.removeEventListener('click', this._boundAuthClickHandler);
            }
            this._authNavigationBound = false;
            this._boundAuthClickHandler = null;
            this._authModule = null;
            Logger.info("[NavigationEngine] Cleaned up auth navigation bindings.");
        }
    }
};

export default NavigationEngine;
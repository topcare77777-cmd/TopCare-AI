/**
 * file: assets/js/router/router.js
 * Version: 124.3.1 (BUILD 124.3.1 — EXACT DOMAIN PATH RESOLUTION FIX)
 * Status: APPROVED & LOCKED
 * SRP: Dynamic Route Loader, Explicit Path Resolver & Guard Dispatcher.
 */

import { ViewManager } from '../core/view-manager.js';
import { Core } from '../core/index.js';
import { AuthRouteGuard } from '../auth/guards/auth-route.guard.js';

class RouterEngine {
    constructor() {
        this.routes = new Map();
        this._isInitialized = false;
        Object.seal(this);
    }

    init() {
        if (this._isInitialized) return;
        this._registerRoutes();

        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute(); // Boot initial hash route
        this._isInitialized = true;
    }

    _registerRoutes() {
        // 1. Explicit Auth Pages (Mapped strictly to pages/auth/)
        this.register('/login', () => this._dispatchAuthPage('login.page.js'));
        this.register('/register', () => this._dispatchAuthPage('register.page.js'));
        this.register('/forgot-password', () => this._dispatchAuthPage('forgot-password.page.js'));

        // 2. Explicit Core Application Pages (Mapped strictly to pages/)
        this.register('/home', () => this._dispatchCorePage('home.page.js'));
        this.register('/coach', () => this._dispatchCorePage('coach.page.js'));
        this.register('/coach-selection', () => this._dispatchCorePage('coach-selection.page.js'));
        this.register('/personality', () => this._dispatchCorePage('personality.page.js'));
        this.register('/learning', () => this._dispatchCorePage('learning.page.js'));

        // 3. Protected Personality Test Sandbox
        this.register('/personality-test', async () => {
            Core.Logger.info('[Router] Navigating to Personality Test Sandbox...');
            try {
                const { PersonalityBootstrap } = await import('../personality/personality.bootstrap.js');
                ViewManager.mountView({
                    mount: async (container) => {
                        container.innerHTML = `<div id="personality-test" class="tc-sandbox-host"></div>`;
                        const sandbox = container.querySelector('#personality-test');
                        await PersonalityBootstrap.bootstrap(sandbox);
                    },
                    destroy: () => {
                        if (PersonalityBootstrap && typeof PersonalityBootstrap.destroy === 'function') {
                            PersonalityBootstrap.destroy();
                        }
                    }
                });
            } catch (err) {
                Core.Logger.error(`[Router] Failed to load Personality Test: ${err.message}`);
                await this._dispatchCorePage('personality.page.js');
            }
        });

        // 4. Smooth Scroll Landing Anchor Redirect
        this.register('/features', () => {
            window.location.hash = '#/home';
            setTimeout(() => {
                const featuresEl = document.getElementById('features') || document.getElementById('services');
                if (featuresEl) {
                    featuresEl.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        });

        // 5. Workspace AI Coach Runtime Route
        this.register('/workspace/coach', async () => {
            Core.Logger.info("[Router] Navigating to Workspace AI Coach Runtime...");

            try {
                await this._dispatchCorePage('coach.page.js');
            } catch (err) {
                Core.Logger.error(`[Router] Failed to load Workspace AI Coach: ${err.message}`);
                ViewManager.renderErrorView(err);
            }
        });

        // 6. Manifest Dynamic Application Pages (Mapped strictly to pages/)
        const manifestPages = ['about', 'prompt', 'community', 'premium', 'faq', 'ebook', 'assistant', 'workspace'];
        manifestPages.forEach(page => {
            this.register(`/${page}`, () => this._dispatchCorePage(`${page}.page.js`));
        });
    }

    async _dispatchAuthPage(fileName) {
        try {
            const pageModule = await import(`../pages/auth/${fileName}`);
            const host = ViewManager.getAppHost();
            const TargetClass = pageModule.RegisterPage || 
                                pageModule.LoginPage || 
                                pageModule.ForgotPasswordPage ||
                                pageModule.default || 
                                pageModule[Object.keys(pageModule)[0]];

            const instance = typeof TargetClass === 'function' ? new TargetClass(host) : TargetClass;
            await ViewManager.mountView(instance);
        } catch (err) {
            Core.Logger.error(`[Router] Failed to load auth page module '${fileName}': ${err.message}`);
            ViewManager.renderErrorView(err);
        }
    }

    async _dispatchCorePage(fileName) {
        try {
            const pageModule = await import(`../pages/${fileName}`);
            const host = ViewManager.getAppHost();

            const targetInstance = pageModule.default || 
                                   pageModule.LearningPage ||
                                   pageModule.coachPage || 
                                   pageModule.homePage || 
                                   pageModule.coachSelectionPage || 
                                   pageModule.personalityPage || 
                                   pageModule;

            if (typeof targetInstance === 'function') {
                await ViewManager.mountView(new targetInstance(host));
            } else {
                await ViewManager.mountView(targetInstance);
            }
        } catch (err) {
            Core.Logger.error(`[Router] Failed to load core page module '${fileName}': ${err.message}`);
            ViewManager.renderErrorView(err);
        }
    }

    register(path, handler) {
        this.routes.set(path, handler);
    }

    navigate(path) {
        const targetHash = `#${path.startsWith('/') ? path : '/' + path}`;
        if (window.location.hash !== targetHash) {
            window.location.hash = targetHash;
        } else {
            this.handleRoute();
        }
    }

    handleRoute() {
        let rawHash = window.location.hash.replace('#', '') || '/home';

        if (!rawHash.startsWith('/') && rawHash !== '') {
            const element = document.getElementById(rawHash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }

        if (rawHash === '' || rawHash === '/') rawHash = '/home';
        const path = rawHash.startsWith('/') ? rawHash : `/${rawHash}`;

        // Security Guard Check
        const guardDecision = AuthRouteGuard.check(path);

        if (!guardDecision.allowed) {
            if (guardDecision.redirect) {
                this.navigate(guardDecision.redirect);
            }
            return;
        }

        const handler = this.routes.get(path);
        if (handler) {
            handler();
        } else {
            Core.Logger.warn(`[Router] Route '${path}' not registered. Fallback to '/home'.`);
            const fallback = this.routes.get('/home');
            if (fallback) fallback();
        }
    }
}

export const Router = new RouterEngine();
export default Router;
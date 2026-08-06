/**
 * TOPCARE AI PLATFORM V2 — ROUTER REGISTRY
 * Path: assets/js/router/router.registry.js
 * Version: 130.0.0 (BUILD 130.0 — CANONICAL ROUTE REGISTRY MIGRATION)
 * Status: APPROVED & LOCKED
 * SRP: Central Route Definitions, Dynamic Page Loaders, Guard Execution & Route Dispatching.
 */

import { Router } from './index.js';
import { ViewManager } from '../core/view-manager.js';
import { Core } from '../core/index.js';
import { AuthRouteGuard } from '../auth/guards/auth-route.guard.js';

export class RouterRegistry {
    constructor() {
        this._isRegistered = false;
        Object.seal(this);
    }

    /**
     * Registers all canonical platform routes to the Enterprise Router Service.
     */
    registerRoutes() {
        if (this._isRegistered) return;

        // ---------------------------------------------------------------------
        // 1. Authentication Pages (Mapped strictly to pages/auth/)
        // ---------------------------------------------------------------------
        Router.register('/login', () => this._dispatchAuthPage('login.page.js'));
        Router.register('/register', () => this._dispatchAuthPage('register.page.js'));
        Router.register('/forgot-password', () => this._dispatchAuthPage('forgot-password.page.js'));

        // ---------------------------------------------------------------------
        // 2. Explicit Core Application Pages (Mapped strictly to pages/)
        // ---------------------------------------------------------------------
        Router.register('/home', () => this._dispatchCorePage('home.page.js'));
        Router.register('/coach', () => this._dispatchCorePage('coach.page.js'));
        Router.register('/coach-selection', () => this._dispatchCorePage('coach-selection.page.js'));
        Router.register('/personality', () => this._dispatchCorePage('personality.page.js'));
        Router.register('/learning', () => this._dispatchCorePage('learning.page.js'));
        Router.register('/marketplace', () => this._dispatchCorePage('home.page.js'));

        // ---------------------------------------------------------------------
        // 3. Protected Personality Test Sandbox Domain
        // ---------------------------------------------------------------------
        Router.register('/personality-test', async () => {
            Core.Logger.info('[RouterRegistry] Navigating to Personality Test Sandbox...');
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
                Core.Logger.error(`[RouterRegistry] Failed to load Personality Test: ${err.message}`);
                await this._dispatchCorePage('personality.page.js');
            }
        });

        // ---------------------------------------------------------------------
        // 4. Smooth Scroll Landing Anchor Redirect
        // ---------------------------------------------------------------------
        Router.register('/features', () => {
            window.location.hash = '#/home';
            setTimeout(() => {
                const featuresEl = document.getElementById('features') || document.getElementById('services');
                if (featuresEl) {
                    featuresEl.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        });

        // ---------------------------------------------------------------------
        // 5. Workspace AI Coach Runtime Route
        // ---------------------------------------------------------------------
        Router.register('/workspace/coach', async () => {
            Core.Logger.info('[RouterRegistry] Navigating to Workspace AI Coach Runtime...');
            try {
                await this._dispatchCorePage('coach.page.js');
            } catch (err) {
                Core.Logger.error(`[RouterRegistry] Failed to load Workspace AI Coach: ${err.message}`);
                ViewManager.renderErrorView(err);
            }
        });

        // ---------------------------------------------------------------------
        // 6. Dynamic Application Pages Manifest (Mapped strictly to pages/)
        // ---------------------------------------------------------------------
        const manifestPages = [
            'about',
            'prompt',
            'community',
            'premium',
            'faq',
            'ebook',
            'assistant',
            'workspace',
            'artikel'
        ];

        manifestPages.forEach((page) => {
            Router.register(`/${page}`, () => this._dispatchCorePage(`${page}.page.js`));
        });

        this._isRegistered = true;
        Core.Logger.info('[RouterRegistry] All canonical routes registered to Enterprise Router Service.');
    }

    /**
     * Dispatches Auth Pages safely with dynamic module loading.
     * @private
     * @param {string} fileName 
     */
    async _dispatchAuthPage(fileName) {
        if (!this._evaluateGuard('/auth')) return;

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
            Core.Logger.error(`[RouterRegistry] Failed to load auth page module '${fileName}': ${err.message}`);
            ViewManager.renderErrorView(err);
        }
    }

    /**
     * Dispatches Core Application Pages safely with dynamic module loading.
     * @private
     * @param {string} fileName 
     */
    async _dispatchCorePage(fileName) {
        const routePath = `/${fileName.replace('.page.js', '')}`;
        if (!this._evaluateGuard(routePath)) return;

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
            Core.Logger.error(`[RouterRegistry] Failed to load core page module '${fileName}': ${err.message}`);
            ViewManager.renderErrorView(err);
        }
    }

    /**
     * Evaluates route security guards before rendering.
     * @private
     * @param {string} path 
     * @returns {boolean}
     */
    _evaluateGuard(path) {
        if (!AuthRouteGuard || typeof AuthRouteGuard.check !== 'function') return true;

        const guardDecision = AuthRouteGuard.check(path);
        if (!guardDecision.allowed) {
            if (guardDecision.redirect) {
                Router.navigate(guardDecision.redirect);
            }
            return false;
        }
        return true;
    }
}

export const routerRegistry = new RouterRegistry();
export default routerRegistry;
/**
 * file: assets/js/router/router.js
 * Version: 140.1.0
 * Status: APPROVED & LOCKED
 * SRP: Dynamic Route Loader & Manifest Dispatcher connecting URLs to Dynamic Page Instances.
 */

import { ViewManager } from '../core/view-manager.js';
import { Core } from '../core/index.js';

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
        // 1. Core Dynamic Application Routes (Mapped to existing root files in assets/js/pages/)
        this.register('/home', () => this._dispatchPage('home.page.js', false));
        this.register('/login', () => this._dispatchPage('login.page.js', false));
        this.register('/register', () => this._dispatchPage('register.page.js', false));

        // 2. Personality & Legacy Sandbox Integration Route
        this.register('/personality', () => this._dispatchPage('personality.page.js', false));
        this.register('/personality-test', async () => {
            const { PersonalityBootstrap } = await import('../personality/personality.bootstrap.js');
            ViewManager.mountView({
                mount: async (container) => {
                    container.innerHTML = `<div id="personality-test" class="tc-sandbox-host"></div>`;
                    const sandbox = container.querySelector('#personality-test');
                    await PersonalityBootstrap.bootstrap(sandbox);
                },
                destroy: () => {
                    PersonalityBootstrap.destroy();
                }
            });
        });

        // 3. Generic Dynamic Manifest Route Registration
        const manifestPages = ['about', 'learning', 'prompt', 'community', 'premium', 'faq', 'ebook', 'coach'];
        manifestPages.forEach(page => {
            this.register(`/${page}`, () => this._dispatchPage(`${page}.page.js`, false));
        });
    }

    async _dispatchPage(filePath, isClassType = false) {
        try {
            const modulePath = `../pages/${filePath}`;
            const pageModule = await import(modulePath);

            if (isClassType) {
                const TargetClass = pageModule.default || pageModule[Object.keys(pageModule)[0]];
                const host = ViewManager.getAppHost();
                const instance = new TargetClass(host);
                await ViewManager.mountView(instance);
            } else {
                const instance = pageModule.default || pageModule.personalityPage || pageModule;
                await ViewManager.mountView(instance);
            }
        } catch (err) {
            Core.Logger.error(`[Router] Failed to load dynamic page module '${filePath}': ${err.message}`);
            ViewManager.renderErrorView(err);
        }
    }

    register(path, handler) {
        this.routes.set(path, handler);
    }

    handleRoute() {
        let rawHash = window.location.hash.replace('#', '') || '/home';

        // Support In-Page Smooth Scroll Anchors (#features, #cta)
        if (!rawHash.startsWith('/') && rawHash !== '') {
            const element = document.getElementById(rawHash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }

        if (rawHash === '' || rawHash === '/') rawHash = '/home';
        const path = rawHash.startsWith('/') ? rawHash : `/${rawHash}`;

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
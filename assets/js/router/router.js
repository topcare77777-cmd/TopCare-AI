/**
 * file: assets/js/router/router.js
 * Version: 140.6.0 (BUILD 139.1 — AI COACH MENU ACTIVATION)
 * Status: APPROVED & LOCKED
 * SRP: Dynamic Route Loader & Manifest Dispatcher with Resilient Workspace Coach Page Mounting.
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
        // 1. Core Dynamic Application Routes (Auth & Home)
        this.register('/home', () => this._dispatchPage('home.page.js', false));
        this.register('/login', () => this._dispatchPage('auth/login.page.js', true));
        this.register('/register', () => this._dispatchPage('auth/register.page.js', true));

        // 2. Personality Domain Routes (Protected)
        this.register('/personality', () => this._dispatchPage('personality.page.js', false));

        // Dynamic Sandbox Halaman Tes Kepribadian (Protected)
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

        // 3. Rute Smooth Scroll Landing Page (Public Home Scroll)
        this.register('/coach', () => {
            this.navigate('/workspace/coach');
        });

        // 4. RUTE WORKSPACE AI COACH RUNTIME (Protected & Activated)
        this.register('/workspace/coach', async () => {
            Core.Logger.info("[Router] Navigating to Workspace AI Coach Runtime...");

            try {
                // Check if Workspace DOM container exists
                let workspaceEl = document.getElementById('app-workspace');
                let homeEl = document.getElementById('app-home');

                if (!workspaceEl) {
                    // Fallback: Dispatch via Dynamic Coach Page Module
                    await this._dispatchPage('coach.page.js', false);
                    return;
                }

                if (homeEl) homeEl.style.display = 'none';
                workspaceEl.style.display = 'block';

                const { WorkspaceRuntime } = await import('../ui/workspace/workspace.runtime.js');
                if (WorkspaceRuntime && typeof WorkspaceRuntime.mountWorkspace === 'function') {
                    WorkspaceRuntime.mountWorkspace('coach');
                } else if (WorkspaceRuntime && typeof WorkspaceRuntime.activateTab === 'function') {
                    WorkspaceRuntime.activateTab('coach');
                }
            } catch (err) {
                Core.Logger.error(`[Router] Failed to load Workspace AI Coach: ${err.message}`);
                // Fallback to direct Coach Page dispatch
                await this._dispatchPage('coach.page.js', false);
            }
        });

        // 5. Manifest Dynamic Pages
        const manifestPages = ['about', 'learning', 'prompt', 'community', 'premium', 'faq', 'ebook', 'assistant', 'workspace'];
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
                const instance = pageModule.default || pageModule.coachPage || pageModule.personalityPage || pageModule;
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

        // SECURITY LAYER INTEGRATION: AuthRouteGuard Check
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

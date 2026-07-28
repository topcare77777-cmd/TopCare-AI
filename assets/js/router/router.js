/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Router Layer (Conductor)
 * Status       : ACTIVE
 * Version      : 2.7.0 (BUILD 095.4 Guard Integration)
 * Architecture : Development Constitution v1.1
 * Owner        : Router Conductor
 * Description  : Pure route conductor integrated with Route Guards & Guest Guards
 *                utilizing AuthObserver as the single source of truth.
 * -----------------------------------------------------------------
 */

import personalityPage from '../pages/personality.page.js';
import HomePage from '../pages/home.page.js';
import { ViewManager } from '../core/view-manager.js';
import { CoachController } from '../coach/coach.js';
import { routerEngine } from './router.engine.js';
import { protectedRouteGuard, guestRouteGuard } from '../auth/guards/index.js';
import authUIController from '../auth/ui/auth.ui.controller.js';
import Logger from '../core/logger.js';

export const Router = {
    routes: {},
    routeGuards: {},
    rootContainer: null,
    currentActiveRoute: '#/home',
    currentActiveModule: null,
    initialized: false,

    init(container) {
        if (this.initialized) {
            return;
        }

        this.rootContainer = container;
        this.initialized = true;

        // Initialize ViewManager with root container
        ViewManager.init(container);

        // Register static view routes using pure ViewManager toggling
        const staticRoutes = [
            'about', 'learning', 'ebook', 'articles',
            'prompt', 'community', 'creator', 'marketplace',
            'premium', 'faq', 'contact'
        ];

        staticRoutes.forEach(route => {
            this.register(`/${route}`, () => {
                ViewManager.restoreShell();
                this.teardownCurrentModule();
            });
        });

        // Register Guest-only routes with GuestRouteGuard (e.g. login, register if dedicated views)
        const guestRoutes = ['login', 'register'];
        guestRoutes.forEach(route => {
            this.register(`/${route}`, () => {
                ViewManager.restoreShell();
                this.teardownCurrentModule();
            }, guestRouteGuard);
        });

        // Register Protected routes example (e.g. dashboard)
        this.register('/dashboard', () => {
            ViewManager.restoreShell();
            this.teardownCurrentModule();
            // Dashboard mount logic can go here or via view activation
        }, protectedRouteGuard);

        // Register Home page route with full lifecycle integration
        this.register('/home', async () => {
            ViewManager.restoreShell();
            this.teardownCurrentModule();

            const viewHome = document.getElementById('view-home');
            if (viewHome) {
                this.currentActiveModule = HomePage;
                await HomePage.mount(viewHome);
            }
        });

        // Register Personality module route
        this.register('/personality', () => {
            ViewManager.restoreShell();
            this.teardownCurrentModule();

            const viewPersonality = document.getElementById('view-personality');
            if (viewPersonality) {
                this.currentActiveModule = personalityPage;
                personalityPage.beforeEnter();
                personalityPage.mount(viewPersonality);
                personalityPage.afterEnter();
            }
        });

        // Register Personality Test route with dynamic import
        this.register('/personality-test', () => {
            this.teardownCurrentModule();

            const testContainer = document.getElementById('personality-test');

            import('../personality/personality-test.js')
                .then((module) => {
                    const initTest = module.initPersonalityTest || module.default;
                    if (initTest && typeof initTest === 'function') {
                        if (testContainer) {
                            initTest(testContainer);
                        } else {
                            initTest();
                        }
                    }
                })
                .catch(err => console.error("Router: Failed to load personality-test.js", err));
        });

        // Register Coach page route (Protected example)
        this.register('/coach', () => {
            this.teardownCurrentModule();
            ViewManager.restoreShell();

            const viewCoach = document.getElementById('view-coach');
            if (viewCoach) {
                CoachController.init(viewCoach);
            }
        }, protectedRouteGuard);

        // Attach this Router instance to RouterEngine and initialize engine
        routerEngine.attachRouter(this);
        routerEngine.init();

        // Trigger initial routing state evaluation
        this.handleRouting();
    },

    register(path, handler, guard = null) {
        this.routes[path] = handler;
        if (guard) {
            this.routeGuards[path] = guard;
        }
    },

    teardownCurrentModule() {
        if (this.currentActiveModule && typeof this.currentActiveModule.beforeLeave === 'function') {
            this.currentActiveModule.beforeLeave();
            if (typeof this.currentActiveModule.destroy === 'function') {
                this.currentActiveModule.destroy();
            }
            if (typeof this.currentActiveModule.cleanup === 'function') {
                this.currentActiveModule.cleanup();
            }
            this.currentActiveModule = null;
        }
    },

    handleRouting() {
        const hash = window.location.hash || '#/home';
        const path = hash.replace('#', '');

        // Evaluate Route Guard if present
        const guard = this.routeGuards[path];
        if (guard && typeof guard.canActivate === 'function') {
            const evaluation = guard.canActivate();

            if (!evaluation.allowed) {
                Logger.info(`[Router] Navigation blocked for path: ${path}. Reason: ${evaluation.reason}`);

                if (evaluation.reason === "AUTH_NOT_READY") {
                    // Session restoration still pending, defer or hold gently
                    return;
                }

                if (evaluation.reason === "AUTH_REQUIRED") {
                    // Redirect to home/fallback and safely open login modal via UI controller
                    window.location.hash = '#/home';
                    authUIController.openLogin();
                    return;
                }

                if (evaluation.reason === "ALREADY_AUTHENTICATED") {
                    // Redirect active users away from guest-only pages back to home/dashboard
                    window.location.hash = '#/home';
                    return;
                }
            }
        }

        // Teardown CoachController if leaving the coach route
        if (this.currentActiveRoute === '#/coach' && hash !== '#/coach') {
            if (typeof CoachController.destroy === 'function') {
                CoachController.destroy();
            }
        }

        if (hash !== '#/personality') {
            this.teardownCurrentModule();
        }

        this.currentActiveRoute = hash;

        // Manage layout shell isolation or restoration via ViewManager
        if (path === '/personality-test') {
            ViewManager.isolateShell();
        } else {
            ViewManager.restoreShell();
        }

        // Delegate view activation to ViewManager FIRST
        let viewId = path.replace('/', '') || 'home';
        if (path === '/personality-test') {
            viewId = 'personality-test';
        }
        ViewManager.activateView(viewId);

        // Execute registered route handler asynchronously to respect lifecycle timing
        if (this.routes[path]) {
            setTimeout(() => {
                this.routes[path]();
            }, 0);
        }

        window.scrollTo({ top: 0, behavior: 'auto' });
    }
};

export default Router;
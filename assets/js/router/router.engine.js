/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Router Layer
 * Status       : ACTIVE
 * Version      : 2.5.0
 * Architecture : Development Constitution v1.1
 * Owner        : Router Conductor
 * Last Updated : BUILD 090.1 Single Route Authority (RouterEngine Delegation)
 * -----------------------------------------------------------------
 */

import personalityPage from '../pages/personality.page.js';
import HomePage from '../pages/home.page.js';
import { ViewManager } from '../core/view-manager.js';
import { CoachController } from '../coach/coach.js';
import { routerEngine } from './router.engine.js';

export const Router = {
    routes: {},
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

        // Register static view routes using pure ViewManager toggling without forcing missing page modules
        const staticRoutes = [
            'about', 'learning', 'ebook', 'articles',
            'prompt', 'community', 'creator', 'marketplace',
            'premium', 'faq', 'contact', 'login', 'register'
        ];

        staticRoutes.forEach(route => {
            this.register(`/${route}`, () => {
                ViewManager.restoreShell();
                this.teardownCurrentModule();
            });
        });

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
            ViewManager.restoreShell();
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

        // Register Coach page route
        this.register('/coach', () => {
            this.teardownCurrentModule();
            ViewManager.restoreShell();

            const viewCoach = document.getElementById('view-coach');
            if (viewCoach) {
                CoachController.init(viewCoach);
            }
        });

        // Attach this Router instance to RouterEngine for centralized orchestration
        routerEngine.attachRouter(this);
        routerEngine.init();

        // Trigger initial routing state evaluation
        this.handleRouting();
    },

    register(path, handler) {
        this.routes[path] = handler;
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
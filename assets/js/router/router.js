// assets/js/router/router.js
import personalityPage from '../pages/personality.page.js';
import { initPersonalityTest } from '../personality/personality-test.js';
import { ViewManager } from '../core/view-manager.js';

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

        this.register('/personality-test', () => {
            ViewManager.restoreShell();
            this.teardownCurrentModule();

            const testContainer = document.getElementById('personality-test');
            if (testContainer) {
                initPersonalityTest(testContainer);
            } else {
                initPersonalityTest();
            }
        });

        this.register('/coach', () => {
            this.teardownCurrentModule();
            ViewManager.restoreShell();
            const viewCoach = document.getElementById('view-coach');
            if (viewCoach) {
                import('../coach/coach.js').then(({ CoachController }) => {
                    window.CoachController = CoachController;
                    CoachController.init(viewCoach);
                });
            }
        });

        window.addEventListener('hashchange', () => this.handleRouting());
        this.handleRouting();
    },

    register(path, handler) {
        this.routes[path] = handler;
    },

    teardownCurrentModule() {
        if (this.currentActiveModule && typeof this.currentActiveModule.beforeLeave === 'function') {
            this.currentActiveModule.beforeLeave();
            this.currentActiveModule.destroy();
            this.currentActiveModule.cleanup();
            this.currentActiveModule = null;
        }
    },

    handleRouting() {
        const hash = window.location.hash || '#/home';
        const path = hash.replace('#', '');

        if (this.currentActiveRoute === '#/coach' && hash !== '#/coach') {
            if (window.CoachController && typeof window.CoachController.destroy === 'function') {
                window.CoachController.destroy();
            }
        }

        if (hash !== '#/personality') {
            this.teardownCurrentModule();
        }

        this.currentActiveRoute = hash;

        // 1. Manage layout shell isolation or restoration via ViewManager
        if (path === '/personality-test') {
            ViewManager.isolateShell();
        } else {
            ViewManager.restoreShell();
        }

        // 2. Delegate view activation to ViewManager
        let viewId = path.replace('/', '') || 'home';
        if (path === '/personality-test') {
            viewId = 'personality-test';
        }
        ViewManager.activateView(viewId);

        // 3. Execute registered route handler (module mounting/controllers)
        if (this.routes[path]) {
            this.routes[path]();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

export default Router;
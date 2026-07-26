// assets/js/router/router.js
import personalityPage from '../pages/personality.page.js';
import { initPersonalityTest } from '../personality/personality-test.js';

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

        this.register('/personality', () => {
            this.restoreGlobalLayout();
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
            this.restoreGlobalLayout();
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
            this.restoreGlobalLayout();
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

    restoreGlobalLayout() {
        const header = document.querySelector('.site-header');
        if (header) header.style.display = '';

        const footer = document.querySelector('.footer-match');
        if (footer) footer.style.display = '';

        if (this.rootContainer) {
            this.rootContainer.style.padding = '';
            this.rootContainer.style.margin = '';
            this.rootContainer.style.maxWidth = '';
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

        // 1. Nonaktifkan semua view terlebih dahulu
        document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active-view'));

        // 2. Tentukan view ID secara presisi berdasar rute terisolasi
        let viewId = path.replace('/', '') || 'home';
        if (path === '/personality-test') {
            viewId = 'personality-test';
        }

        const targetView = document.getElementById(`view-${viewId}`);
        if (targetView) {
            targetView.classList.add('active-view');
        } else {
            const homeView = document.getElementById('view-home');
            if (homeView) {
                homeView.classList.add('active-view');
            }
        }

        // 3. Panggil handler rute terdaftar
        if (this.routes[path]) {
            this.routes[path]();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

export default Router;
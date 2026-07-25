/**
 * @file router.js
 * @description Single source of truth client-side router managing route dispatching and layout isolation.
 * @module Router/Core
 */

import personalityPage from '../pages/personality.page.js';
import { initPersonalityTest } from '../personality/personality-test.js';

export const Router = {
    routes: {},
    rootContainer: null,

    init(container) {
        this.rootContainer = container;
        
        this.register('/personality', (container) => {
            this.restoreGlobalLayout();
            personalityPage.mount(container);
        });

        this.register('/personality-test', () => {
            this.isolateQuizLayout();
            const container = Router.rootContainer;
            container.innerHTML = `
                <div id="personality-quiz-app" style="width:100%; min-height:80vh; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                    <div id="personality-test" style="width:100%; max-width:860px;"></div>
                </div>
            `;
            initPersonalityTest();
        });

        window.addEventListener('hashchange', () => this.handleRouting());
        this.handleRouting();
    },

    register(path, handler) {
        this.routes[path] = handler;
    },

    isolateQuizLayout() {
        document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active-view'));
        const header = document.querySelector('.site-header');
        if (header) header.style.display = 'none';

        const footer = document.querySelector('.footer-match');
        if (footer) footer.style.display = 'none';
        
        if (this.rootContainer) {
            this.rootContainer.style.padding = '0';
            this.rootContainer.style.margin = '0';
            this.rootContainer.style.maxWidth = '100%';
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
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

        if (!this.rootContainer) return;

        if (path !== '/personality-test') {
            this.restoreGlobalLayout();
        }

        if (this.routes[path]) {
            document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active-view'));
            this.routes[path](this.rootContainer);
            if (path !== '/personality-test') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            return;
        }

        const viewId = path.replace('/', '') || 'home';
        const targetView = document.getElementById(`view-${viewId}`);
        
        if (targetView) {
            document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active-view'));
            targetView.classList.add('active-view');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
};

export default Router;
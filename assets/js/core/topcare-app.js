// assets/js/core/topcare-app.js
import { Router } from '../router/router.js';
import { CoachController } from '../coach/coach.js';
import { MobileMenu } from './mobile-menu.js';

export const TopCareApp = {
    initialized: false,

    start() {
        if (this.initialized) {
            return;
        }

        const rootContainer = document.getElementById('main-content');
        if (!rootContainer) {
            return;
        }

        // 1. Initialize mobile menu interaction layer
        MobileMenu.init();

        // 2. Initialize Router core system
        Router.init(rootContainer);

        // 3. Bind Homepage AI Coach controller automatically if container exists
        const coachContainer = document.getElementById('topcare-ai-coach-container');
        if (coachContainer) {
            CoachController.init(coachContainer);
        }

        this.initialized = true;
    }
};

export default TopCareApp;
// assets/js/core/topcare-app.js
import { Router } from '../router/router.js';
import { CoachFrontendExperience } from '../coach/ui/coach-frontend-experience.js';

export const TopCareApp = {
    initialized: false,

    start() {
        if (this.initialized) {
            return;
        }
        this.initialized = true;

        this.initializeConfiguration();
        this.initializeRouter();
        this.initializeCoach();
    },

    initializeConfiguration() {
        // Core configuration setup
    },

    initializeRouter() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            Router.init(mainContent);
        }
    },

    initializeCoach() {
        try {
            const container = document.getElementById('topcare-ai-coach-container');
            if (container) {
                CoachFrontendExperience.start(container);
            }
        } catch (error) {
            console.error("Failed to initialize Coach:", error);
        }
    }
};

export default TopCareApp;
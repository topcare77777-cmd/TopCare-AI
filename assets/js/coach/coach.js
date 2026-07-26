// assets/js/coach/coach.js
import { CoachFrontendExperience } from './ui/coach-frontend-experience.js';

export const CoachController = {
    initialized: false,
    container: null,

    init(container) {
        if (this.initialized) {
            return;
        }
        this.container = container || document.getElementById('topcare-ai-coach-container');
        if (!this.container) {
            return;
        }

        this.initialized = true;
        try {
            CoachFrontendExperience.start(this.container);
        } catch (error) {
            console.error("Failed to initialize AI Coach controller:", error);
        }
    },

    destroy() {
        if (!this.initialized) {
            return;
        }
        try {
            if (typeof CoachFrontendExperience.destroy === 'function') {
                CoachFrontendExperience.destroy();
            }
        } catch (error) {
            console.error("Failed to destroy AI Coach controller:", error);
        }
        this.initialized = false;
        this.container = null;
    }
};

export default CoachController;
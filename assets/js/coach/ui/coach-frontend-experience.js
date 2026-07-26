// assets/js/coach/ui/coach-frontend-experience.js
import { CoachWidget } from './coach-widget.js';

export const CoachFrontendExperience = {
    initialized: false,
    container: null,

    start(container) {
        if (this.initialized) {
            return;
        }
        this.container = container || document.getElementById('topcare-ai-coach-container');
        if (!this.container) {
            return;
        }
        this.initialized = true;

        try {
            // Delegate real UI rendering back to the original CoachWidget subsystem
            if (typeof CoachWidget.render === 'function') {
                CoachWidget.render(this.container);
            } else if (typeof CoachWidget.init === 'function') {
                CoachWidget.init(this.container);
            }
        } catch (error) {
            console.error("Failed to render AI Coach widget UI:", error);
        }
    },

    destroy() {
        if (!this.initialized) {
            return;
        }
        try {
            if (typeof CoachWidget.destroy === 'function') {
                CoachWidget.destroy();
            } else if (this.container) {
                this.container.innerHTML = '';
            }
        } catch (error) {
            console.error("Failed to destroy AI Coach widget UI:", error);
        }
        this.initialized = false;
        this.container = null;
    }
};

export default CoachFrontendExperience;
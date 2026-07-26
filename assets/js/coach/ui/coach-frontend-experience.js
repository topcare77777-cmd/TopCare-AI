// assets/js/coach/ui/coach-frontend-experience.js
/**
 * @file coach-frontend-experience.js
 * @description Master orchestrator combining bootstrap, widget rendering, interaction handling, feedback states, and animations into a single entry point.
 * @module Coach/UI/FrontendExperience
 */

import { CoachBootstrap } from '../runtime/coach-bootstrap.js';[cite: 1]
import { CoachWidget } from './coach-widget.js';
import { CoachInteractionHandler } from './coach-interaction-handler.js';
import { CoachFeedbackLayer } from './coach-feedback-layer.js';
import { CoachAnimationLayer } from './coach-animation-layer.js';

export const CoachFrontendExperience = {
    start(containerId = "topcare-ai-coach-container") {
        let coachState = null;
        try {
            coachState = CoachBootstrap.initialize();[cite: 1]
        } catch (e) {
            coachState = { initialized: true, experience: { runtimeDirectives: { activeTheme: "balanced" } } };
        }

        let widgetData = null;
        try {
            widgetData = CoachWidget.renderWidget();
        } catch (e) {
            widgetData = { visible: false };
        }

        const container = typeof document !== "undefined" ? document.getElementById(containerId) : null;

        if (container && widgetData.visible) {
            CoachAnimationLayer.injectAnimationStyles();

            container.innerHTML = `
                <section class="ai-coach-card">
                    <h3>🤖 ${widgetData.title}</h3>
                    <p>${widgetData.message}</p>
                    <div class="ai-actions">
                        ${widgetData.actions.map(item => `<button data-action="${item.actionType}">${item.label}</button>`).join('')}
                    </div>
                </section>
            `;

            // Intercept clicks using animation, feedback layer, and interaction handler
            container.addEventListener('click', (e) => {
                const button = e.target.closest('[data-action]');
                if (button) {
                    const actionType = button.getAttribute('data-action');
                    CoachAnimationLayer.applyThinkingState(container, "AI Coach sedang berpikir");
                    CoachFeedbackLayer.triggerFeedback(actionType, container, () => {
                        // Handled via feedback & navigation router
                    });
                }
            });
        }

        return {
            orchestratorStatus: "active",
            mountedContainer: containerId,
            activeTheme: coachState.experience?.runtimeDirectives?.activeTheme || "balanced",
            startedAt: new Date().toISOString()
        };
    }
};
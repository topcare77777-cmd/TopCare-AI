// assets/js/coach/ui/coach-feedback-layer.js
/**
 * @file coach-feedback-layer.js
 * @description Manages intermediate UI state feedback and loading states during user interactions with the AI Coach widget.
 * @module Coach/UI/FeedbackLayer
 */

import { CoachInteractionHandler } from './coach-interaction-handler.js';

export const CoachFeedbackLayer = {
    triggerFeedback(actionType, widgetContainerElement, callback) {
        const type = actionType || "UNKNOWN_ACTION";
        let feedbackMessage = "Memproses permintaan Anda...";

        switch (type) {
            case "OPEN_CHAT":
                feedbackMessage = "AI Coach sedang menyiapkan jawaban...";
                break;
            case "VIEW_INSIGHT":
                feedbackMessage = "Menganalisis pola belajar Anda...";
                break;
            case "VIEW_PROGRESS":
                feedbackMessage = "Memuat perjalanan belajar...";
                break;
            default:
                feedbackMessage = "Memproses...";
                break;
        }

        // Render temporary loading feedback inside widget if container is provided
        if (widgetContainerElement) {
            const messageParagraph = widgetContainerElement.querySelector('p');
            if (messageParagraph) {
                messageParagraph.textContent = feedbackMessage;
                messageParagraph.style.color = "#60a5fa";
            }
        }

        // Slight delay to allow user to perceive the feedback before handling the action route
        setTimeout(() => {
            const interactionResult = CoachInteractionHandler.handleAction(type);
            if (typeof callback === 'function') {
                callback(interactionResult);
            }
        }, 600);

        return {
            actionType: type,
            feedbackMessage: feedbackMessage,
            status: "pending_transition",
            generatedAt: new Date().toISOString()
        };
    }
};
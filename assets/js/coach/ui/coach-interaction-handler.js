// assets/js/coach/ui/coach-interaction-handler.js
/**
 * @file coach-interaction-handler.js
 * @description Handles user interaction events triggered from the AI Coach widget, routing actions to appropriate platform views.
 * @module Coach/UI/InteractionHandler
 */

import { CoachRuntimeGateway } from '../runtime/coach-runtime-gateway.js';

export const CoachInteractionHandler = {
    handleAction(actionType, eventContext = null) {
        const type = actionType || "UNKNOWN_ACTION";
        let gatewayData = null;

        try {
            gatewayData = CoachRuntimeGateway.getFrontendExperience();
        } catch (e) {
            gatewayData = { gatewayStatus: "fallback" };
        }

        let routeTarget = "#/home";
        let responseMessage = "Memproses permintaan Anda...";

        switch (type) {
            case "OPEN_CHAT":
                routeTarget = "#/learning";
                responseMessage = "Membuka sesi tanya jawab AI Coach...";
                break;
            case "VIEW_INSIGHT":
                routeTarget = "#/personality";
                responseMessage = "Menyiapkan insight kepribadian dan analisis...";
                break;
            case "VIEW_PROGRESS":
                routeTarget = "#/profile";
                responseMessage = "Memuat data progres pembelajaran Anda...";
                break;
            default:
                routeTarget = "#/home";
                responseMessage = "Aksi tidak dikenali.";
                break;
        }

        // Execute navigation if hash router is supported
        if (typeof window !== "undefined" && routeTarget) {
            window.location.hash = routeTarget;
        }

        return {
            actionType: type,
            status: "success",
            payload: {
                targetRoute: routeTarget,
                message: responseMessage,
                gatewaySnapshot: gatewayData
            },
            triggeredAt: new Date().toISOString()
        };
    },

    bindWidgetEvents(containerElement) {
        if (!containerElement) return;

        containerElement.addEventListener('click', (e) => {
            const button = e.target.closest('[data-action]');
            if (button) {
                const actionType = button.getAttribute('data-action');
                this.handleAction(actionType, e);
            }
        });
    }
};
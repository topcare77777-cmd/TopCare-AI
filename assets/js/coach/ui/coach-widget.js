// assets/js/coach/ui/coach-widget.js
/**
 * @file coach-widget.js
 * @description Renders a lightweight, fast, and mobile-friendly AI Coach widget for the Home Page.
 * @module Coach/UI/Widget
 */

import { CoachRuntimeGateway } from '../runtime/coach-runtime-gateway.js';

export const CoachWidget = {
    renderWidget(userPersonality = null, deviceProfile = null) {
        let gatewayData = null;
        try {
            gatewayData = CoachRuntimeGateway.getFrontendExperience(userPersonality, deviceProfile);
        } catch (e) {
            gatewayData = {
                runtimeDirectives: {
                    activeTheme: "balanced",
                    deviceMode: "desktop"
                }
            };
        }

        const theme = gatewayData.runtimeDirectives?.activeTheme || "balanced";
        const deviceMode = gatewayData.runtimeDirectives?.deviceMode || "desktop";

        let welcomeMessage = "Halo 👋 Saya siap membantu Anda";
        if (theme === "koleris") {
            welcomeMessage = "Halo 🚀 Mari capai target Anda hari ini.";
        } else if (theme === "sanguinis") {
            welcomeMessage = "Halo ✨ Semangat baru untuk hari yang menyenangkan!";
        } else if (theme === "melankolis") {
            welcomeMessage = "Halo 📊 Mari tinjau data dan progres Anda secara terstruktur.";
        } else if (theme === "plegmatis") {
            welcomeMessage = "Halo ☕ Mari jalani hari dengan santai dan terarah.";
        }

        const actions = [
            { label: "Tanya AI", actionType: "OPEN_CHAT" },
            { label: "Insight", actionType: "VIEW_INSIGHT" },
            { label: "Progress", actionType: "VIEW_PROGRESS" }
        ];

        return {
            visible: true,
            title: "TopCare AI Coach",
            message: welcomeMessage,
            actions: actions,
            layoutHint: deviceMode === "mobile" ? "compact_card" : "standard_widget",
            generatedAt: new Date().toISOString()
        };
    }
};
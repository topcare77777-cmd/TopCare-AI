// assets/js/coach/ui/coach-widget.js
/**
 * @file coach-widget.js
 * @description Renders a lightweight, fast, and mobile-friendly AI Coach widget for the Home Page and manages DOM rendering ownership using enterprise CSS classes.
 * @module Coach/UI/Widget
 * @status UPDATED (BUILD 138.7 — TEXT-TO-SPEECH TRIGGER INTEGRATION)
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
    },

    render(container, userPersonality = null, deviceProfile = null) {
        if (!container) return;

        const data = this.renderWidget(userPersonality, deviceProfile);

        const actionsHtml = data.actions.map(action => `
            <button class="coach-button" data-action="${action.actionType}" data-coming-soon="true" disabled>
                ${action.label}
            </button>
        `).join('');

        container.innerHTML = `
            <div class="coach-widget">
                <div class="coach-header">
                    <div class="coach-title-group">
                        <div class="coach-online"></div>
                        <span class="coach-title">${data.title}</span>
                    </div>
                    <span class="coach-badge-online">Online</span>
                </div>
                <div class="coach-message">
                    <p>${data.message}</p>
                </div>
                <div class="coach-actions">
                    ${actionsHtml}
                </div>
            </div>
        `;

        // TRIGGER SUARA: Membaca pesan sapaan secara otomatis setelah UI dirender
        if (window.CoachVoiceService && typeof window.CoachVoiceService.speak === 'function') {
            // Memberikan jeda waktu (delay) sangat singkat agar DOM selesai merender sebelum API Suara dipanggil
            setTimeout(() => {
                window.CoachVoiceService.speak(data.message);
            }, 300);
        }
    }
};

export default CoachWidget;
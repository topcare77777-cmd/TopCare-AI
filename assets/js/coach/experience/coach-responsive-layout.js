// assets/js/coach/experience/coach-responsive-layout.js
/**
 * @file coach-responsive-layout.js
 * @description Resolves responsive layout configurations, component visibility, and spacing rules based on detected device characteristics.
 * @module Coach/Experience/ResponsiveLayout
 */

import { CoachDeviceDetector } from './coach-device-detector.js';

export const CoachResponsiveLayout = {
    resolveLayout(deviceProfile = null) {
        let profile = deviceProfile;
        if (!profile || typeof profile !== 'object') {
            try {
                profile = CoachDeviceDetector.detectDevice();
            } catch (e) {
                profile = { deviceType: "desktop", touchEnabled: false };
            }
        }

        const deviceType = profile.deviceType || "desktop";
        const touchEnabled = profile.touchEnabled || false;

        let layoutMode = "desktop";
        let components = {
            sidebar: true,
            chatPanel: true,
            toolPanel: true
        };
        let spacing = "expanded";
        let interaction = "pointer";

        if (deviceType === "mobile") {
            layoutMode = "mobile";
            components = {
                sidebar: false,
                chatPanel: true,
                toolPanel: false
            };
            spacing = "compact";
            interaction = touchEnabled ? "touch" : "pointer";
        } else if (deviceType === "tablet") {
            layoutMode = "tablet";
            components = {
                sidebar: true,
                chatPanel: true,
                toolPanel: false
            };
            spacing = "comfortable";
            interaction = touchEnabled ? "touch" : "hybrid";
        } else {
            layoutMode = "desktop";
            components = {
                sidebar: true,
                chatPanel: true,
                toolPanel: true
            };
            spacing = "expanded";
            interaction = "pointer";
        }

        return {
            layoutMode: layoutMode,
            components: components,
            spacing: spacing,
            interaction: interaction,
            generatedAt: new Date().toISOString()
        };
    }
};
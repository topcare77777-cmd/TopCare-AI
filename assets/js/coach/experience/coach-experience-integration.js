// assets/js/coach/experience/coach-experience-integration.js
/**
 * @file coach-experience-integration.js
 * @description Single experience integration facade combining device detection, responsive layout, touch adapter, and screen optimization into a unified profile.
 * @module Coach/Experience/ExperienceIntegration
 */

import { CoachDeviceDetector } from './coach-device-detector.js';
import { CoachResponsiveLayout } from './coach-responsive-layout.js';
import { CoachTouchAdapter } from './coach-touch-adapter.js';
import { CoachScreenOptimizer } from './coach-screen-optimizer.js';

export const CoachExperienceIntegration = {
    getDeviceProfile() {
        let deviceData = {};
        try {
            deviceData = CoachDeviceDetector.detectDevice();
        } catch (e) {
            deviceData = { deviceType: "desktop", screenWidth: 1024, screenHeight: 768, orientation: "landscape", touchEnabled: false };
        }

        let layoutData = {};
        try {
            layoutData = CoachResponsiveLayout.resolveLayout(deviceData);
        } catch (e) {
            layoutData = { layoutMode: "desktop", components: { sidebar: true, chatPanel: true, toolPanel: true }, spacing: "expanded", interaction: "pointer" };
        }

        let touchData = {};
        try {
            touchData = CoachTouchAdapter.resolveTouchConfig(deviceData);
        } catch (e) {
            touchData = { inputMode: "pointer", touchOptimization: { largeTargets: false, gestureSupport: false, keyboardAware: false }, accessibility: { enabled: true } };
        }

        let screenData = {};
        try {
            screenData = CoachScreenOptimizer.optimizeScreen(deviceData);
        } catch (e) {
            screenData = { viewport: { width: 1024, height: 768 }, scaling: { fontScale: "medium", density: "normal" }, orientation: { mode: "landscape" }, safeArea: { enabled: false }, keyboardAdjustment: { enabled: false } };
        }

        const experienceMode = deviceData.deviceType || "desktop";

        return {
            device: deviceData,
            layout: layoutData,
            touch: touchData,
            screen: screenData,
            experienceMode: experienceMode,
            generatedAt: new Date().toISOString()
        };
    }
};
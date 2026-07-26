// assets/js/coach/experience/coach-screen-optimizer.js
/**
 * @file coach-screen-optimizer.js
 * @description Manages viewport scaling, dynamic font adjustments, screen density, orientation awareness, and safe-area constraints.
 * @module Coach/Experience/ScreenOptimizer
 */

import { CoachDeviceDetector } from './coach-device-detector.js';

export const CoachScreenOptimizer = {
    optimizeScreen(deviceProfile = null) {
        let profile = deviceProfile;
        if (!profile || typeof profile !== 'object') {
            try {
                profile = CoachDeviceDetector.detectDevice();
            } catch (e) {
                profile = { screenWidth: 1024, screenHeight: 768, orientation: "landscape", deviceType: "desktop" };
            }
        }

        const width = profile.screenWidth || 1024;
        const height = profile.screenHeight || 768;
        const orientationMode = profile.orientation || (height > width ? "portrait" : "landscape");
        const deviceType = profile.deviceType || "desktop";

        let fontScale = "medium";
        let density = "normal";

        if (width < 480) {
            fontScale = "small";
            density = "compact";
        } else if (width >= 480 && width < 768) {
            fontScale = "medium";
            density = "normal";
        } else if (width >= 768 && width < 1200) {
            fontScale = "medium";
            density = "spacious";
        } else {
            fontScale = "large";
            density = "spacious";
        }

        const safeAreaEnabled = deviceType === "mobile";
        const keyboardAdjustmentEnabled = deviceType === "mobile";

        return {
            viewport: {
                width: width,
                height: height
            },
            scaling: {
                fontScale: fontScale,
                density: density
            },
            orientation: {
                mode: orientationMode
            },
            safeArea: {
                enabled: safeAreaEnabled
            },
            keyboardAdjustment: {
                enabled: keyboardAdjustmentEnabled
            },
            generatedAt: new Date().toISOString()
        };
    }
};
// assets/js/coach/experience/coach-touch-adapter.js
/**
 * @file coach-touch-adapter.js
 * @description Provides touch optimization rules, gesture support mapping, and mobile keyboard awareness configurations.
 * @module Coach/Experience/TouchAdapter
 */

import { CoachDeviceDetector } from './coach-device-detector.js';

export const CoachTouchAdapter = {
    resolveTouchConfig(deviceProfile = null) {
        let profile = deviceProfile;
        if (!profile || typeof profile !== 'object') {
            try {
                profile = CoachDeviceDetector.detectDevice();
            } catch (e) {
                profile = { touchEnabled: false, deviceType: "desktop" };
            }
        }

        const touchEnabled = profile.touchEnabled || false;
        const deviceType = profile.deviceType || "desktop";

        let inputMode = "pointer";
        let largeTargets = false;
        let gestureSupport = false;
        let keyboardAware = false;

        if (touchEnabled || deviceType === "mobile" || deviceType === "tablet") {
            inputMode = touchEnabled ? "touch" : "hybrid";
            largeTargets = true;
            gestureSupport = true;
            keyboardAware = deviceType === "mobile";
        }

        return {
            inputMode: inputMode,
            touchOptimization: {
                largeTargets: largeTargets,
                gestureSupport: gestureSupport,
                keyboardAware: keyboardAware
            },
            accessibility: {
                enabled: true
            },
            generatedAt: new Date().toISOString()
        };
    }
};
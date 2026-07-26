// assets/js/coach/experience/coach-device-detector.js
/**
 * @file coach-device-detector.js
 * @description Detects device type, screen dimensions, orientation, and touch capability for cross-device adaptation.
 * @module Coach/Experience/DeviceDetector
 */

export const CoachDeviceDetector = {
    detectDevice() {
        const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

        const screenWidth = isBrowser ? window.innerWidth : 1024;
        const screenHeight = isBrowser ? window.innerHeight : 768;

        let deviceType = "desktop";
        if (screenWidth < 768) {
            deviceType = "mobile";
        } else if (screenWidth >= 768 && screenWidth < 1024) {
            deviceType = "tablet";
        }

        const orientation = screenHeight > screenWidth ? "portrait" : "landscape";

        const touchEnabled = isBrowser ? (
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0)
        ) : false;

        return {
            deviceType: deviceType,
            screenWidth: screenWidth,
            screenHeight: screenHeight,
            orientation: orientation,
            touchEnabled: touchEnabled,
            detectedAt: new Date().toISOString()
        };
    }
};
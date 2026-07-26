// assets/js/coach/notification/coach-notification-bootstrap.js
/**
 * @file coach-notification-bootstrap.js
 * @description Initialization orchestrator ensuring deterministic boot order for the notification system and EventBus integration.
 * @module Coach/Notification/Bootstrap
 */

import { CoachNotificationEngine } from './coach-notification-engine.js';
import { CoachNotificationEvents } from './coach-notification-events.js';
import { CoachNotificationToast } from './coach-notification-toast.js';

export const CoachNotificationBootstrap = {
    isInitialized: false,

    init() {
        if (this.isInitialized) return true;

        try {
            // 1. Initialize Storage & Engine State
            CoachNotificationEngine.initialize();

            // 2. Initialize Event Bridge
            CoachNotificationEvents.initialize();

            // 3. Initialize Transient UI (Toast)
            CoachNotificationToast.initialize();

            this.isInitialized = true;
            return true;
        } catch (e) {
            console.error("Failed to initialize Coach Notification System:", e);
            return false;
        }
    }
};
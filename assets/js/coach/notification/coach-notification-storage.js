// assets/js/coach/notification/coach-notification-storage.js
/**
 * @file coach-notification-storage.js
 * @description LocalStorage persistence layer for AI Coach notifications.
 * @module Coach/Notification/Storage
 */

const NOTIFICATION_STORAGE_KEY = "topcare-ai-notifications-v1";
const MAX_STORED_NOTIFICATIONS = 50;

export const CoachNotificationStorage = {
    load() {
        try {
            const raw = localStorage.getItem(NOTIFICATION_STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error("Failed to load notification storage:", e);
            return [];
        }
    },

    save(notifications) {
        try {
            const trimmed = Array.isArray(notifications) 
                ? notifications.slice(0, MAX_STORED_NOTIFICATIONS) 
                : [];
            localStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(trimmed));
            return true;
        } catch (e) {
            console.error("Failed to save notification storage:", e);
            return false;
        }
    },

    clear() {
        try {
            localStorage.removeItem(NOTIFICATION_STORAGE_KEY);
            return true;
        } catch (e) {
            console.error("Failed to clear notification storage:", e);
            return false;
        }
    }
};
// assets/js/coach/notification/coach-notification-engine.js
/**
 * @file coach-notification-engine.js
 * @description Core notification business logic managing notification creation, read status, and storage synchronization.
 * @module Coach/Notification/Engine
 */

import { CoachNotificationStorage } from './coach-notification-storage.js';

let notifications = [];

export const CoachNotificationEngine = {
    initialize() {
        notifications = CoachNotificationStorage.load();
        return true;
    },

    getAll() {
        return [...notifications];
    },

    getUnread() {
        return notifications.filter(n => !n.read);
    },

    getUnreadCount() {
        return notifications.filter(n => !n.read).length;
    },

    add(notification) {
        const newEntry = {
            id: 'notif_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9),
            title: notification.title || 'Informasi',
            message: notification.message || '',
            type: notification.type || 'info', // 'info', 'success', 'achievement', 'reminder'
            read: false,
            createdAt: new Date().toISOString(),
            metadata: notification.meta || {}
        };

        notifications.unshift(newEntry);
        CoachNotificationStorage.save(notifications);
        return newEntry;
    },

    markAsRead(id) {
        let updated = false;
        notifications = notifications.map(n => {
            if (n.id === id && !n.read) {
                updated = true;
                return { ...n, read: true };
            }
            return n;
        });

        if (updated) {
            CoachNotificationStorage.save(notifications);
        }
        return updated;
    },

    markAllAsRead() {
        let updated = false;
        notifications = notifications.map(n => {
            if (!n.read) {
                updated = true;
                return { ...n, read: true };
            }
            return n;
        });

        if (updated) {
            CoachNotificationStorage.save(notifications);
        }
        return updated;
    },

    remove(id) {
        const initialLength = notifications.length;
        notifications = notifications.filter(n => n.id !== id);
        
        if (notifications.length !== initialLength) {
            CoachNotificationStorage.save(notifications);
            return true;
        }
        return false;
    },

    clearAll() {
        notifications = [];
        CoachNotificationStorage.clear();
        return true;
    }
};
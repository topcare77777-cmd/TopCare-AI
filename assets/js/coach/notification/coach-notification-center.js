// assets/js/coach/notification/coach-notification-center.js
/**
 * @file coach-notification-center.js
 * @description Persistent UI component and presentation controller for viewing, filtering, marking, and clearing notifications via the notification engine.
 * @module Coach/Notification/Center
 */

import { CoachNotificationEngine } from './coach-notification-engine.js';
import { CoachEventBus } from '../coach-event-bus.js';

export const CoachNotificationCenter = {
    containerElement: null,

    initialize(containerElement) {
        if (!containerElement) return false;
        this.containerElement = containerElement;
        this.render();
        this.registerEventListeners();
        return true;
    },

    registerEventListeners() {
        // Optional real-time refresh if new notifications arrive
        CoachEventBus.on('coach:notification:created', () => {
            this.refresh();
        });
    },

    render() {
        if (!this.containerElement) return;

        const notifications = CoachNotificationEngine.getAll();
        const unreadCount = CoachNotificationEngine.getUnreadCount();

        let itemsHtml = '';
        if (notifications.length === 0) {
            itemsHtml = `
                <div class="text-center text-muted py-4">
                    <span class="fs-2 d-block mb-2">📭</span>
                    <p class="mb-0">Tidak ada notifikasi saat ini.</p>
                </div>
            `;
        } else {
            itemsHtml = notifications.map(notif => {
                let badgeClass = 'bg-secondary';
                let icon = '📢';

                switch (notif.type) {
                    case 'success':
                        badgeClass = 'bg-success';
                        icon = '✅';
                        break;
                    case 'achievement':
                        badgeClass = 'bg-warning text-dark';
                        icon = '🏆';
                        break;
                    case 'reminder':
                        badgeClass = 'bg-info text-dark';
                        icon = '⏰';
                        break;
                    case 'info':
                    default:
                        badgeClass = 'bg-primary';
                        icon = 'ℹ️';
                        break;
                }

                const timeString = notif.createdAt ? new Date(notif.createdAt).toLocaleString() : 'Waktu tidak tersedia';

                return `
                    <div class="list-group-item list-group-item-action d-flex align-items-start justify-content-between py-3 ${notif.read ? 'bg-light text-muted' : 'bg-white fw-bold border-start border-4 border-primary'}" data-id="${notif.id}">
                        <div class="me-3 fs-4">${icon}</div>
                        <div class="flex-grow-1 me-3">
                            <div class="d-flex w-100 justify-content-between mb-1">
                                <h6 class="mb-1 ${notif.read ? 'text-secondary' : 'text-dark'}">${notif.title}</h6>
                                <small class="text-muted" style="font-size: 0.75rem;">${timeString}</small>
                            </div>
                            <p class="mb-1 small ${notif.read ? 'text-muted' : 'text-secondary'} fw-normal">${notif.message}</p>
                        </div>
                        <div class="d-flex flex-column align-items-end gap-1">
                            ${!notif.read ? `<button type="button" class="btn btn-sm btn-outline-primary py-0 px-2 mark-read-btn" data-id="${notif.id}" style="font-size: 0.75rem;">Baca</button>` : '<span class="badge bg-secondary bg-opacity-2_5 text-muted small" style="font-size: 0.65rem;">Dibaca</span>'}
                            <button type="button" class="btn btn-sm btn-outline-danger py-0 px-2 remove-btn mt-1" data-id="${notif.id}" style="font-size: 0.75rem;" title="Hapus">×</button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        this.containerElement.innerHTML = `
            <div class="card shadow-sm border-0 coach-notification-center">
                <div class="card-header bg-white d-flex justify-content-between align-items-center py-3">
                    <div class="d-flex align-items-center">
                        <h5 class="mb-0 fw-bold me-2">Pusat Notifikasi</h5>
                        <span class="badge bg-primary">${unreadCount} Belum Dibaca</span>
                    </div>
                    <div class="btn-group btn-group-sm">
                        <button type="button" class="btn btn-outline-secondary" id="coach-mark-all-read-btn" ${unreadCount === 0 ? 'disabled' : ''}>Tandai Semua Dibaca</button>
                        <button type="button" class="btn btn-outline-danger" id="coach-clear-all-btn" ${notifications.length === 0 ? 'disabled' : ''}>Hapus Semua</button>
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="list-group list-group-flush" style="max-height: 400px; overflow-y: auto;">
                        ${itemsHtml}
                    </div>
                </div>
            </div>
        `;

        this.bindActions();
    },

    bindActions() {
        if (!this.containerElement) return;

        // Mark single as read
        this.containerElement.querySelectorAll('.mark-read-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                if (id) {
                    CoachNotificationEngine.markAsRead(id);
                    this.refresh();
                }
            });
        });

        // Remove single notification
        this.containerElement.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                if (id) {
                    CoachNotificationEngine.remove(id);
                    this.refresh();
                }
            });
        });

        // Mark all as read
        const markAllBtn = this.containerElement.querySelector('#coach-mark-all-read-btn');
        if (markAllBtn) {
            markAllBtn.addEventListener('click', () => {
                CoachNotificationEngine.markAllAsRead();
                this.refresh();
            });
        }

        // Clear all notifications
        const clearAllBtn = this.containerElement.querySelector('#coach-clear-all-btn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                CoachNotificationEngine.clearAll();
                this.refresh();
            });
        }
    },

    refresh() {
        this.render();
    }
};
// assets/js/coach/coach-activity-timeline.js
/**
 * @file coach-activity-timeline.js
 * @description Presentational UI component that renders a chronological activity timeline based on aggregated analytics and engine state without side effects.
 * @module Coach/ActivityTimeline
 */

import { CoachAnalytics } from './coach-analytics.js';

export const CoachActivityTimeline = {
    async renderTimeline(containerElement) {
        if (!containerElement) return false;

        const stats = CoachAnalytics.getStats();

        // Constructing a structured timeline view model from aggregated stats
        const activities = [];

        if (stats.lastActivity) {
            activities.push({
                icon: '🕒',
                title: 'Aktivitas Terakhir',
                description: 'Interaksi terakhir tercatat pada sistem AI Coach.',
                timestamp: stats.lastActivity
            });
        }

        if (stats.programsCompleted > 0) {
            activities.push({
                icon: '🎓',
                title: 'Program Selesai',
                description: `Menyelesaikan ${stats.programsCompleted} program pembelajaran.`,
                timestamp: stats.lastActivity
            });
        }

        if (stats.achievementsUnlocked > 0) {
            activities.push({
                icon: '🏆',
                title: 'Pencapaian Terbuka',
                description: `Berhasil membuka ${stats.achievementsUnlocked} lencana penghargaan.`,
                timestamp: stats.lastActivity
            });
        }

        if (stats.voiceSessions > 0) {
            activities.push({
                icon: '🔊',
                title: 'Sesi Suara',
                description: `Menggunakan Voice Coach sebanyak ${stats.voiceSessions} kali.`,
                timestamp: stats.lastActivity
            });
        }

        if (stats.lessonsCompleted > 0) {
            activities.push({
                icon: '✅',
                title: 'Pelajaran Selesai',
                description: `Menyelesaikan total ${stats.lessonsCompleted} pelajaran.`,
                timestamp: stats.lastActivity
            });
        }

        if (stats.lessonsOpened > 0) {
            activities.push({
                icon: '📖',
                title: 'Pelajaran Dibuka',
                description: `Mengakses ${stats.lessonsOpened} pelajaran pembelajaran.`,
                timestamp: stats.lastActivity
            });
        }

        let itemsHtml = '';
        if (activities.length === 0) {
            itemsHtml = `<div class="text-center text-muted py-3">Belum ada riwayat aktivitas tercatat.</div>`;
        } else {
            itemsHtml = activities.map(act => `
                <div class="d-flex align-items-start mb-3 pb-3 border-bottom last-border-0">
                    <div class="me-3 fs-4">
                        ${act.icon}
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-1 fw-bold text-dark">${act.title}</h6>
                        <p class="mb-1 small text-secondary">${act.description}</p>
                        <small class="text-muted" style="font-size: 0.75rem;">
                            ${act.timestamp ? new Date(act.timestamp).toLocaleString() : 'Waktu tidak tersedia'}
                        </small>
                    </div>
                </div>
            `).join('');
        }

        containerElement.innerHTML = `
            <div class="coach-activity-timeline card p-4 mb-4 shadow-sm border-0">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h5 class="mb-1 fw-bold">Riwayat Aktivitas</h5>
                        <p class="text-muted small mb-0">Catatan kronologis perjalanan pembelajaran Anda.</p>
                    </div>
                </div>

                <div class="timeline-list mt-2">
                    ${itemsHtml}
                </div>
            </div>
        `;

        return true;
    }
};
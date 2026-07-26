// assets/js/coach/coach-achievement-panel.js
/**
 * @file coach-achievement-panel.js
 * @description Presentational UI component that renders the full achievement catalog (unlocked and locked) via CoachDashboard or CoachAchievement.
 * @module Coach/AchievementPanel
 */

import { CoachAchievement } from './coach-achievement.js';

export const CoachAchievementPanel = {
    async renderPanel(containerElement) {
        if (!containerElement) return false;

        // Fetching achievements catalog and status safely via CoachAchievement read-only interface
        const achievements = CoachAchievement.getAll();
        const unlockedCount = achievements.filter(a => a.unlocked).length;
        const totalCount = achievements.length;
        const percentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

        let itemsHtml = '';
        if (achievements.length === 0) {
            itemsHtml = `<div class="text-center text-muted py-3">Belum ada data pencapaian tersedia.</div>`;
        } else {
            itemsHtml = achievements.map(ach => `
                <div class="d-flex align-items-center p-3 mb-2 border rounded ${ach.unlocked ? 'bg-white border-success border-opacity-25 shadow-sm' : 'bg-light border-opacity-50 text-muted'}">
                    <div class="me-3 fs-3">
                        ${ach.unlocked ? '🏆' : '🔒'}
                    </div>
                    <div class="flex-grow-1">
                        <h6 class="mb-1 fw-bold ${ach.unlocked ? 'text-dark' : 'text-secondary'}">${ach.title}</h6>
                        <p class="mb-0 small text-secondary">${ach.description}</p>
                    </div>
                    <div>
                        <span class="badge ${ach.unlocked ? 'bg-success' : 'bg-secondary bg-opacity-25 text-dark'}">
                            ${ach.unlocked ? 'Terbuka' : 'Terkunci'}
                        </span>
                    </div>
                </div>
            `).join('');
        }

        containerElement.innerHTML = `
            <div class="coach-achievement-panel card p-4 mb-4 shadow-sm border-0">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h5 class="mb-1 fw-bold">Pencapaian & Badge</h5>
                        <p class="text-muted small mb-0">Selesaikan misi pembelajaran untuk membuka lencana baru.</p>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-primary fs-6">${unlockedCount} / ${totalCount} (${percentage}%)</span>
                    </div>
                </div>

                <div class="progress mb-3" style="height: 6px;">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${percentage}%;" aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <div class="achievement-list mt-2">
                    ${itemsHtml}
                </div>
            </div>
        `;

        return true;
    }
};
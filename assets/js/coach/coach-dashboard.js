// assets/js/coach/coach-dashboard.js
/**
 * @file coach-dashboard.js
 * @description Dashboard aggregation engine combining progress, analytics, achievements, and profile stats for UI rendering via dedicated ViewModel templates.
 * @module Coach/Dashboard
 */

import { CoachPersonality } from './coach-personality.js';
import { CoachProgressEngine } from './coach-progress-engine.js';
import { CoachAchievement } from './coach-achievement.js';
import { CoachAnalytics } from './coach-analytics.js';

export const CoachDashboard = {
    async getDashboardData() {
        const profile = CoachPersonality.getProfile();
        const progress = await CoachProgressEngine.load(profile.primary);
        const achievements = CoachAchievement.getAll();
        const analytics = CoachAnalytics.getStats();

        const rawTotal = Number(progress.totalLessons);
        const totalLessons = rawTotal > 0 ? rawTotal : 1;

        const completedCount = Number(progress.completedLessonsCount) || 0;
        const progressPercentage = Math.round((completedCount / totalLessons) * 100);

        const unlockedAchievements = achievements.filter(a => a.unlocked);

        return {
            profile: {
                userName: profile.userName || "Sahabat TopCare",
                primary: profile.primary || "Umum",
                secondary: profile.secondary || "",
                ageGroup: profile.ageGroup || ""
            },
            progress: {
                currentLessonIndex: progress.currentLessonIndex,
                completedLessonsCount: completedCount,
                totalLessons: totalLessons,
                percentage: progressPercentage,
                lastUpdated: progress.lastUpdated
            },
            achievements: {
                total: achievements.length,
                unlockedCount: unlockedAchievements.length,
                items: unlockedAchievements
            },
            analytics: {
                lessonsOpened: analytics.lessonsOpened,
                lessonsCompleted: analytics.lessonsCompleted,
                voiceSessions: analytics.voiceSessions,
                programsCompleted: analytics.programsCompleted,
                lastActivity: analytics.lastActivity
            }
        };
    },

    render(viewModel) {
        return `
            <div class="coach-dashboard-summary card p-4 mb-4 shadow-sm">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 class="mb-1">Halo, ${viewModel.profile.userName}</h4>
                        <p class="text-muted mb-0">Tipe Kepribadian: <strong>${viewModel.profile.primary}</strong> ${viewModel.profile.secondary ? `(${viewModel.profile.secondary})` : ''}</p>
                    </div>
                    <div class="text-end">
                        <span class="badge bg-primary fs-6">${viewModel.progress.percentage}% Selesai</span>
                    </div>
                </div>

                <div class="progress mb-3" style="height: 10px;">
                    <div class="progress-bar bg-success" role="progressbar" style="width: ${viewModel.progress.percentage}%;" aria-valuenow="${viewModel.progress.percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <div class="row text-center g-2 pt-2 border-top">
                    <div class="col-4">
                        <div class="p-2 border rounded bg-light">
                            <span class="d-block text-muted small">Pelajaran</span>
                            <strong class="fs-5">${viewModel.progress.completedLessonsCount}/${viewModel.progress.totalLessons}</strong>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="p-2 border rounded bg-light">
                            <span class="d-block text-muted small">Pencapaian</span>
                            <strong class="fs-5">${viewModel.achievements.unlockedCount}/${viewModel.achievements.total}</strong>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="p-2 border rounded bg-light">
                            <span class="d-block text-muted small">Sesi Suara</span>
                            <strong class="fs-5">${viewModel.analytics.voiceSessions}</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    async renderDashboardSummary(containerElement) {
        if (!containerElement) return false;

        const viewModel = await this.getDashboardData();
        containerElement.innerHTML = this.render(viewModel);

        return true;
    }
};
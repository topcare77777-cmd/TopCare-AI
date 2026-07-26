// assets/js/coach/coach-export.js
/**
 * @file coach-export.js
 * @description Read-only report builder and local file exporter for AI Coach progress, achievements, analytics, and personality profiles.
 * @module Coach/Export
 */

import { CoachPersonality } from './coach-personality.js';
import { CoachProgressEngine } from './coach-progress-engine.js';
import { CoachAchievement } from './coach-achievement.js';
import { CoachAnalytics } from './coach-analytics.js';

export const CoachExport = {
    initialize() {
        // Read-only initialization hook if needed
        return true;
    },

    async buildReport() {
        const profile = CoachPersonality.getProfile();
        const progress = await CoachProgressEngine.load(profile.primary);
        const achievements = CoachAchievement.getAll();
        const analytics = CoachAnalytics.getStats();

        return {
            generatedAt: new Date().toISOString(),
            profile: {
                userName: profile.userName || "Sahabat TopCare",
                primary: profile.primary || "",
                secondary: profile.secondary || "",
                ageGroup: profile.ageGroup || ""
            },
            progress: {
                currentLessonIndex: progress.currentLessonIndex,
                completedLessonsCount: progress.completedLessonsCount,
                totalLessons: progress.totalLessons,
                lastUpdated: progress.lastUpdated
            },
            achievements: achievements.map(a => ({
                id: a.id,
                title: a.title,
                description: a.description,
                unlocked: a.unlocked
            })),
            analytics: { ...analytics }
        };
    },

    async exportJSON() {
        const report = await this.buildReport();
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
        this._downloadFile(dataStr, `ai-coach-report-${new Date().toISOString().slice(0, 10)}.json`);
        return true;
    },

    async exportText() {
        const report = await this.buildReport();

        let text = `=== LAPORAN PROGRES AI COACH ===\n`;
        text += `Tanggal: ${new Date(report.generatedAt).toLocaleString()}\n\n`;

        text += `[PROFIL KEPRIBADIAN]\n`;
        text += `- Nama: ${report.profile.userName}\n`;
        text += `- Tipe Primer: ${report.profile.primary}\n`;
        text += `- Tipe Sekunder: ${report.profile.secondary}\n`;
        text += `- Kelompok Usia: ${report.profile.ageGroup}\n\n`;

        text += `[PROGRES PEMBELAJARAN]\n`;
        text += `- Pelajaran Selesai: ${report.progress.completedLessonsCount} dari ${report.progress.totalLessons}\n`;
        text += `- Indeks Saat Ini: ${report.progress.currentLessonIndex}\n`;
        text += `- Terakhir Diperbarui: ${report.progress.lastUpdated}\n\n`;

        text += `[PENCAPAIAN (${report.achievements.filter(a => a.unlocked).length}/${report.achievements.length})]\n`;
        report.achievements.forEach(a => {
            text += `- [${a.unlocked ? 'X' : ' '}] ${a.title}: ${a.description}\n`;
        });
        text += `\n`;

        text += `[STATISTIK ANALITIK]\n`;
        text += `- Pelajaran Dibuka: ${report.analytics.lessonsOpened}\n`;
        text += `- Pelajaran Selesai: ${report.analytics.lessonsCompleted}\n`;
        text += `- Sesi Voice Coach: ${report.analytics.voiceSessions}\n`;
        text += `- Pencapaian Terbuka: ${report.analytics.achievementsUnlocked}\n`;
        text += `- Program Selesai: ${report.analytics.programsCompleted}\n`;

        const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
        this._downloadFile(dataStr, `ai-coach-report-${new Date().toISOString().slice(0, 10)}.txt`);
        return true;
    },

    _downloadFile(dataUri, filename) {
        if (typeof document === 'undefined') return;
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataUri);
        downloadAnchor.setAttribute("download", filename);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
    }
};
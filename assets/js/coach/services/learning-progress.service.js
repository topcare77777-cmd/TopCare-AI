/**
 * TOPCARE AI PLATFORM V2 — LEARNING PROGRESS SERVICE
 * Path: assets/js/coach/services/learning-progress.service.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Dynamic reader for AI Academy User Learning Progress.
 */

export class LearningProgressService {
    static getProgress() {
        try {
            const raw = sessionStorage.getItem('tc_v2_learning_progress');
            if (!raw) return this.getDefaults();
            return JSON.parse(raw);
        } catch (e) {
            return this.getDefaults();
        }
    }

    static getDefaults() {
        return {
            academyProgressPercent: 0,
            currentLevel: 'Level 1 Dasar',
            completedModulesCount: 0,
            totalModulesCount: 12
        };
    }
}

export default LearningProgressService;
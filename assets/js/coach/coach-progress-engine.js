// assets/js/coach/coach-progress-engine.js
/**
 * @file coach-progress-engine.js
 * @description Centralized progress management engine handling lesson index state, persistence, and progression rules.
 * @module Coach/ProgressEngine
 */

import { CoachStorage } from './coach-storage.js';
import { CoachLessonEngine } from './coach-lesson-engine.js';

export const CoachProgressEngine = {
    async load(primaryType) {
        const rawProgress = CoachStorage.loadProgress();
        const totalLessons = await CoachLessonEngine.getLessonCount(primaryType);

        if (!rawProgress) {
            return this.reset(totalLessons);
        }

        return {
            currentLessonIndex: typeof rawProgress.currentLessonIndex === 'number' ? rawProgress.currentLessonIndex : 0,
            completedLessonsCount: typeof rawProgress.completedLessonsCount === 'number' ? rawProgress.completedLessonsCount : 0,
            totalLessons: totalLessons > 0 ? totalLessons : (rawProgress.totalLessons || 5),
            lastUpdated: rawProgress.lastUpdated || new Date().toISOString()
        };
    },

    save(progressState) {
        const payload = {
            currentLessonIndex: progressState.currentLessonIndex,
            completedLessonsCount: progressState.completedLessonsCount,
            totalLessons: progressState.totalLessons,
            lastUpdated: new Date().toISOString()
        };
        return CoachStorage.saveProgress(payload);
    },

    reset(totalLessons = 5) {
        const freshProgress = {
            currentLessonIndex: 0,
            completedLessonsCount: 0,
            totalLessons: totalLessons,
            lastUpdated: new Date().toISOString()
        };
        this.save(freshProgress);
        return freshProgress;
    },

    async next(primaryType) {
        let progress = await this.load(primaryType);
        const total = progress.totalLessons;

        if (progress.currentLessonIndex < total - 1) {
            progress.currentLessonIndex += 1;
            progress.completedLessonsCount = Math.max(progress.completedLessonsCount, progress.currentLessonIndex);
        } else {
            progress.completedLessonsCount = total;
        }

        this.save(progress);
        return progress;
    },

    async isCompleted(primaryType) {
        const progress = await this.load(primaryType);
        return progress.currentLessonIndex >= progress.totalLessons - 1 && progress.completedLessonsCount >= progress.totalLessons;
    },

    async getPercentage(primaryType) {
        const progress = await this.load(primaryType);
        if (progress.totalLessons <= 0) return 0;
        return Math.round(((progress.currentLessonIndex + 1) / progress.totalLessons) * 100);
    },

    async getCurrentLesson(primaryType) {
        const progress = await this.load(primaryType);
        return await CoachLessonEngine.getLesson(primaryType, progress.currentLessonIndex);
    }
};
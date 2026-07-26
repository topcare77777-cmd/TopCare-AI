// assets/js/coach/coach-page.js
/**
 * @file coach-page.js
 * @description Controller managing route navigation flow between Home and Lesson views dynamically using CoachLessonEngine.
 * @module Coach/Page
 */

import { CoachPersonality } from './coach-personality.js';
import { CoachRenderer } from './coach-renderer.js';
import { CoachStorage } from './coach-storage.js';
import { CoachLessonEngine } from './coach-lesson-engine.js';

export const CoachPage = {
    async render(containerElement, routeSubPath = '') {
        try {
            if (!containerElement) return;

            const profile = CoachPersonality.getProfile();

            if (!profile.hasAssessment) {
                containerElement.innerHTML = CoachRenderer.renderEmptyState();
                return;
            }

            const progress = CoachStorage.loadProgress() || { currentLessonIndex: 0, totalLessons: 5 };
            const isLessonRoute = routeSubPath === 'lesson';

            if (isLessonRoute) {
                const lessonData = await CoachLessonEngine.getLesson(profile.primary, progress.currentLessonIndex);
                containerElement.innerHTML = CoachRenderer.renderLesson(profile, lessonData, progress);
            } else {
                const totalLessons = await CoachLessonEngine.getLessonCount(profile.primary);
                progress.totalLessons = totalLessons;
                containerElement.innerHTML = CoachRenderer.renderHome(profile, progress);
            }
        } catch (error) {
            console.error("Critical error in CoachPage controller:", error);
            if (containerElement) {
                containerElement.innerHTML = CoachRenderer.renderErrorState("Gagal Memuat AI Coach");
            }
        }
    }
};
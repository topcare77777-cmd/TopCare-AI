// assets/js/coach/coach-page.js
/**
 * @file coach-page.js
 * @description Controller managing route navigation flow using CoachLessonEngine and CoachProgressEngine with synchronized totalLessons state persistence.
 * @module Coach/Page
 */

import { CoachPersonality } from './coach-personality.js';
import { CoachRenderer } from './coach-renderer.js';
import { CoachProgressEngine } from './coach-progress-engine.js';
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

            const totalLessons = await CoachLessonEngine.getLessonCount(profile.primary);
            const progress = await CoachProgressEngine.load(profile.primary);

            if (progress.totalLessons !== totalLessons) {
                progress.totalLessons = totalLessons;
                CoachProgressEngine.save(progress);
            }

            const isLessonRoute = routeSubPath === 'lesson';

            if (isLessonRoute) {
                const lessonData = await CoachProgressEngine.getCurrentLesson(profile.primary);
                containerElement.innerHTML = CoachRenderer.renderLesson(profile, lessonData, progress);

                const completeButton = containerElement.querySelector('[data-action="complete-lesson"]');
                if (completeButton) {
                    completeButton.addEventListener('click', async () => {
                        await CoachProgressEngine.next(profile.primary);
                        window.location.hash = '#/coach';
                    });
                }
            } else {
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
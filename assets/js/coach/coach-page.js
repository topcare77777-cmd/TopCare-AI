// assets/js/coach/coach-page.js
/**
 * @file coach-page.js
 * @description Controller managing route navigation flow integrating lesson, progress, completion, and recommendation engines.
 * @module Coach/Page
 */

import { CoachPersonality } from './coach-personality.js';
import { CoachRenderer } from './coach-renderer.js';
import { CoachProgressEngine } from './coach-progress-engine.js';
import { CoachLessonEngine } from './coach-lesson-engine.js';
import { CoachCompletion } from './coach-completion.js';
import { CoachRecommendation } from './coach-recommendation.js';

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

            const isCompleted = await CoachCompletion.checkCompletion(profile.primary);
            const isLessonRoute = routeSubPath === 'lesson';

            if (isCompleted && !isLessonRoute) {
                const summary = CoachRecommendation.getSummary(profile.primary);
                const recommendations = CoachRecommendation.getRecommendations(profile.primary);
                
                containerElement.innerHTML = `
                    <div class="coach-container section">
                        <div class="container-sm coach-shell text-center">
                            <h2>🎉 Program Selesai</h2>
                            <p>${summary}</p>
                            <div class="coach-recommendation-box" style="text-align: left; margin: 2rem 0; padding: 1.5rem; background: var(--bg-card, #f8fafc); border-radius: 12px; border: 1px solid var(--border-color, #e2e8f0);">
                                <h3>Rangkah Lanjutan Pengembangan</h3>
                                <ul style="margin-top: 1rem; padding-left: 1.25rem;">
                                    ${recommendations.map(rec => `<li style="margin-bottom: 0.75rem;">${rec}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="test-actions">
                                <a href="#/coach" class="btn btn-secondary" data-action="reset-progress">Ulangi dari Awal</a>
                                <a href="#/personality" class="btn btn-primary">Ulangi Tes Kepribadian</a>
                            </div>
                        </div>
                    </div>
                `;

                const resetButton = containerElement.querySelector('[data-action="reset-progress"]');
                if (resetButton) {
                    resetButton.addEventListener('click', async (e) => {
                        e.preventDefault();
                        CoachProgressEngine.reset(totalLessons);
                        window.location.hash = '#/coach';
                    });
                }
                return;
            }

            if (isLessonRoute) {
                if (isCompleted) {
                    window.location.hash = '#/coach';
                    return;
                }
                const lessonData = await CoachProgressEngine.getCurrentLesson(profile.primary);
                containerElement.innerHTML = CoachRenderer.renderLesson(profile, lessonData, progress);

                const completeButton = containerElement.querySelector('[data-action="complete-lesson"]');
                if (completeButton) {
                    completeButton.addEventListener('click', async () => {
                        await CoachCompletion.markCompletedAndGetNext(profile.primary);
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
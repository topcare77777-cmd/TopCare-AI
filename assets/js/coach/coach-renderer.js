/**
 * TOPCARE AI PLATFORM V2 — COACH RENDERER & DOM PATCHER
 * Path: assets/js/coach/coach.renderer.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Assembles templates, patches DOM, and attaches Image Fallback listeners.
 */

import CoachMemory from './coach.memory.js';
import RecommendationResolver from './services/recommendation.resolver.js';
import LearningProgressService from './services/learning-progress.service.js';
import CoachTemplates from './templates/coach.templates.js';

export const CoachRenderer = {
    renderCard() {
        const memory = CoachMemory.getMemory();

        if (!memory.hasAssessed) {
            return CoachTemplates.unassessedCard();
        }

        const progress = LearningProgressService.getProgress();
        const recommendations = RecommendationResolver.resolveByPersonality(memory.dominantPersonality);

        const viewData = {
            userName: memory.userName,
            dominantPersonality: memory.dominantPersonality,
            secondaryPersonality: memory.secondaryPersonality,
            currentLevel: progress.currentLevel,
            academyProgressPercent: progress.academyProgressPercent,
            recommendations: recommendations
        };

        return CoachTemplates.activeCompanionCard(viewData);
    },

    attachImageFallbacks(container) {
        if (!container) return;
        const images = container.querySelectorAll('img[data-fallback]');
        images.forEach(img => {
            img.onerror = () => {
                const fallback = img.getAttribute('data-fallback');
                if (fallback && img.src !== fallback) {
                    img.src = fallback;
                }
            };
        });
    }
};

export default CoachRenderer;
/**
 * TOPCARE AI PLATFORM V2 — RECOMMENDATION RESOLVER SERVICE
 * Path: assets/js/coach/services/recommendation.resolver.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Resolves multi-domain recommendations based on User Personality DTO.
 */

import { PERSONALITY_RECOMMENDATIONS_MANIFEST } from '../data/recommendation.manifest.js';

export class RecommendationResolver {
    static resolveByPersonality(dominantPersonality) {
        const key = dominantPersonality && PERSONALITY_RECOMMENDATIONS_MANIFEST[dominantPersonality]
            ? dominantPersonality
            : 'Melankolis';

        const manifest = PERSONALITY_RECOMMENDATIONS_MANIFEST[key];

        return {
            temperament: key,
            insights: manifest.insights,
            studyStyle: manifest.studyStyle,
            recommendedPath: manifest.recommendedPath,
            nextLevel: manifest.nextLevel,
            academyModules: manifest.academyModules || [],
            prompts: manifest.prompts || [],
            tools: manifest.tools || []
        };
    }
}

export default RecommendationResolver;
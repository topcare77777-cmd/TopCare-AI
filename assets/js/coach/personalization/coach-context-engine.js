// assets/js/coach/personalization/coach-context-engine.js
/**
 * @file coach-context-engine.js
 * @description Core business logic for managing user personalization context, reading baseline data via safe adapters, and updating local preferences.
 * @module Coach/Personalization/Engine
 */

import { CoachContextStorage } from './coach-context-storage.js';
import { CoachContextModel } from './coach-context-model.js';
import { CoachProgressEngine } from '../coach-progress-engine.js';
import { CoachAchievement } from '../coach-achievement.js';
import { CoachAnalytics } from '../coach-analytics.js';

let currentContext = null;

export const CoachContextEngine = {
    initialize() {
        const stored = CoachContextStorage.load();
        if (stored && CoachContextModel.validate(stored)) {
            currentContext = stored;
        } else {
            currentContext = CoachContextModel.createDefault();
            CoachContextStorage.save(currentContext);
        }
        return true;
    },

    getContext() {
        if (!currentContext) {
            this.initialize();
        }
        return { ...currentContext };
    },

    updatePreferences(newPreferences) {
        if (!currentContext) {
            this.initialize();
        }

        currentContext.preferences = {
            ...currentContext.preferences,
            ...newPreferences
        };
        currentContext.updatedAt = new Date().toISOString();

        CoachContextStorage.save(currentContext);
        return { ...currentContext.preferences };
    },

    updateProfileAttributes(newAttributes) {
        if (!currentContext) {
            this.initialize();
        }

        currentContext.profileAttributes = {
            ...currentContext.profileAttributes,
            ...newAttributes
        };
        currentContext.updatedAt = new Date().toISOString();

        CoachContextStorage.save(currentContext);
        return { ...currentContext.profileAttributes };
    },

    getAggregatedUserProfile() {
        // Safe read-only adapters avoiding strict dependency on unverified engine method signatures
        let progressData = null;
        try {
            if (typeof CoachProgressEngine.getProgress === 'function') {
                progressData = CoachProgressEngine.getProgress();
            } else if (typeof CoachProgressEngine.load === 'function') {
                // Fallback adapter pattern if load requires primary profile
                progressData = CoachProgressEngine.load();
            }
        } catch (e) {
            progressData = null;
        }

        let achievementsCount = 0;
        try {
            if (typeof CoachAchievement.getAll === 'function') {
                achievementsCount = CoachAchievement.getAll().filter(a => a.unlocked).length;
            }
        } catch (e) {
            achievementsCount = 0;
        }

        let stats = null;
        try {
            if (typeof CoachAnalytics.getStats === 'function') {
                stats = CoachAnalytics.getStats();
            }
        } catch (e) {
            stats = null;
        }

        return {
            context: this.getContext(),
            aggregatedStats: {
                progress: progressData,
                achievementsUnlocked: achievementsCount,
                analyticsStats: stats
            }
        };
    },

    reset() {
        currentContext = CoachContextModel.createDefault();
        CoachContextStorage.save(currentContext);
        return true;
    }
};
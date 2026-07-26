// assets/js/coach/coach-storage.js
/**
 * @file coach-storage.js
 * @description Persistence layer and contract adapter for AI Coach supporting direct progress payload structures.
 * @module Coach/Storage
 */

import { PersonalityStorage } from '../personality/personality-storage.js';

const COACH_STORAGE_KEY = "topcare-ai-coach-v1";

export const CoachStorage = {
    loadProgress() {
        try {
            const raw = localStorage.getItem(COACH_STORAGE_KEY);
            if (!raw) return null;
            return JSON.parse(raw);
        } catch (e) {
            console.error("Failed to load coach progress:", e);
            return null;
        }
    },

    saveProgress(progress) {
        try {
            const payload = {
                currentLessonIndex: progress.currentLessonIndex,
                completedLessonsCount: progress.completedLessonsCount,
                totalLessons: progress.totalLessons,
                lastUpdated: progress.lastUpdated || new Date().toISOString()
            };
            localStorage.setItem(COACH_STORAGE_KEY, JSON.stringify(payload));
            return true;
        } catch (e) {
            console.error("Failed to save coach progress:", e);
            return false;
        }
    },

    getAssessmentData() {
        try {
            const raw = PersonalityStorage.load();
            if (!raw) {
                return {
                    userName: "Sahabat TopCare",
                    ageGroup: "",
                    primary: "",
                    secondary: "",
                    report: null,
                    hasAssessment: false
                };
            }

            const userName = raw.userName || "Sahabat TopCare";
            const ageGroup = raw.ageGroup || "";
            const report = raw.report || null;

            let primary = "";
            let secondary = "";

            if (report && typeof report === 'object') {
                primary = report.primary || raw.primary || "";
                secondary = report.secondary || raw.secondary || "";
            } else {
                primary = raw.primary || "";
                secondary = raw.secondary || "";
            }

            const hasAssessment = Boolean(
                report !== null &&
                typeof report === "object" &&
                !!report.primary
            );

            return {
                userName,
                ageGroup,
                primary,
                secondary,
                report,
                hasAssessment
            };
        } catch (e) {
            console.error("Failed to retrieve and normalize assessment data:", e);
            return {
                userName: "Sahabat TopCare",
                ageGroup: "",
                primary: "",
                secondary: "",
                report: null,
                hasAssessment: false
            };
        }
    }
};
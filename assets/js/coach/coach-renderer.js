// assets/js/coach/coach-renderer.js
/**
 * @file coach-renderer.js
 * @description Central rendering layer responsible for clean data normalization and passing progress across views.
 * @module Coach/Renderer
 */

import { CoachUI } from './coach-ui.js';

export const CoachRenderer = {
    normalizeProfile(profile) {
        const safeProfile = profile && typeof profile === 'object' ? profile : {};
        const rawReport = safeProfile.report && typeof safeProfile.report === 'object' ? safeProfile.report : {};

        const defaultPrimaryMeta = {
            icon: '⭐',
            color: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            summary: 'Profil temperamen standar.',
            title: ''
        };

        const defaultSecondaryMeta = {
            summary: 'Profil sekunder seimbang.'
        };

        const primary = safeProfile.primary || rawReport.primary || '';
        const secondary = safeProfile.secondary || rawReport.secondary || '';

        const primaryMeta = {
            ...defaultPrimaryMeta,
            ...(rawReport.primaryMeta || {})
        };

        const secondaryMeta = {
            ...defaultSecondaryMeta,
            ...(rawReport.secondaryMeta || {})
        };

        const report = {
            ...rawReport,
            primary,
            secondary,
            primaryMeta,
            secondaryMeta
        };

        return {
            name: safeProfile.name || 'Sahabat TopCare',
            ageGroup: safeProfile.ageGroup || '',
            primary,
            secondary,
            hasAssessment: Boolean(safeProfile.hasAssessment && primary),
            report
        };
    },

    renderHome(profile, progressData) {
        const normalized = this.normalizeProfile(profile);
        const safeProgress = progressData && typeof progressData === 'object' ? progressData : { currentLessonIndex: 0, totalLessons: 5 };
        return CoachUI.renderHome(normalized, safeProgress);
    },

    renderLesson(profile, lessonData, progressData) {
        const normalized = this.normalizeProfile(profile);
        const safeLesson = lessonData && typeof lessonData === 'object' ? lessonData : {};
        const safeProgress = progressData && typeof progressData === 'object' ? progressData : { currentLessonIndex: 0, totalLessons: 5 };
        return CoachUI.renderLesson(normalized, safeLesson, safeProgress);
    },

    renderHeader(profile) {
        const normalized = this.normalizeProfile(profile);
        return CoachUI.renderHeader(normalized);
    },

    renderProgress(progressData) {
        const safeProgress = progressData && typeof progressData === 'object' ? progressData : { currentLessonIndex: 0, totalLessons: 5 };
        return CoachUI.renderProgress(safeProgress);
    },

    renderEmptyState() {
        return CoachUI.renderEmptyState();
    },

    renderErrorState(errorMessage) {
        const message = errorMessage || 'Gagal Memuat AI Coach';
        return CoachUI.renderErrorState(message);
    }
};
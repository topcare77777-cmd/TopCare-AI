// assets/js/coach/coach-personality.js
/**
 * @file coach-personality.js
 * @description Enterprise user profile adapter guaranteeing a canonical normalized schema.
 * @module Coach/Personality
 */

import { CoachStorage } from './coach-storage.js';

export const CoachPersonality = {
    getProfile() {
        const assessment = CoachStorage.getAssessmentData();
        const rawReport = assessment.report && typeof assessment.report === 'object' ? assessment.report : {};

        const defaultPrimaryMeta = {
            icon: '⭐',
            color: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
            summary: 'Profil temperamen standar.',
            title: 'Koleris'
        };

        const defaultSecondaryMeta = {
            summary: 'Profil sekunder seimbang.'
        };

        const primary = assessment.primary || rawReport.primary || 'Koleris';
        const secondary = assessment.secondary || rawReport.secondary || 'Plegmatis';

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
            name: assessment.userName || 'Sahabat TopCare',
            ageGroup: assessment.ageGroup || '',
            primary,
            secondary,
            hasAssessment: assessment.hasAssessment,
            report
        };
    }
};
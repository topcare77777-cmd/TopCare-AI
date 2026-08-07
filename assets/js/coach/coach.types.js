/**
 * TOPCARE AI PLATFORM V2 — COACH TYPES & CONTRACTS
 * Path: assets/js/coach/coach.types.js
 * Status: ACTIVE - SPRINT 1A CANONICAL RELEASE
 * Role: Immutable DTOs & Metadata Registry for AI Coach Subsystem
 */

export const COACH_STORAGE_KEY = 'topcare.coach.selectedId';

export const COACH_REGISTRY = Object.freeze({
    ALEX: Object.freeze({
        id: 'alex',
        gender: 'male',
        label: 'Coach Alex',
        subtitle: 'Mentor Analitis',
        description: 'Fokus pada struktur, data, logika, dan penyelesaian masalah secara sistematis.',
       avatar: 'assets/images/optimized-v3/coaches/coach-placeholder.webp'
    }),
    MAYA: Object.freeze({
        id: 'maya',
        gender: 'female',
        label: 'Coach Maya',
        subtitle: 'Mentor Empatis',
        description: 'Fokus pada motivasi, dukungan emosional, komunikasi hangat, dan pengembangan diri.',
        avatar: 'assets/images/optimized-v3/coaches/coach-placeholder.webp'
    })
});

export const COACH_EVENTS = Object.freeze({
    OPEN: 'coach:open',
    CLOSE: 'coach:close',
    SELECT: 'coach:select'
});

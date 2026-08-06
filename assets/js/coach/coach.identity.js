/**
 * TOPCARE AI PLATFORM V2 — UNIFIED COACH IDENTITY (SSOT)
 * Path: assets/js/coach/coach.identity.js
 * Status: APPROVED & LOCKED (BUILD 128.0)
 * SRP: Unified Identity DTO for Coach TopCare AI.
 */

import AssetsRegistry from '../core/registries/assets.registry.js';

export const COACH_IDENTITY = Object.freeze({
    id: 'coach-topcare-ai',
    name: 'Coach TopCare AI',
    title: 'AI Personality Companion & Learning Guide',
    avatar: AssetsRegistry.images.coach?.avatar || 'assets/images/features/feature-learning.svg',
    fallbackAvatar: 'assets/images/features/feature-learning.svg',
    welcomeMessage: 'Halo! Saya Coach TopCare AI. Pendamping pribadi Anda untuk mengenali potensi kepribadian dan menguasai dunia AI.',
    version: '2.0.0-Golden'
});

export default COACH_IDENTITY;
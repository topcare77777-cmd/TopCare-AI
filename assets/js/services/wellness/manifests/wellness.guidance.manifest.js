/**
 * TOPCARE AI PLATFORM V2 — WELLNESS GUIDANCE CAPABILITY MANIFEST
 * Path: assets/js/services/wellness/manifests/wellness.guidance.manifest.js
 * Status: ACTIVE (BUILD 126.1)
 */

import { deepFreezeDTO } from '../../../core/utils/dto.js';

export const WellnessGuidanceManifest = deepFreezeDTO({
    id: 'wellness.guidance',
    version: '1.0.0',
    displayName: 'Pendampingan Wellness & Mental',
    description: 'Panduan reflektif pengelolaan stres, keseimbangan emosional, dan kesehatan holistik.',
    category: 'SKILL',
    intents: ['WELLNESS_GUIDANCE', 'MENTAL_WELLNESS', 'STRESS_MANAGEMENT'],
    permissions: ['capability:wellness:read'],
    tags: ['wellness', 'mindfulness', 'mental-health', 'empathy'],
    uiMetadata: {
        outputWidget: 'reflective-card',
        icon: '🌱',
        themeColor: '#10B981'
    }
});

export default WellnessGuidanceManifest;
/**
 * TOPCARE AI PLATFORM V2 — PERSONALITY ANALYSIS CAPABILITY MANIFEST
 * Path: assets/js/services/capability/manifests/personality.analysis.manifest.js
 * Status: ACTIVE (BUILD 126.1)
 */

import { deepFreezeDTO } from '../../../core/utils/dto.js';

export const PersonalityAnalysisManifest = deepFreezeDTO({
    id: 'personality.analysis',
    version: '1.0.0',
    displayName: 'Analisis Mendalam Kepribadian',
    description: 'Analisis komprehensif dinamika temperamen Koleris, Sanguinis, Melankolis, dan Plegmatis.',
    category: 'SKILL',
    intents: ['PERSONALITY_ANALYSIS', 'ANALYZE_PERSONALITY', 'PROFILE_INSIGHT'],
    permissions: ['capability:personality:read'],
    tags: ['personality', 'analysis', 'profile', 'behavior'],
    uiMetadata: {
        outputWidget: 'personality-profile-card',
        icon: '📊',
        themeColor: '#A855F7'
    }
});

export default PersonalityAnalysisManifest;
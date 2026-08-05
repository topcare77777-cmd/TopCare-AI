/**
 * TOPCARE AI PLATFORM V2 — CAREER MAPPING CAPABILITY MANIFEST
 * Path: assets/js/services/capability/manifests/career.mapping.manifest.js
 * Status: ACTIVE (BUILD 126.1)
 */

import { deepFreezeDTO } from '../../../core/utils/dto.js';

export const CareerMappingManifest = deepFreezeDTO({
    id: 'career.mapping',
    version: '1.0.0',
    displayName: 'Bimbingan Karir & Kepemimpinan',
    description: 'Pemetaan karir strategis, asesmen kepemimpinan, dan optimasi potensi profesional.',
    category: 'SKILL',
    intents: ['CAREER_MAPPING', 'CAREER_ADVICE', 'LEADERSHIP_COACHING'],
    permissions: ['capability:career:read'],
    tags: ['career', 'leadership', 'professional', 'executive'],
    uiMetadata: {
        outputWidget: 'career-roadmap-card',
        icon: '💼',
        themeColor: '#F59E0B'
    }
});

export default CareerMappingManifest;
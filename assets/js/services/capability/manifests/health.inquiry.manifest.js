/**
 * TOPCARE AI PLATFORM V2 — HEALTH INQUIRY CAPABILITY MANIFEST
 * Path: assets/js/services/capability/manifests/health.inquiry.manifest.js
 * Status: ACTIVE (BUILD 126.1)
 */

import { deepFreezeDTO } from '../../../core/utils/dto.js';

export const HealthInquiryManifest = deepFreezeDTO({
    id: 'health.inquiry',
    version: '1.0.0',
    displayName: 'Konsultasi Klinis & Nutrisi',
    description: 'Layanan konsultasi klinis dasar, analisis pola nutrisi, dan indikator vital fisik.',
    category: 'SKILL',
    intents: ['HEALTH_INQUIRY', 'CLINICAL_CONSULT', 'NUTRITION_ADVICE'],
    permissions: ['capability:health:read'],
    tags: ['health', 'clinical', 'nutrition', 'vitality'],
    uiMetadata: {
        outputWidget: 'health-metrics-card',
        icon: '🩺',
        themeColor: '#3B82F6'
    }
});

export default HealthInquiryManifest;
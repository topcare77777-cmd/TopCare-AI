/**
 * TOPCARE AI PLATFORM V2 — PERSONALITY TEST CAPABILITY MANIFEST
 * Path: assets/js/services/capability/manifests/personality.test.manifest.js
 * Status: ACTIVE (BUILD 126.1)
 */

import { deepFreezeDTO } from '../../../core/utils/dto.js';

export const PersonalityTestManifest = deepFreezeDTO({
    id: 'personality.test',
    version: '1.0.0',
    displayName: 'Tes & Evaluasi Kepribadian',
    description: 'Fasilitas evaluasi dan asesmen empat temperamen utama serta indikator kepribadian pengguna.',
    category: 'SKILL',
    intents: ['PERSONALITY_TEST', 'TEST_PERSONALITY', 'ASSESSMENT'],
    permissions: ['capability:personality:read'],
    tags: ['personality', 'assessment', 'temperament', 'psychology'],
    uiMetadata: {
        outputWidget: 'personality-test-widget',
        icon: '🧠',
        themeColor: '#8B5CF6'
    }
});

export default PersonalityTestManifest;
/**
 * TOPCARE AI PLATFORM V2 — STRATEGIC PLANNING CAPABILITY MANIFEST
 * Path: assets/js/services/planning/manifests/strategic.planning.manifest.js
 * Status: ACTIVE (BUILD 126.1)
 */

import { deepFreezeDTO } from '../../../core/utils/dto.js';

export const StrategicPlanningManifest = deepFreezeDTO({
    id: 'strategic.planning',
    version: '1.0.0',
    displayName: 'Perencanaan Aksi & Target Strategis',
    description: 'Penyusunan rencana aksi terstruktur, roadmap pencapaian target, dan eksekusi jadwal.',
    category: 'SKILL',
    intents: ['STRATEGIC_PLANNING', 'ACTION_PLAN', 'ROADMAP_GENERATE'],
    permissions: ['capability:planning:write'],
    tags: ['planning', 'action-plan', 'roadmap', 'schedule'],
    uiMetadata: {
        outputWidget: 'action-plan-card',
        icon: '🎯',
        themeColor: '#EF4444'
    }
});

export default StrategicPlanningManifest;
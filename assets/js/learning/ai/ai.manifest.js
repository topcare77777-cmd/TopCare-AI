/**
 * TOPCARE AI PLATFORM V2 — AI LEARNING DOMAIN MANIFEST
 * Path: assets/js/learning/ai/ai.manifest.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Central Single Source of Truth Registry for AI Learning Levels.
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const AI_MANIFEST = deepFreezeDTO({
    id: 'ai-learning-domain',
    name: 'Artificial Intelligence Learning',
    defaultLevel: 'basic',
    levels: [
        {
            id: 'basic',
            name: 'Level Dasar',
            badge: 'Aktif',
            active: true,
            moduleCount: 3,
            description: 'Fondasi utama kecerdasan buatan, Machine Learning dasar, serta etika & privasi.'
        },
        {
            id: 'intermediate',
            name: 'Level Menengah',
            badge: 'Segera Hadir',
            active: false,
            moduleCount: 4,
            description: 'Deep Learning, Large Language Models (LLM), Generative AI, dan Prompt Engineering.'
        },
        {
            id: 'advanced',
            name: 'Level Mahir',
            badge: 'Segera Hadir',
            active: false,
            moduleCount: 4,
            description: 'Penerapan AI untuk produktivitas profesional, strategi bisnis, dan penelitian akademik.'
        }
    ]
});

export default AI_MANIFEST;
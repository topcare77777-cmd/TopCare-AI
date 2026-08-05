/**
 * TOPCARE AI PLATFORM V2 — AI LEARNING: LEVEL DASAR
 * Path: assets/js/learning/ai/ai.dasar.data.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Immutable SSOT for Basic Level AI Modules.
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const AI_DASAR_MODULES = deepFreezeDTO([
    {
        id: 'ai-intro',
        icon: '🧠',
        title: 'Pengantar Artificial Intelligence',
        badge: 'Dasar 1',
        desc: 'Memahami konsep utama kecerdasan buatan, perkembangan era komputasi awal, serta contoh pemanfaatan AI dalam kehidupan sehari-hari.',
        topics: [
            'Definisi & Konsep Utama AI',
            'Sejarah Singkat Perkembangan AI',
            'Pemanfaatan AI Sehari-hari'
        ]
    },
    {
        id: 'ai-ml-basics',
        icon: '📊',
        title: 'Machine Learning Dasar',
        badge: 'Dasar 2',
        desc: 'Mempelajari bagaimana komputer mengenali pola data secara otomatis melalui supervised, unsupervised, dan reinforcement learning.',
        topics: [
            'Supervised Learning (Data Berlabel)',
            'Unsupervised Learning (Pola Bebas)',
            'Reinforcement Learning (Reward)'
        ]
    },
    {
        id: 'ai-ethics-basics',
        icon: '🛡️',
        title: 'Prinsip Etika & Keamanan AI',
        badge: 'Dasar 3',
        desc: 'Dasar-dasar etika, perlindungan data pribadi, kesadaran akan bias algoritma, dan batas tanggung jawab penggunaan AI.',
        topics: [
            'Privasi Data & Keamanan',
            'Pengenalan Bias Algoritma',
            'Penggunaan Teknologi secara Bertanggung Jawab'
        ]
    }
]);

export default AI_DASAR_MODULES;
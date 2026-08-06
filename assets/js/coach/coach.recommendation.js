/**
 * TOPCARE AI PLATFORM V2 — PERSONALIZED COACH RECOMMENDATIONS
 * Path: assets/js/coach/coach.recommendation.js
 * Status: APPROVED & LOCKED (BUILD 128.0)
 * SRP: Pure static rules engine for Personality Insights & AI Academy mapping.
 */

export const COACH_RECOMMENDATIONS = Object.freeze({
    Koleris: {
        personalityInsight: 'Sebagai seorang Koleris, Anda berorientasi pada target, tegas, dan memiliki jiwa kepemimpinan yang kuat.',
        aiInsight: 'Saat mempelajari AI, Anda akan sangat cepat menguasai aspek strategis, seperti pembuatan prompt bisnis, otomatisasi, dan kepemimpinan proyek AI.',
        focusAreas: ['Leadership & Strategy', 'AI Productivity', 'Prompt Engineering Business', 'Workflow Automation'],
        academyModules: [
            { title: 'Prompt Engineering untuk Kepemimpinan', level: 'Menengah', desc: 'Strategi mengarahkan model AI untuk keputusan bisnis presisi.' },
            { title: 'Otomatisasi Alur Kerja Berbasis AI', level: 'Mahir', desc: 'Meningkatkan efisiensi tim dengan alur kerja otomatis.' }
        ]
    },
    Melankolis: {
        personalityInsight: 'Sebagai seorang Melankolis, Anda sangat analitis, teliti, mendalam, dan menghargai struktur yang rapi.',
        aiInsight: 'Saat mempelajari AI, Anda akan berkembang pesat dalam analisis data, validasi model, dokumentasi, serta pemahaman arsitektur mendalam.',
        focusAreas: ['Data Analysis & Research', 'Structured Prompting', 'AI Ethics & Validation', 'Deep Learning Concepts'],
        academyModules: [
            { title: 'Analisis Data & Riset dengan AI', level: 'Dasar', desc: 'Metode terstruktur mengolah wawasan data menggunakan AI.' },
            { title: 'Etika & Validasi Keamanan Data AI', level: 'Dasar', desc: 'Memastikan akurasi dan privasi dalam penerapan AI.' }
        ]
    },
    Sanguinis: {
        personalityInsight: 'Sebagai seorang Sanguinis, Anda antusias, ekspresif, kreatif, dan sangat mahir membangun hubungan sosial.',
        aiInsight: 'Saat mempelajari AI, Anda akan sangat menonjol dalam pembuatan konten kreatif, presentasi visual, storyboarding, dan komunikasi komunitas.',
        focusAreas: ['Content Creation', 'Generative Media', 'Visual Storyboarding', 'Community Engagement'],
        academyModules: [
            { title: 'Generative AI untuk Content Creator', level: 'Dasar', desc: 'Membuat naskah, gambar, dan media sosial dalam hitungan detik.' },
            { title: 'Visual Storyboarding & AI Marketing', level: 'Menengah', desc: 'Teknik menyusun ide kreatif iklan berbasis AI.' }
        ]
    },
    Plegmatis: {
        personalityInsight: 'Sebagai seorang Plegmatis, Anda tenang, diplomatis, dapat diandalkan, dan sangat menyukai keharmonisan.',
        aiInsight: 'Saat mempelajari AI, Anda akan unggul dalam integrasi sistem yang stabil, manajemen proyek kolaboratif, dan pemanfaatan AI Assistant harian.',
        focusAreas: ['Teamwork & Harmony', 'Daily Productivity Assistants', 'Project Management', 'Practical AI Tools'],
        academyModules: [
            { title: 'Pemanfaatan AI Assistant untuk Tugas Harian', level: 'Dasar', desc: 'Langkah praktis menyederhanakan rutin kerja dengan AI.' },
            { title: 'Manajemen Proyek Kolaboratif Berbasis AI', level: 'Menengah', desc: 'Menjaga keharmonisan dan efisiensi tim.' }
        ]
    }
});

export const getCoachRecommendations = (dominantType) => {
    const key = dominantType && COACH_RECOMMENDATIONS[dominantType] ? dominantType : 'Melankolis';
    return COACH_RECOMMENDATIONS[key];
};

export default getCoachRecommendations;
/**
 * TOPCARE AI PLATFORM V2 — RECOMMENDATIONS MANIFEST (SSOT)
 * Path: assets/js/coach/data/recommendation.manifest.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Manifest for Temperament Insights, Study Styles & AI Academy Paths.
 */

export const PERSONALITY_RECOMMENDATIONS_MANIFEST = Object.freeze({
    Koleris: {
        insights: {
            strengths: ['Tegas & Berorientasi Target', 'Kepemimpinan Alami', 'Pengambilan Keputusan Cepat'],
            areasToDevelop: 'Kesabaran terhadap detail teknis yang repetitive'
        },
        studyStyle: 'Pendekatan berbasis proyek langsung, berfokus pada efisiensi dan hasil nyata.',
        recommendedPath: 'AI Leadership & Workflow Automation',
        nextLevel: 'Level 2 — Prompt Engineering Business',
        academyModules: [
            { title: 'Prompt Engineering Business', level: 'Level 2', link: '#/prompt' },
            { title: 'Otomatisasi Alur Kerja AI', level: 'Level 3', link: '#/learning' }
        ]
    },
    Melankolis: {
        insights: {
            strengths: ['Analitis & Sangat Teliti', 'Terencana & Terstruktur', 'Sangat Menghargai Akurasi'],
            areasToDevelop: 'Menghindari over-analysis saat mengeksekusi ide'
        },
        studyStyle: 'Pembelajaran bertahap dengan dokumentasi lengkap, riset data, dan alur terstruktur.',
        recommendedPath: 'Data Analytics, AI Validation & Ethics',
        nextLevel: 'Level 2 — Data Analytics & AI Ethics',
        academyModules: [
            { title: 'Analisis Data & Riset Terstruktur', level: 'Level 1', link: '#/learning' },
            { title: 'Etika & Validasi Model AI', level: 'Level 2', link: '#/learning' }
        ]
    },
    Sanguinis: {
        insights: {
            strengths: ['Antusias & Kreatif', 'Komunikator Visual Hebat', 'Membangun Hubungan Luas'],
            areasToDevelop: 'Fokus pada konsistensi penuntasan modul hingga akhir'
        },
        studyStyle: 'Eksplorasi visual interaktif, konten kreatif, storyboarding, dan diskusi komunitas.',
        recommendedPath: 'Generative AI & Content Creation',
        nextLevel: 'Level 2 — AI Content & Storyboarding',
        academyModules: [
            { title: 'Generative AI Content Creator', level: 'Level 1', link: '#/creator' },
            { title: 'Visual Storyboarding & AI Marketing', level: 'Level 2', link: '#/creator' }
        ]
    },
    Plegmatis: {
        insights: {
            strengths: ['Tenang & Diplomatis', 'Pendengar Baik & Stabil', 'Sangat Konsisten'],
            areasToDevelop: 'Meningkatkan keberanian dalam mencoba teknologi eksperimental'
        },
        studyStyle: 'Langkah-langkah praktis harian, lingkungan konsisten, dan kolaborasi tim yang harmonis.',
        recommendedPath: 'AI Productivity & Daily Assistant Integrations',
        nextLevel: 'Level 2 — Team Project Automation',
        academyModules: [
            { title: 'Pemanfaatan AI Assistant Harian', level: 'Level 1', link: '#/learning' },
            { title: 'Kolaborasi Proyek Tim Berbasis AI', level: 'Level 2', link: '#/community' }
        ]
    }
});

export default PERSONALITY_RECOMMENDATIONS_MANIFEST;
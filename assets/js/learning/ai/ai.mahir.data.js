/**
 * TOPCARE AI PLATFORM V2 — AI LEARNING: LEVEL MAHIR
 * Path: assets/js/learning/ai/ai.mahir.data.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Immutable SSOT for Advanced & Practical Level AI Modules.
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const AI_MAHIR_MODULES = deepFreezeDTO([
    {
        id: 'ai-productivity',
        icon: '⚡',
        title: 'AI untuk Produktivitas Kerja',
        badge: 'Mahir 1',
        desc: 'Implementasi otomatisasi alur kerja harian, pembuatan draf dokumen, penyusunan presentasi, dan riset mandiri secara cepat.',
        topics: [
            'Otomatisasi Administrasi & Dokumen',
            'Pembuatan Presentasi & Laporan',
            'Riset Mandiri & Pemrosesan Data'
        ]
    },
    {
        id: 'ai-business',
        icon: '💼',
        title: 'AI untuk Strategi Bisnis',
        badge: 'Mahir 2',
        desc: 'Pemanfaatan kecerdasan buatan dalam skala operasional bisnis, analisis tren pasar, strategi pemasaran, dan customer support.',
        topics: [
            'Layanan Pelanggan Terintegrasi',
            'Riset Pemasaran & Strategi Konten',
            'Optimasi Operasional & Finansial'
        ]
    },
    {
        id: 'ai-education',
        icon: '🎓',
        title: 'AI untuk Pendidikan & Akademik',
        badge: 'Mahir 3',
        desc: 'Penggunaan AI dalam شخصisasi materi ajar bagi pendidik, studi mandiri siswa, dan penyusunan bahan pembelajaran berbasis riset.',
        topics: [
            'Personalisasi Bahan Ajar Guru',
            'Pendampingan Studi Mandiri Siswa',
            'Literasi Riset Akademik'
        ]
    },
    {
        id: 'ai-tools-ecosystem',
        icon: '🛠️',
        title: 'Ekosistem Tools AI Modern',
        badge: 'Mahir 4',
        desc: 'Pemetaan kategori dan fungsi berbagai alat AI terdepan di industri profesional (chatbot, coding assistant, research tools).',
        topics: [
            'Chatbot & Interactive Assistant',
            'Coding & Development Tools',
            'Research & Analysis Assistants'
        ]
    }
]);

export default AI_MAHIR_MODULES;
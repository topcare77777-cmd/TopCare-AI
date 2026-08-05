/**
 * TOPCARE AI PLATFORM V2 — PREMIUM DATA DTO
 * Path: assets/js/premium/premium.data.js
 * Status: APPROVED & LOCKED (BUILD 128.3)
 * SRP: Immutable Static Data for Premium Center.
 */

export const PREMIUM_DATA = {
    hero: {
        badge: '✨ TopCare AI Premium Center',
        title: 'Masa Depan Pembelajaran & Produktivitas AI',
        subtitle: 'Tingkatkan pengalaman belajar, produktivitas, dan pengembangan diri melalui layanan Premium yang dirancang untuk mendukung perjalanan Anda secara komprehensif.'
    },

    benefits: [
        { icon: '📚', title: 'Materi Lengkap & Terstruktur', desc: 'Akses modul edukasi AI dan kepribadian yang disusun secara sistematis.' },
        { icon: '💎', title: 'Konten & Resource Eksklusif', desc: 'Dapatkan koleksi E-book, draf artikel wawasan, dan template yang siap digunakan.' },
        { icon: '🚀', title: 'Akses Inovasi Lebih Cepat', desc: 'Menjadi yang pertama menikmati pembaruan fitur, tools AI, dan modul pelatihan baru.' },
        { icon: '⚡', title: 'Performa & Navigasi Prioritas', desc: 'Nikmati pengalaman eksplorasi platform yang cepat, aman, dan bebas hambatan.' }
    ],

    roadmap: [
        { phase: 'Fase 1', title: 'Fondasi Pembelajaran Premium', items: ['Modul AI Tingkat Menengah & Mahir', 'Koleksi Artikel Eksklusif', 'Perpustakaan E-book Digital'] },
        { phase: 'Fase 2', title: 'AI Productivity & Resource Library', items: ['Prompt AI Ready-to-Use Library', 'Toolkit Produktivitas Harian', 'Pusat Unduhan Aset Digital'] },
        { phase: 'Fase 3', title: 'Workspace & Creator Ecosystem', items: ['Ruang Kerja Interaktif AI', 'Platform Kolaborasi Creator Hub', 'Aset & Template Eksklusif'] },
        { phase: 'Fase 4', title: 'Enterprise & Team Learning', items: ['AI Business Toolkit', 'Dashboard Ruang Kerja Tim', 'Corporate & Institutional Learning'] }
    ],

    plans: [
        {
            name: 'Free Starter',
            tag: 'Aktif',
            badgeClass: 'tag-active',
            desc: 'Akses dasar untuk memulai perjalanan belajar.',
            features: ['Materi AI Tingkat Dasar', 'Akses Artikel Umum', 'Komunitas Global TopCare AI', 'Update Komunitas Berkala'],
            statusText: 'Paket Saat Ini'
        },
        {
            name: 'Premium Personal',
            tag: 'Coming Soon',
            badgeClass: 'tag-coming',
            desc: 'Dirancang untuk pembelajar mandiri & profesional.',
            features: ['Seluruh Modul AI (Dasar–Mahir)', 'Library Prompt AI Terstruktur', 'E-book Digital Komprehensif', 'Sertifikat Kelulusan Digital', 'Pembaruan Modul Eksklusif'],
            statusText: 'Rencana Pengembangan'
        },
        {
            name: 'Premium Professional',
            tag: 'Coming Soon',
            badgeClass: 'tag-coming',
            desc: 'Solusi produktivitas bagi creator & pebisnis.',
            features: ['AI Business & Marketing Guide', 'Creator Productivity Toolkit', 'Template & Aset Digital Siap Pakai', 'Akses Fitur Eksperimental'],
            statusText: 'Rencana Pengembangan'
        },
        {
            name: 'Premium Enterprise',
            tag: 'Coming Soon',
            badgeClass: 'tag-coming',
            desc: 'Pengembangan kapasitas untuk tim & organisasi.',
            features: ['Multi-User Team Learning', 'Management & Progress Dashboard', 'Custom Enterprise Curriculum', 'Dukungan Prioritas Platform'],
            statusText: 'Rencana Pengembangan'
        }
    ],

    featuresCatalog: [
        { icon: '🎓', name: 'AI Learning Academy' },
        { icon: '🤖', name: 'Prompt Collection' },
        { icon: '📘', name: 'E-book Library' },
        { icon: '💼', name: 'AI Business Guide' },
        { icon: '⚡', name: 'Productivity Course' },
        { icon: '🏆', name: 'Digital Certificate' },
        { icon: '🎨', name: 'Creator Assets' },
        { icon: '🌐', name: 'Premium Community' },
        { icon: '🔄', name: 'Monthly Updates' },
        { icon: '📥', name: 'Download Center' }
    ],

    faqs: [
        { q: 'Apakah fitur Premium sudah resmi diluncurkan?', a: 'Halaman ini merupakan pusat informasi roadmap dan katalog fitur Premium. Layanan transaksi dan langganan akan dibuka bertahap sesuai Fase Pengembangan.' },
        { q: 'Apakah sudah bisa melakukan pembayaran atau berlangganan saat ini?', a: 'Saat ini belum ada mekanisme pembayaran atau transaksi keuangan di platform. Seluruh fitur yang tersedia saat ini tetap dapat diakses sesuai skema Free.' },
        { q: 'Apakah akun Free tetap dapat digunakan setelah Premium diluncurkan?', a: 'Ya! Akun Free akan selalu dapat mengakses modul-modul dasar dan fitur komunitas tanpa batas waktu.' },
        { q: 'Kapan layanan Premium resmi dapat diakses?', a: 'Pengembangan dilakukan secara bertahap mulai dari Fase 1. Pengumuman resmi akan disampaikan melalui halaman ini dan saluran komunitas.' }
    ]
};

export default PREMIUM_DATA;
/**
 * TOPCARE AI PLATFORM V2 — ABOUT US DATA SSOT
 * Path: assets/js/about/about.data.js
 * Status: APPROVED & LOCKED (BUILD 127.0)
 * SRP: Immutable Single Source of Truth for About Us domain metadata and contents.
 */

import { deepFreezeDTO } from '../core/utils/dto.js';

export const ABOUT_DATA = deepFreezeDTO({
    hero: {
        badge: 'Tentang TopCare AI',
        title: 'Platform Pembelajaran Personality Plus',
        description: 'TopCare AI adalah platform pembelajaran Personality Plus karya Florence Littauer yang membantu pengguna memahami karakter diri, meningkatkan komunikasi, kepemimpinan, hubungan, dan pengembangan diri melalui pengalaman belajar yang sederhana dan terstruktur.'
    },
    vision: {
        title: 'Visi Platform',
        content: 'Visi TopCare AI adalah menjadi platform pembelajaran Personality Plus yang mudah dipahami, ringan diakses, dan bermanfaat bagi masyarakat luas dalam membangun kesadaran diri dan harmoni interaksi sosial.'
    },
    missions: [
        { id: 'm1', icon: '📖', title: 'Materi Berkualitas', desc: 'Menyediakan materi modul pembelajaran Personality Plus yang terstruktur, padat, dan mudah dipahami.' },
        { id: 'm2', icon: '🧩', title: 'Pemahaman Temperamen', desc: 'Membantu pengguna memahami dinamika unik empat temperamen utama: Koleris, Sanguinis, Melankolis, dan Plegmatis.' },
        { id: 'm3', icon: '📝', title: 'Asesmen Mandiri', desc: 'Menyediakan alat evaluasi mandiri yang objektif untuk mengenali profil dan potensi kecenderungan perilaku.' },
        { id: 'm4', icon: '🚀', title: 'Jalur Belajar Bertahap', desc: 'Menyusun alur pembelajaran bertahap dari konsep dasar hingga implementasi praktis dalam kehidupan.' },
        { id: 'm5', icon: '🌱', title: 'Dukungan Pertumbuhan', desc: 'Mendorong pengembangan diri yang berorientasi pada penguatan kelebihan dan penyeimbangan kelemahan alamiah.' }
    ],
    whatWeLearn: [
        { icon: '📚', title: 'Personality Plus', desc: 'Prinsip utama psikologi populer untuk mengenal keunikan kepribadian.' },
        { icon: '🔥', title: 'Koleris', desc: 'Karakteristik kepemimpinan, ketegasan, dan orientasi pada hasil.' },
        { icon: '✨', title: 'Sanguinis', desc: 'Kehangatan sosial, antusiasme, serta keceriaan dalam berinteraksi.' },
        { icon: '📊', title: 'Melankolis', desc: 'Ketelitian analitis, standar kualitas tinggi, dan kecermatan detail.' },
        { icon: '🌊', title: 'Plegmatis', desc: 'Kedamaian alami, kestabilan emosi, serta keharmonisan diplomatis.' },
        { icon: '💬', title: 'Komunikasi', desc: 'Strategi penyampaian pesan adaptif sesuai tipe temperamen lawan bicara.' },
        { icon: '👑', title: 'Kepemimpinan', desc: 'Seni memimpin dan mengelola pendelegasian berbasis potensi karakter.' },
        { icon: '🤝', title: 'Hubungan', desc: 'Membangun keharmonisan dalam keluarga dan lingkungan kerja.' },
        { icon: '💡', title: 'Pengembangan Diri', desc: 'Rencana aksi nyata untuk menyeimbangkan kelemahan dan mengasah bakat.' }
    ],
    values: [
        { title: 'Edukatif', desc: 'Berfokus pada penyampaian nilai pembelajaran yang memberikan wawasan nyata.' },
        { title: 'Praktis', desc: 'Dapat langsung diterapkan dalam percakapan dan hubungan sehari-hari.' },
        { title: 'Objektif', desc: 'Menyajikan analisis karakter tanpa bias emosional atau pelabelan subjektif.' },
        { title: 'Bertanggung Jawab', desc: 'Mengutamakan etika dan privasi pengguna dalam setiap proses belajar.' },
        { title: 'Ringan', desc: 'Arsitektur platform yang cepat diakses dari berbagai perangkat tanpa beban berat.' },
        { title: 'Mudah Dipahami', desc: 'Bahasa dan struktur penyampaian yang jernih untuk semua kalangan.' }
    ],
    learningSteps: [
        { step: '01', title: 'Pelajari Materi', desc: 'Membaca konsep dasar empat temperamen pada modul pembelajaran yang tersedia.' },
        { step: '02', title: 'Ikuti Asesmen', desc: 'Mengisi indikator tes pemahaman diri untuk mengidentifikasi temperamen dominan.' },
        { step: '03', title: 'Pelajari Hasil', desc: 'Menganalisis poin kekuatan dan area pertumbuhan dari hasil kepribadian.' },
        { step: '04', title: 'Lanjutkan Modul', desc: 'Mendalami topik spesifik seperti komunikasi, kepemimpinan, dan hubungan.' },
        { step: '05', title: 'Terapkan dalam Kehidupan', desc: 'Mengaplikasikan pemahaman untuk membangun interaksi yang lebih harmonis.' }
    ],
    principles: {
        title: 'Prinsip Pembelajaran',
        content: 'Konsep Personality Plus di TopCare AI digunakan murni sebagai alat bantu pemahaman kecenderungan perilaku manusia. Platform ini tidak menggunakan temperamen untuk memberikan label permanen, menghakimi seseorang, atau membatasi potensi individu, melainkan sebagai pijakan untuk saling memahami dan bertumbuh bersama.'
    },
    aboutBook: {
        title: 'Tentang Personality Plus',
        content: 'Personality Plus adalah konsep psikologi populer karya Florence Littauer yang membagi kecenderungan kepribadian manusia ke dalam empat temperamen dasar: Koleris (Kuat), Sanguinis (Populer), Melankolis (Sempurna), dan Plegmatis (Damai). Pemahaman atas kombinasi temperamen ini membantu individu mengenali kekuatan bawaan serta mengelola kelemahan secara bijaksana.'
    },
    closing: {
        title: 'Mulai Perjalanan Belajar Anda',
        content: 'Lanjutkan perjalanan pembelajaran Anda melalui materi, asesmen, dan modul Personality Plus yang tersedia di TopCare AI.'
    }
});

export default ABOUT_DATA;
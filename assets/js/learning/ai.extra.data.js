/**
 * TOPCARE AI PLATFORM V2 — AI LEARNING CATALOG DATA SSOT (PART 2)
 * Path: assets/js/learning/ai.extra.data.js
 * Status: APPROVED & LOCKED (BUILD 127.2)
 * SRP: Immutable data definitions for Application Modules 7-11, Best Practices, FAQ, and Closing.
 */

import { deepFreezeDTO } from '../core/utils/dto.js';

export const AI_APPLICATION_MODULES = deepFreezeDTO([
    {
        id: 'ai-productivity',
        icon: '⚡',
        title: '7. AI Productivity',
        badge: 'Praktik',
        desc: 'Pemanfaatan alat AI untuk mempercepat otomatisasi tugas rutin, pembuatan draft dokumen, dan pengorganisasian kerja.',
        points: ['Otomatisasi Administrasi & Email', 'Penyusunan Presentasi & Laporan', 'Studi Mandiri & Pembuatan Ringkasan']
    },
    {
        id: 'ai-business',
        icon: '💼',
        title: '8. AI for Business',
        badge: 'Bisnis',
        desc: 'Penerapan teknologi cerdas untuk mendukung efisiensi operasional perusahaan, layanan pelanggan, dan analisis pasar.',
        points: ['Layanan Pelanggan (Customer Support)', 'Strategi Marketing & Content Research', 'Manajemen Operasional & Keuangan']
    },
    {
        id: 'ai-education',
        icon: '🎓',
        title: '9. AI for Education',
        badge: 'Pendidikan',
        desc: 'Panduan penggunaan AI bagi pendidik dan siswa untuk personalisasi proses belajar dan pengembangan materi ajar.',
        points: ['Bahan Ajar Kustom untuk Guru', 'Pendampingan Studi Mandiri Siswa', 'Riset Akademik & Literasi Informasi']
    },
    {
        id: 'ai-ethics',
        icon: '🛡️',
        title: '10. AI Ethics',
        badge: 'Penting',
        desc: 'Prinsip utama mengenai keamananan data, privasi pengguna, mitigasi bias algoritma, serta batas tanggung jawab etis.',
        points: ['Mitigasi Bias & Transparansi Data', 'Perlindungan Privasi & Keamanan Informasi', 'Tanggung Jawab Penggunaan Teknologi']
    },
    {
        id: 'ai-tools-cat',
        icon: '🛠️',
        title: '11. Popular AI Tools Category',
        badge: 'Katalog',
        desc: 'Pengenalan terhadap kategori alat AI populer yang berkembang pesat di industri kreatif dan profesional.',
        points: ['Chatbot & Interactive Assistants', 'Coding & Presentation Assistants', 'Research & Productivity Tools']
    }
]);

export const AI_BEST_PRACTICES = deepFreezeDTO([
    { num: '01', title: 'Verifikasi Hasil AI', desc: 'Selalu lakukan pengecekan ulang (fact-checking) pada luaran AI sebelum menggunakannya secara resmi.' },
    { num: '02', title: 'Jaga Data Sensitif', desc: 'Hindari memasukkan informasi pribadi, rahasia bisnis, atau kata sandi ke dalam sistem AI publik.' },
    { num: '03', title: 'Pendamping, Bukan Pengganti', desc: 'Gunakan AI sebagai alat bantu peningkat efisiensi, bukan pengambil keputusan akhir.' },
    { num: '04', title: 'Pahami Keterbatasan', desc: 'Pahami bahwa model AI dapat mengalami batasan konteks atau informasi yang tidak akurat.' },
    { num: '05', title: 'Hormati Hak Cipta', desc: 'Gunakan aset yang dihasilkan AI secara etis dengan menghargai hak kekayaan intelektual.' }
]);

export const AI_FAQ_LIST = deepFreezeDTO([
    {
        q: 'Apa itu AI (Artificial Intelligence)?',
        a: 'AI adalah cabang ilmu komputer yang berfokus pada pembuatan sistem cerdas yang mampu melakukan tugas-tugas yang biasanya membutuhkan kecerdasan manusia.'
    },
    {
        q: 'Apakah informasi dari AI selalu benar?',
        a: 'Tidak. AI bekerja berdasarkan pola data dan dapat menghasilkan keluaran yang keliru. Verifikasi informasi oleh manusia tetap dianjurkan.'
    },
    {
        q: 'Apakah AI akan menggantikan peran manusia?',
        a: 'AI dirancang untuk membantu dan mengotomatisasi tugas-tugas rutin, sehingga manusia dapat berfokus pada pemikiran strategis, kreativitas, dan empati.'
    },
    {
        q: 'Apakah aman menggunakan alat AI?',
        a: 'Aman selama pengguna tidak membagikan data sensitif, kata sandi, atau data rahasia pribadi ke dalam platform publik.'
    },
    {
        q: 'Bagaimana cara terbaik mulai belajar AI?',
        a: 'Mulailah dengan memahami konsep dasar, mempelajari cara menyusun prompt yang baik, dan menerapkan AI pada tugas-tugas sederhana sehari-hari.'
    }
]);

export const AI_CLOSING_INFO = deepFreezeDTO({
    title: 'Mulai Perjalanan Belajar AI Anda',
    desc: 'Lanjutkan perjalanan belajar AI Anda melalui modul-modul yang tersedia di TopCare AI.'
});

export default {
    AI_APPLICATION_MODULES,
    AI_BEST_PRACTICES,
    AI_FAQ_LIST,
    AI_CLOSING_INFO
};
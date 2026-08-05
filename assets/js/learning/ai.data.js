/**
 * TOPCARE AI PLATFORM V2 — AI LEARNING CATALOG DATA SSOT (PART 1)
 * Path: assets/js/learning/ai.data.js
 * Status: APPROVED & LOCKED (BUILD 127.2)
 * SRP: Immutable data definitions for AI Hero, Learning Path, and Core Modules 1-6.
 */

import { deepFreezeDTO } from '../core/utils/dto.js';

export const AI_LEARNING_HERO = deepFreezeDTO({
    badge: 'Jalur Pembelajaran AI V2',
    title: 'Katalog Pembelajaran Artificial Intelligence',
    subtitle: 'Modul literasi modern untuk memahami konsep dasar, Machine Learning, Generative AI, Prompt Engineering, serta etika penggunaan teknologi kecerdasan buatan.'
});

export const AI_LEARNING_PATH = deepFreezeDTO([
    { step: '01', title: 'Dasar AI', desc: 'Pemahaman konsep awal, sejarah kecerdasan buatan, dan contoh penggunaan.' },
    { step: '02', title: 'Machine Learning', desc: 'Prinsip pola data, supervised, unsupervised, dan reinforcement learning.' },
    { step: '03', title: 'Generative AI', desc: 'Pengenalan teknologi pembuat teks, gambar, audio, dan video otomatis.' },
    { step: '04', title: 'Prompt Engineering', desc: 'Teknik menyusun instruksi presisi dengan role, context, dan constraints.' },
    { step: '05', title: 'Implementasi AI', desc: 'Penerapan praktis pada produktivitas, bisnis, dan dunia pendidikan.' },
    { step: '06', title: 'Etika AI', desc: 'Prinsip privasi data, bias algoritma, keamanan, dan batas tanggung jawab.' }
]);

export const AI_CORE_MODULES = deepFreezeDTO([
    {
        id: 'ai-intro',
        icon: '🧠',
        title: '1. Pengantar Artificial Intelligence',
        badge: 'Pemula',
        desc: 'Memahami pengertian dasar AI, perjalanan sejarah singkat dari era komputasi awal, serta perannya dalam aplikasi sehari-hari.',
        points: ['Definisi & Konsep Utama AI', 'Sejarah Singkat Perkembangan AI', 'Contoh Aplikasi AI Sehari-hari']
    },
    {
        id: 'ai-ml',
        icon: '📊',
        title: '2. Machine Learning',
        badge: 'Dasar',
        desc: 'Mempelajari bagaimana sistem komputer belajar dari data untuk mengenali pola dan mengambil keputusan tanpa pemrograman eksplisit.',
        points: ['Supervised Learning (Berlabel)', 'Unsupervised Learning (Pola Bebas)', 'Reinforcement Learning (Reward)']
    },
    {
        id: 'ai-dl',
        icon: '🕸️',
        title: '3. Deep Learning',
        badge: 'Menengah',
        desc: 'Pendalaman tentang jaringan saraf tiruan (Neural Networks) yang mendasari kemampuan komputer melihat dan mendengar.',
        points: ['Artificial Neural Networks', 'Computer Vision (Pengenalan Visual)', 'Speech Recognition (Suara)']
    },
    {
        id: 'ai-llm',
        icon: '💬',
        title: '4. Large Language Models (LLM)',
        badge: 'Menengah',
        desc: 'Pengenalan konsep arsitektur pemroses bahasa alami berskala besar yang mendasari model bahasa modern saat ini.',
        points: ['Konsep Dasar & Arsitektur LLM', 'Tokenisasi & Context Window', 'Proses Inference & Generasi Teks']
    },
    {
        id: 'ai-genai',
        icon: '🎨',
        title: '5. Generative AI',
        badge: 'Menengah',
        desc: 'Eksplorasi kemampuan AI dalam menghasilkan aset kreatif baru berupa teks, sintesis gambar, suara, hingga elemen video.',
        points: ['Text Generation & Summarization', 'Image & Graphics Generation', 'Audio & Video Synthesis']
    },
    {
        id: 'ai-prompt-eng',
        icon: '⚙️',
        title: '6. Prompt Engineering',
        badge: 'Populer',
        desc: 'Seni dan teknik merumuskan instruksi terstruktur untuk mendapatkan hasil analisis yang presisi dari model kecerdasan buatan.',
        points: ['Struktur Utama Prompt (Role, Task)', 'Context, Objective & Constraints', 'Format Output & Dynamic Framing']
    }
]);

export default {
    AI_LEARNING_HERO,
    AI_LEARNING_PATH,
    AI_CORE_MODULES
};
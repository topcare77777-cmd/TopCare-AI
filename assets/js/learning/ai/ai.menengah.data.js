/**
 * TOPCARE AI PLATFORM V2 — AI LEARNING: LEVEL MENENGAH
 * Path: assets/js/learning/ai/ai.menengah.data.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Immutable SSOT for Intermediate Level AI Modules.
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const AI_MENENGAH_MODULES = deepFreezeDTO([
    {
        id: 'ai-dl',
        icon: '🕸️',
        title: 'Deep Learning & Jaringan Saraf',
        badge: 'Menengah 1',
        desc: 'Pendalaman arsitektur Neural Networks yang mendasari kemampuan kecerdasan buatan dalam mengenali gambar dan suara.',
        topics: [
            'Artificial Neural Networks (ANN)',
            'Computer Vision (Analisis Visual)',
            'Speech Recognition (Pengenalan Suara)'
        ]
    },
    {
        id: 'ai-llm',
        icon: '💬',
        title: 'Large Language Models (LLM)',
        badge: 'Menengah 2',
        desc: 'Memahami arsitektur pemroses bahasa alami berskala besar, mekanisme token, context window, dan proses generasi teks.',
        topics: [
            'Arsitektur Model Bahasa',
            'Tokenisasi & Context Window',
            'Proses Inference & Generasi Teks'
        ]
    },
    {
        id: 'ai-genai',
        icon: '🎨',
        title: 'Generative AI & Sintesis Media',
        badge: 'Menengah 3',
        desc: 'Eksplorasi pembuatan aset otomatis berbasis kecerdasan buatan mulai dari teks, sintesis gambar, audio, hingga elemen video.',
        topics: [
            'Text Generation & Summarization',
            'Image & Graphics Synthesis',
            'Audio & Video Generation'
        ]
    },
    {
        id: 'ai-prompt-eng',
        icon: '⚙️',
        title: 'Prompt Engineering Terstruktur',
        badge: 'Menengah 4',
        desc: 'Teknik merumuskan instruksi presisi dengan menentukan role, context, objective, constraints, dan format keluaran.',
        topics: [
            'Struktur Prompt (Role & Task)',
            'Context & Constraint Definition',
            'Format Output & Dynamic Framing'
        ]
    }
]);

export default AI_MENENGAH_MODULES;
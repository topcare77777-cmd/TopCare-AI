/**
 * TOPCARE AI PLATFORM V2 — AI LESSON 01: INTRODUCTION TO AI
 * Path: assets/js/learning/ai/basic/lessons/introduction.module.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Immutable Content DTO for Lesson 01 (Pengantar Artificial Intelligence).
 */

import { deepFreezeDTO } from '../../../../core/utils/dto.js';

export const LESSON_INTRODUCTION = deepFreezeDTO({
    id: 'dasar-1',
    badge: 'Dasar 1',
    title: 'Modul 1: Pengantar Artificial Intelligence',
    description: 'Memahami konsep utama kecerdasan buatan, perkembangan era komputasi awal, serta contoh pemanfaatan AI dalam kehidupan sehari-hari.',
    learningPoints: [
        'Definisi AI',
        'Konsep AI Modern',
        'Sejarah Singkat AI',
        'Contoh AI Sehari-hari'
    ],
    estimation: '30 Menit',
    status: 'Siap Dipelajari',
    content: `
        <article class="tc-lesson-content">
            <section class="tc-lesson-section">
                <h3>1. Definisi Artificial Intelligence (Kecerdasan Buatan)</h3>
                <p>
                    <strong>Artificial Intelligence (AI)</strong> atau Kecerdasan Buatan adalah cabang dari ilmu komputer yang didedikasikan untuk merancang sistem, mesin, dan algoritma cerdas yang mampu meniru serta mensimulasikan fungsi kognitif manusia. Fungsi ini mencakup pemrosesan bahasa, persepsi visual, pengambilan keputusan, serta pemecahan masalah kompleks secara mandiri.
                </p>
                <div class="tc-callout-box">
                    <strong>Poin Kunci:</strong> AI bukanlah mesin yang memiliki kesadaran emosional manusia, melainkan sistem pemrosesan matematika dan statistik tingkat tinggi yang mengidentifikasi pola data untuk menyelesaikan tugas secara efisien.
                </div>
            </section>

            <section class="tc-lesson-section">
                <h3>2. Konsep AI Modern</h3>
                <p>
                    Pendekatan AI awal berbasis aturan kaku (*rule-based systems*) yang ditulis manual oleh manusia. Sebaliknya, **AI Modern** bertumpu pada analisis data berbasis model statistik, *Machine Learning*, dan jaringan saraf tiruan (*Neural Networks*).
                </p>
                <ul>
                    <li><strong>Narrow AI (Weak AI):</strong> Sistem AI khusus yang dirancang untuk satu tugas spesifik (contoh: catur, deteksi wajah, penerjemahan bahasa). Seluruh sistem AI yang ada saat ini berada pada kategori ini.</li>
                    <li><strong>Artificial General Intelligence (AGI):</strong> Konsep AI teoretis yang memiliki kemampuan pemahaman kognitif setara manusia di berbagai bidang sekaligus.</li>
                </ul>
            </section>

            <section class="tc-lesson-section">
                <h3>3. Sejarah Singkat AI</h3>
                <div class="tc-timeline-box">
                    <p><strong>1950 — Alan Turing Test:</strong> Alan Turing mengajukan pertanyaan "Apakah mesin bisa berpikir?" dan merumuskan *Turing Test* sebagai standar pengujian kecerdasan komputasi.</p>
                    <p><strong>1956 — Konferensi Dartmouth:</strong> Istilah "Artificial Intelligence" secara resmi dicetuskan oleh John McCarthy dan para peneliti utama di Dartmouth College.</p>
                    <p><strong>1997 — Deep Blue vs Garry Kasparov:</strong> Komputer IBM Deep Blue mengalahkan juara dunia catur, menandai tonggak sejarah kekuatan analisis algoritma.</p>
                    <p><strong>2010–Sekarang — Era Big Data & Generative AI:</strong> Ledakan data digital, komputasi GPU, serta arsitektur *Deep Learning* melahirkan model AI bahasa besar (*LLM*) dan AI generatif modern.</p>
                </div>
            </section>

            <section class="tc-lesson-section">
                <h3>4. Contoh Pemanfaatan AI dalam Kehidupan Sehari-hari</h3>
                <div class="tc-examples-grid">
                    <div class="tc-example-card">
                        <h4>📱 Asisten Digital</h4>
                        <p>Pengenalan suara dan respons kontekstual pada sistem navigasi smartphone.</p>
                    </div>
                    <div class="tc-example-card">
                        <h4>📧 Filter Spam Email</h4>
                        <p>Klasifikasi otomatis pesan mencurigakan berbasis deteksi kata kunci dan reputasi pengirim.</p>
                    </div>
                    <div class="tc-example-card">
                        <h4>🎬 Rekomendasi Konten</h4>
                        <p>Saran tontonan dan musik berbasis analisis pola riwayat penggunaan pengakses.</p>
                    </div>
                    <div class="tc-example-card">
                        <h4>💳 Deteksi Penipuan Bank</h4>
                        <p>Pemantauan aktivitas transaksi mencurigakan secara *real-time* untuk keamanan dana.</p>
                    </div>
                </div>
            </section>
        </article>
    `
});

export default LESSON_INTRODUCTION;
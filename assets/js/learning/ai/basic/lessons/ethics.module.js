/**
 * TOPCARE AI PLATFORM V2 — AI LESSON 03: AI ETHICS & SECURITY
 * Path: assets/js/learning/ai/basic/lessons/ethics.module.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Immutable Content DTO for Lesson 03 (Prinsip Etika & Keamanan AI).
 */

import { deepFreezeDTO } from '../../../../core/utils/dto.js';

export const LESSON_ETHICS = deepFreezeDTO({
    id: 'dasar-3',
    badge: 'Dasar 3',
    title: 'Modul 3: Prinsip Etika & Keamanan AI',
    description: 'Memahami penggunaan AI secara aman, bertanggung jawab, dan menyadari batas-batas etis teknologi.',
    learningPoints: [
        'Privasi Data',
        'Keamanan Informasi',
        'Bias Algoritma',
        'Tanggung Jawab AI'
    ],
    estimation: '35 Menit',
    status: 'Siap Dipelajari',
    content: `
        <article class="tc-lesson-content">
            <section class="tc-lesson-section">
                <h3>1. Pentingnya Etika dalam Pengembangan AI</h3>
                <p>
                    Seiring meningkatnya kemampuan sistem cerdas dalam mengolah data pribadi dan membantu pengambilan keputusan krusial, ketaatan pada prinsip etika menjadi batas perlindungan utama agar teknologi tetap bermanfaat aman bagi kemanusiaan.
                </p>
            </section>

            <section class="tc-lesson-section">
                <h3>2. Pilar Utama Etika & Keamanan AI</h3>
                <div class="tc-ethics-grid">
                    <div class="tc-ethics-card">
                        <h4>🔒 Privasi Data</h4>
                        <p>
                            Menjaga kerahasiaan identitas dan data sensitif pengguna. Informasi pribadi tidak boleh dimasukkan secara sembarangan ke dalam prompt platform AI publik tanpa proteksi enkripsi.
                        </p>
                    </div>

                    <div class="tc-ethics-card">
                        <h4>🛡️ Keamanan Informasi</h4>
                        <p>
                            Melindungi infrastruktur AI dari manipulasi masukan (*prompt injection*), kebocoran basis data pelatihan, serta risiko penyalahgunaan aset digital.
                        </p>
                    </div>

                    <div class="tc-ethics-card">
                        <h4>⚖️ Bias Algoritma</h4>
                        <p>
                            Mencegah ketidakadilan hasil analisis AI. Jika data pelatihan historis mengandung diskriminasi kultural atau bias informasi, keluaran prediksi mesin juga dapat memicu keputusan tidak adil.
                        </p>
                    </div>

                    <div class="tc-ethics-card">
                        <h4>🤝 Tanggung Jawab AI (Accountability)</h4>
                        <p>
                            Memastikan ada manusia (*Human-in-the-loop*) yang memverifikasi keluaran sistem AI. Keputusan penting di bidang medis, hukum, dan keuangan tetap menjadi tanggung jawab manusia.
                        </p>
                    </div>
                </div>
            </section>

            <section class="tc-lesson-section">
                <h3>3. Panduan Penggunaan AI Secara Bijak</h3>
                <ul class="tc-checklist">
                    <li><strong>Verifikasi Fakta:</strong> Selalu periksa ulang jawaban AI (*fact-checking*) karena kecerdasan buatan dapat mengalami batasan konteks atau *halusinasi data*.</li>
                    <li><strong>Transparansi Konten:</strong> Sebutkan secara jujur jika suatu draf karya awal dibantu oleh instrumen kecerdasan buatan.</li>
                    <li><strong>Hormati Hak Cipta:</strong> Menghormati hak kekayaan intelektual atas karya seni dan materi pemikiran karya orang lain.</li>
                </ul>
            </section>
        </article>
    `
});

export default LESSON_ETHICS;
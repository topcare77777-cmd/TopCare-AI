/**
 * TOPCARE AI PLATFORM V2 — AI LESSON 02: MACHINE LEARNING BASICS
 * Path: assets/js/learning/ai/basic/lessons/machine-learning.module.js
 * Status: APPROVED & LOCKED (BUILD 128)
 * SRP: Immutable Content DTO for Lesson 02 (Machine Learning Dasar).
 */

import { deepFreezeDTO } from '../../../../core/utils/dto.js';

export const LESSON_MACHINE_LEARNING = deepFreezeDTO({
    id: 'dasar-2',
    badge: 'Dasar 2',
    title: 'Modul 2: Machine Learning Dasar',
    description: 'Mempelajari bagaimana komputer mengenali pola melalui data tanpa perlu diprogram secara spesifik.',
    learningPoints: [
        'Supervised Learning',
        'Unsupervised Learning',
        'Reinforcement Learning'
    ],
    estimation: '45 Menit',
    status: 'Siap Dipelajari',
    content: `
        <article class="tc-lesson-content">
            <section class="tc-lesson-section">
                <h3>1. Pengantar Machine Learning</h3>
                <p>
                    <strong>Machine Learning (ML)</strong> adalah cabang utama AI yang memberikan sistem kemampuan untuk belajar secara mandiri dari pengalaman (data) tanpa perlu dituliskan instruksi terperinci (*hard-coded*) untuk setiap kasus.
                </p>
                <div class="tc-quote-card">
                    "Pemrograman Tradisional: Data + Aturan = Hasil.<br>
                    <strong>Machine Learning: Data + Hasil = Aturan (Model Baru).</strong>"
                </div>
            </section>

            <section class="tc-lesson-section">
                <h3>2. Tiga Metode Utama Pembelajaran Mesin</h3>
                
                <div class="tc-ml-method-card">
                    <h4>1. Supervised Learning (Pembelajaran Terarah)</h4>
                    <p>
                        Algoritma dilatih menggunakan dataset yang memiliki **label/petunjuk** (memiliki pasangan antara data masukan dan jawaban yang benar).
                    </p>
                    <ul>
                        <li><strong>Klasifikasi:</strong> Mengelompokkan data ke kategori (contoh: mendeteksi email *Spam* vs *Bukan Spam*).</li>
                        <li><strong>Regresi:</strong> Memprediksi nilai kontinu berupa angka (contoh: estimasi harga rumah berbasis luas tanah).</li>
                    </ul>
                </div>

                <div class="tc-ml-method-card">
                    <h4>2. Unsupervised Learning (Pembelajaran Tak Terarah)</h4>
                    <p>
                        Algoritma menerima data **tanpa label** atau petunjuk awal. Tugas mesin adalah mencari struktur tersembunyi, pola kemiripan, atau hubungan antar-data secara mandiri.
                    </p>
                    <ul>
                        <li><strong>Clustering:</strong> Pengelompokan pelanggan berbasis perilaku belanja tanpa kategori awal.</li>
                        <li><strong>Dimensionality Reduction:</strong> Penyederhanaan data kompleks tanpa kehilangan informasi penting.</li>
                    </ul>
                </div>

                <div class="tc-ml-method-card">
                    <h4>3. Reinforcement Learning (Pembelajaran Penguatan)</h4>
                    <p>
                        Proses belajar berbasis *trial and error* (uji coba). Agen AI ditempatkan dalam lingkungan simulasi dan belajar mengambil tindakan yang mengoptimalkan **Reward (Hadiah)** serta meminimalkan **Penalty (Hukuman)**.
                    </p>
                    <p><em>Contoh Penerapan:</em> AI pengemudi mobil otonom, sistem navigasi robotik, dan bot permainan catur cerdas.</p>
                </div>
            </section>

            <section class="tc-lesson-section">
                <h3>3. Proses Kerja Alur Pembelajaran Mesin</h3>
                <ol class="tc-process-list">
                    <li><strong>Pengumpulan Data:</strong> Pengumpulan dataset mentah yang berkualitas.</li>
                    <li><strong>Pembersihan Data:</strong> Menghapus nilai ganda atau informasi rusak.</li>
                    <li><strong>Pelatihan Model:</strong> Mengalirkan data ke algoritma untuk mengenali pola.</li>
                    <li><strong>Evaluasi:</strong> Menguji akurasi model pada data baru yang belum pernah dilihat.</li>
                    <li><strong>Inference (Penerapan):</strong> Menggunakan model terlatih untuk memprediksi kasus nyata.</li>
                </ol>
            </section>
        </article>
    `
});

export default LESSON_MACHINE_LEARNING;
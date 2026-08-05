/**
 * TOPCARE AI PLATFORM V2 — LEARNING HUB DATA SSOT
 * Path: assets/js/learning/learning.data.js
 * Status: APPROVED & LOCKED (BUILD 127.1 HOTFIX — CLEAN DATA SSOT)
 * SRP: Immutable data definitions for Personality Plus & Artificial Intelligence Learning Catalog.
 */

import { deepFreezeDTO } from '../core/utils/dto.js';

export const PERSONALITY_PLUS_COURSE = deepFreezeDTO({
    id: 'personality-plus',
    title: 'Personality Plus',
    subtitle: 'Memahami Empat Temperamen Manusia',
    author: 'Florence Littauer',
    badge: 'Modul Utama V2',
    accentColor: '#8B5CF6',
    description: 'Panduan komprehensif untuk memahami keunikan diri dan orang lain melalui empat temperamen dasar: Koleris, Sanguinis, Melankolis, dan Plegmatis.',
    chapters: [
        {
            id: 'pengantar',
            title: 'Pengantar: Mengapa Kita Berbeda?',
            type: 'READING',
            content: `
                <h3>Selamat Datang di Personality Plus</h3>
                <p>Pernahkah Anda bertanya-tanya mengapa seseorang sangat terorganisir sementara yang lain santai? Mengapa ada orang yang senang berbicara di depan umum, sedangkan yang lain lebih memilih mendengarkan?</p>
                <p>Konsep <strong>Personality Plus</strong> yang dikembangkan oleh Florence Littauer membantu kita memahami bahwa perbedaan kepribadian bukanlah sebuah kelemahan, melainkan kombinasi unik dari empat temperamen dasar.</p>
                <blockquote class="tc-quote">
                    "Mengenali diri sendiri adalah langkah pertama untuk memahami orang lain dan membangun hubungan yang harmonis."
                </blockquote>
                <p>Dalam modul ini, Anda akan mempelajari karakteristik dasar, kekuatan, serta area pertumbuhan dari keempat temperamen utama.</p>
            `
        },
        {
            id: 'bab-1',
            title: 'Bab 1: Sanguinis yang Populer',
            type: 'READING',
            content: `
                <h3>Sanguinis: Kepribadian yang Ekstrovert dan Optimis</h3>
                <p>Tipe Sanguinis adalah jiwa dari setiap ruang sosial. Mereka penuh dengan antusiasme, ramah, dan selalu membawa keceriaan dalam interaksi sehari-hari.</p>
                <h4>Ciri Utama Sanguinis:</h4>
                <ul>
                    <li><strong>Ekspresif & Antusias:</strong> Suka berbicara, menceritakan kisah, dan membagikan energi positif.</li>
                    <li><strong>Mudah Berteman:</strong> Sangat gampang berbaur dalam lingkungan baru.</li>
                    <li><strong>Optimis:</strong> Selalu melihat sisi terang dari setiap situasi.</li>
                </ul>
                <h4>Area Pertumbuhan:</h4>
                <p>Sanguinis terkadang berjuang dengan kedisiplinan waktu, konsistensi, dan perhatian pada detail-detail kecil.</p>
            `
        },
        {
            id: 'bab-2',
            title: 'Bab 2: Koleris yang Kuat',
            type: 'READING',
            content: `
                <h3>Koleris: Kepribadian yang Orientasi Pada Hasil</h3>
                <p>Tipe Koleris adalah pemimpin alami yang berani, berorientasi pada target, dan bertekad kuat dalam menyelesaikan tantangan.</p>
                <h4>Ciri Utama Koleris:</h4>
                <ul>
                    <li><strong>Tegas & Berani:</strong> Cepat mengambil keputusan dan berani mengambil risiko.</li>
                    <li><strong>Orientasi Hasil:</strong> Berfokus pada pencapaian tujuan dan efisiensi kerja.</li>
                    <li><strong>Mandiri:</strong> Memiliki rasa percaya diri yang tinggi dan tidak mudah menyerah.</li>
                </ul>
                <h4>Area Pertumbuhan:</h4>
                <p>Koleris perlu belajar untuk lebih bersabar, mendengarkan pendapat orang lain, dan menunjukkan rasa empati.</p>
            `
        },
        {
            id: 'bab-3',
            title: 'Bab 3: Melankolis yang Sempurna',
            type: 'READING',
            content: `
                <h3>Melankolis: Kepribadian yang Mendalam dan Analitis</h3>
                <p>Tipe Melankolis adalah pemikir mendalam yang sangat memperhatikan detail, memiliki standar tinggi, dan sangat terorganisir.</p>
                <h4>Ciri Utama Melankolis:</h4>
                <ul>
                    <li><strong>Analitis & Rinci:</strong> Sangat cermat dalam mengamati dan memproses informasi.</li>
                    <li><strong>Setia & Serius:</strong> Menghargai komitmen, kualitas kerja, dan keteraturan.</li>
                    <li><strong>Perfeksionis:</strong> Selalu berusaha memberikan hasil terbaik yang sempurna.</li>
                </ul>
                <h4>Area Pertumbuhan:</h4>
                <p>Melankolis perlu mengelola kecenderungan terlalu mengkritik diri sendiri dan terlalu lama berpikir sebelum mengambil tindakan.</p>
            `
        },
        {
            id: 'bab-4',
            title: 'Bab 4: Plegmatis yang Damai',
            type: 'READING',
            content: `
                <h3>Plegmatis: Kepribadian yang Tenang dan Diplomatis</h3>
                <p>Tipe Plegmatis adalah pembawa kedamaian yang sabar, dapat diandalkan, dan selalu berusaha menjaga keharmonisan dalam kelompok.</p>
                <h4>Ciri Utama Plegmatis:</h4>
                <ul>
                    <li><strong>Tenang & Sabar:</strong> Tidak mudah panik dan mampu meredakan ketegangan.</li>
                    <li><strong>Diplomatis:</strong> Pendengar yang baik dan pendamai dalam konflik.</li>
                    <li><strong>Konsisten:</strong> Bekerja secara stabil dan sangat dapat diandalkan.</li>
                </ul>
                <h4>Area Pertumbuhan:</h4>
                <p>Plegmatis perlu terdorong untuk lebih proaktif, mengambil inisiatif, dan mengekspresikan pandangan pribadinya.</p>
            `
        },
        {
            id: 'ringkasan',
            title: 'Ringkasan: Harmoni Empat Temperamen',
            type: 'READING',
            content: `
                <h3>Menyelaraskan Temperamen dalam Kehidupan</h3>
                <p>Tidak ada satu tipe temperamen yang lebih baik daripada yang lain. Setiap tipe membawa kontribusi unik yang saling melengkapi dalam keluarga, tim kerja, maupun masyarakat.</p>
                <div class="tc-summary-grid">
                    <div class="tc-summary-box sanguin"><strong>Sanguinis:</strong> Memberikan kegembiraan dan semangat.</div>
                    <div class="tc-summary-box koleris"><strong>Koleris:</strong> Mendorong kemajuan dan pencapaian target.</div>
                    <div class="tc-summary-box melankolis"><strong>Melankolis:</strong> Menjaga kualitas dan ketelitian.</div>
                    <div class="tc-summary-box plegmatis"><strong>Plegmatis:</strong> Memelihara kedamaian dan keharmonisan.</div>
                </div>
                <p>Dengan memahami kombinasi temperamen diri sendiri dan orang lain, kita dapat berkomunikasi lebih efektif dan meminimalkan konflik.</p>
            `
        },
        {
            id: 'tes-pemahaman',
            title: 'Tes Pemahaman Temperamen',
            type: 'QUIZ',
            questions: [
                {
                    id: 'q1',
                    question: 'Tipe kepribadian manakah yang dikenal sebagai pemikir analitis, teratur, dan sangat memperhatikan detail?',
                    options: ['Sanguinis', 'Koleris', 'Melankolis', 'Plegmatis'],
                    answerIndex: 2
                },
                {
                    id: 'q2',
                    question: 'Tipe kepribadian manakah yang berorientasi pada hasil, tegas, dan memiliki jiwa kepemimpinan alami?',
                    options: ['Melankolis', 'Koleris', 'Plegmatis', 'Sanguinis'],
                    answerIndex: 1
                },
                {
                    id: 'q3',
                    question: 'Apa karakteristik utama dari tipe Plegmatis?',
                    options: ['Eksplosif dan ekspresif', 'Tenang, sabar, dan menyukai kedamaian', 'Cepat mengambil risiko tanpa analisis', 'Suka menjadi pusat perhatian'],
                    answerIndex: 1
                }
            ]
        }
    ]
});

export const AI_LEARNING_CATALOG = deepFreezeDTO([
    {
        id: 'ai-intro',
        icon: '🧠',
        title: 'Pengantar Artificial Intelligence',
        description: 'Konsep dasar kecerdasan buatan, sejarah perkembangan, dan dampaknya pada kehidupan modern.',
        badge: 'Dasar'
    },
    {
        id: 'ai-ml-basics',
        icon: '📊',
        title: 'Machine Learning Dasar',
        description: 'Prinsip kerja pembelajaran mesin, pola algoritma, serta pemrosesan data secara sistematis.',
        badge: 'Dasar'
    },
    {
        id: 'ai-genai',
        icon: '🎨',
        title: 'Generative AI',
        description: 'Eksplorasi teknologi pembuat konten otomatis berbasis AI seperti teks, gambar, dan audio.',
        badge: 'Menengah'
    },
    {
        id: 'ai-llm',
        icon: '💬',
        title: 'Large Language Models (LLM)',
        description: 'Cara kerja model bahasa berskala besar dalam memahami dan menghasilkan teks alami.',
        badge: 'Menengah'
    },
    {
        id: 'ai-prompt-eng',
        icon: '⚙️',
        title: 'Prompt Engineering',
        description: 'Teknik merumuskan instruksi presisi untuk mengoptimalkan luaran sistem AI.',
        badge: 'Menengah'
    },
    {
        id: 'ai-productivity',
        icon: '⚡',
        title: 'AI untuk Produktivitas',
        description: 'Strategi penerapan alat kecerdasan buatan untuk mempercepat alur kerja harian.',
        badge: 'Praktis'
    },
    {
        id: 'ai-business',
        icon: '💼',
        title: 'AI untuk Bisnis',
        description: 'Pemanfaatan kecerdasan buatan dalam riset pasar, analisis tren, dan strategi operasional.',
        badge: 'Lanjutan'
    },
    {
        id: 'ai-education',
        icon: '🎓',
        title: 'AI untuk Pendidikan',
        description: 'Penggunaan AI dalam personalisasi pembelajaran, pembuatan materi, dan studi mandiri.',
        badge: 'Praktis'
    },
    {
        id: 'ai-ethics',
        icon: '🛡️',
        title: 'AI Ethics',
        description: 'Prinsip privasi, keamanan data, bias algoritma, dan tanggung jawab penggunaan teknologi.',
        badge: 'Penting'
    },
    {
        id: 'ai-tools',
        icon: '🛠️',
        title: 'Tools AI Populer',
        description: 'Katalog dan pemetaan fungsi alat kecerdasan buatan terdepan di berbagai industri.',
        badge: 'Segera Hadir'
    }
]);

export default {
    PERSONALITY_PLUS_COURSE,
    AI_LEARNING_CATALOG
};
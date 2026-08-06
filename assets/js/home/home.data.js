/**
 * TOPCARE AI PLATFORM V2 — HOME DOMAIN DATA (SSOT)
 * Path: assets/js/home/home.data.js
 * Status: APPROVED & LOCKED
 * SRP: Static DTO Content Data for Home Ecosystem Landing Page.
 */

export const HOME_DATA = {
    hero: {
        badge: '✨ TopCare AI Platform V2.0',
        title: 'Platform AI untuk Belajar, Berkembang & Berkarya',
        subtitle: 'Ekosistem terpadu yang menggabungkan pembelajaran Artificial Intelligence, Personality Development, Creator Hub, Komunitas Global, dan Layanan Premium.',
        memberCount: '10.000+ Member Aktif',
        memberNote: 'Bergabung dan mulai perjalananmu hari ini'
    },

    overviewDomains: [
        { icon: '🧠', title: 'Personality Development', desc: 'Pahami karakter diri, komunikasi, dan kepemimpinan berdasarkan konsep empat temperamen.' },
        { icon: '🤖', title: 'AI Learning Center', desc: 'Modul pembelajaran kecerdasan buatan terstruktur dari tingkat Dasar, Menengah, hingga Mahir.' },
        { icon: '🎨', title: 'Creator Ecosystem', desc: 'Resource lengkap mencakup koleksi Prompt AI, E-book panduan digital, dan Artikel wawasan.' },
        { icon: '🌐', title: 'Global Community', desc: 'Ruang kolaborasi dan tumbuh bersama pengguna serta praktisi AI dan pengembangan diri.' },
        { icon: '💎', title: 'Premium Center', desc: 'Pusat informasi roadmap pengembangan masa depan dan layanan eksklusif TopCare AI.' }
    ],

    learningCenterCards: [
        {
            badge: 'Personality Plus',
            title: 'Pengembangan Diri & Temperamen',
            desc: 'Eksplorasi mendalam karakter Koleris, Sanguinis, Melankolis, dan Plegmatis karya Florence Littauer.',
            link: '#/personality'
        },
        {
            badge: 'AI Learning',
            title: 'Pembelajaran Artificial Intelligence',
            desc: 'Kurikulum bertingkat meliputi konsep AI Dasar, Generative AI, Prompt Engineering, hingga Machine Learning.',
            link: '#/learning'
        }
    ],

    creatorHighlights: [
        { icon: '🤖', title: 'Prompt Collection', desc: 'Instruksi AI siap pakai untuk meningkatkan efisiensi dan produktivitas kerja.' },
        { icon: '📘', title: 'E-book Digital', desc: 'Buku panduan praktis penerapan AI dan strategi kepribadian.' },
        { icon: '📰', title: 'Artikel Wawasan', desc: 'Ulasan edukatif seputar tren kecerdasan buatan dan dinamika sosial.' }
    ],

    featuredModules: [
        { category: 'AI Learning', title: 'Pengantar Kecerdasan Buatan & ML', level: 'Level 1 Dasar' },
        { category: 'Personality Plus', title: 'Empat Temperamen Kepribadian', level: 'Modul Interaktif' },
        { category: 'AI Ethics', title: 'Etika, Privasi & Keamanan Data AI', level: 'Level 1 Dasar' },
        { category: 'Prompt Engineering', title: 'Struktur Prompt untuk Produktivitas', level: 'Level 2 Menengah' },
        { category: 'Statistics & Math', title: 'Konsep Dasar Matematika Data', level: 'Level 1 Dasar' }
    ],

    platformRoadmap: [
        { phase: '1. Learning', desc: 'Fondasi Pembelajaran AI & Personality' },
        { phase: '2. Creator', desc: 'Pusat Resource Prompt, E-book & Artikel' },
        { phase: '3. Community', desc: 'Ekosistem Kolaborasi & Diskusi' },
        { phase: '4. Premium', desc: 'Akselerasi Layanan & Fitur Eksklusif' },
        { phase: '5. Enterprise', desc: 'Solusi Ruang Kerja Tim & Industri' }
    ],

    partners: [
        { name: 'Google' },
        { name: 'Microsoft' },
        { name: 'OpenAI' },
        { name: 'NVIDIA' },
        { name: 'AWS' },
        { name: 'Meta' },
        { name: 'Adobe' },
        { name: 'Canva' }
    ],

    features: [
        { icon: '🤖', title: 'AI Assistant', desc: 'Pendamping cerdas untuk belajar dan produktivitas Anda.' },
        { icon: '🗣️', title: 'Personality Test', desc: 'Kenali tipe temperamen dasar dan kembangkan dirimu.' },
        { icon: '🎓', title: 'Learning Center', desc: 'Ratusan kursus berkualitas untuk tingkatkan skill Anda.' },
        { icon: '💬', title: 'Prompt Marketplace', desc: 'Temukan prompt terbaik untuk berbagai kebutuhan AI.' },
        { icon: '📚', title: 'E-Library & Ebook', desc: 'Koleksi ebook premium dan gratis untuk Anda.' },
        { icon: '👥', title: 'Community Hub', desc: 'Bergabung dengan komunitas positif dan inspiratif.' },
        { icon: '🖋️', title: 'Creator Platform', desc: 'Jadi kreator dan bagikan karya & ilmu Anda.' }
    ],

    stats: [
        { icon: '👥', num: '10.000+', label: 'Member Aktif' },
        { icon: '📖', num: '500+', label: 'Kursus & Materi' },
        { icon: '📄', num: '1.000+', label: 'Ebook & Artikel' },
        { icon: '🌐', num: '50+', label: 'Negara' },
        { icon: '🤍', num: '98%', label: 'Kepuasan Member' }
    ],

    articles: [
        {
            category: 'Artificial Intelligence',
            title: 'Mengenal AI Generatif untuk Pemula',
            desc: 'Pelajari dasar-dasar AI generatif dan bagaimana teknologi ini membantu produktivitas.',
            date: '20 Mei 2026',
            readTime: '5 min read'
        },
        {
            category: 'Personal Development',
            title: '4 Tipe Kepribadian dan Cara Mengembangkannya',
            desc: 'Memahami kepribadian diri adalah kunci untuk mencapai potensi maksimal.',
            date: '18 Mei 2026',
            readTime: '6 min read'
        },
        {
            category: 'Productivity',
            title: 'Prompt Engineering untuk Hasil Maksimal',
            desc: 'Teknik menulis prompt yang efektif untuk mendapatkan hasil AI yang lebih baik.',
            date: '17 Mei 2026',
            readTime: '7 min read'
        }
    ],

    faqs: [
        { q: 'Apa itu TopCare AI Platform V2?', a: 'TopCare AI adalah platform edukasi modern yang mengintegrasikan pembelajaran AI, pengembangan kepribadian Personality Plus, dan ekosistem Creator.' },
        { q: 'Bagaimana cara memulai pembelajaran?', a: 'Anda dapat masuk ke menu Belajar untuk mengakses modul AI atau memilih menu Personality untuk tes kepribadian.' },
        { q: 'Di mana saya dapat menemukan Prompt AI dan E-book?', a: 'Seluruh resource seperti Prompt AI, E-book, dan Artikel dapat diakses melalui menu Creator.' }
    ]
};

export default HOME_DATA;
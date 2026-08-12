/**
 * TOPCARE AI PLATFORM V2 — MBTI DATA & QUESTION BANK
 * Path: assets/js/pages/mbti/mbti.data.js
 * SRP: Provides 24 balanced natural questions and 16 MBTI profile definitions.
 */

export const MBTI_QUESTIONS = Object.freeze([
    // === EXTRAVERSION (E) vs INTROVERSION (I) — 6 Pertanyaan ===
    {
        id: 1,
        dimension: "EI",
        question: "Setelah minggu kerja yang panjang dan melelahkan, bagaimana cara Anda mengisi ulang energi?",
        options: [
            { text: "Berkumpul dengan teman-teman atau menghadiri kegiatan sosial.", trait: "E" },
            { text: "Menikmati waktu tenang di rumah sendirian atau bersama keluarga terdekat.", trait: "I" }
        ]
    },
    {
        id: 2,
        dimension: "EI",
        question: "Saat berada di lingkungan baru atau acara komunitas, Anda biasanya...",
        options: [
            { text: "Mudah memulai percakapan dengan orang-orang baru.", trait: "E" },
            { text: "Cenderung menunggu orang lain menyapa terlebih dahulu.", trait: "I" }
        ]
    },
    {
        id: 3,
        dimension: "EI",
        question: "Dalam memproses ide atau memecahkan masalah, Anda cenderung...",
        options: [
            { text: "Membicarakannya secara terbuka dan mendiskusikannya dengan orang lain.", trait: "E" },
            { text: "Merenungkannya secara mendalam di dalam pikiran sebelum mengutarakannya.", trait: "I" }
        ]
    },
    {
        id: 4,
        dimension: "EI",
        question: "Lingkungan kerja seperti apa yang paling membuat Anda nyaman?",
        options: [
            { text: "Dinamis, penuh interaksi, dan banyak kolaborasi tim.", trait: "E" },
            { text: "Tenang, minim gangguan, dan memberikan ruang untuk fokus mandiri.", trait: "I" }
        ]
    },
    {
        id: 5,
        dimension: "EI",
        question: "Bagaimana tanggapan Anda terhadap kegiatan yang spontan dan ramai?",
        options: [
            { text: "Menyambutnya dengan antusias karena memberi semangat baru.", trait: "E" },
            { text: "Membutuhkan jeda atau persiapan mental sebelum bergabung.", trait: "I" }
        ]
    },
    {
        id: 6,
        dimension: "EI",
        question: "Orang lain sering mengenali Anda sebagai pribadi yang...",
        options: [
            { text: "Ekspresif, terbuka, dan mudah diajak berkomunikasi.", trait: "E" },
            { text: "Tenang, privat, dan butuh waktu untuk benar-benar terbuka.", trait: "I" }
        ]
    },

    // === SENSING (S) vs INTUITION (N) — 6 Pertanyaan ===
    {
        id: 7,
        dimension: "SN",
        question: "Saat mempelajari hal baru, fokus utama Anda adalah pada...",
        options: [
            { text: "Fakta konkret, data rinci, dan aplikasi praktis saat ini.", trait: "S" },
            { text: "Konsep besar, pola masa depan, dan kemungkinan yang bisa dikembangkan.", trait: "N" }
        ]
    },
    {
        id: 8,
        dimension: "SN",
        question: "Ketika membaca petunjuk atau arahan tugas, Anda lebih suka...",
        options: [
            { text: "Instruksi yang rinci, bertahap, dan terstruktur jelas.", trait: "S" },
            { text: "Gambaran umum dan kebebasan untuk menentukan cara sendiri.", trait: "N" }
        ]
    },
    {
        id: 9,
        dimension: "SN",
        question: "Dalam percakapan sehari-hari, Anda cenderung lebih tertarik pada...",
        options: [
            { text: "Pengalaman nyata dan peristiwa faktual yang sedang terjadi.", trait: "S" },
            { text: "Gagasan abstrak, teori, mimpi, atau gagasan inovatif.", trait: "N" }
        ]
    },
    {
        id: 10,
        dimension: "SN",
        question: "Bagaimana cara Anda menyelesaikan proyek atau pekerjaan?",
        options: [
            { text: "Menggunakan metode teruji yang sudah terbukti efektif.", trait: "S" },
            { text: "Mencoba pendekatan baru yang lebih kreatif dan tidak biasa.", trait: "N" }
        ]
    },
    {
        id: 11,
        dimension: "SN",
        question: "Saat mengamati sesuatu, Anda adalah tipe orang yang...",
        options: [
            { text: "Sangat teliti terhadap rincian dan fakta fisik yang ada di depan mata.", trait: "S" },
            { text: "Cepat melihat implikasi, makna tersirat, dan hubungan antar hal.", trait: "N" }
        ]
    },
    {
        id: 12,
        dimension: "SN",
        question: "Orang sering menganggap pandangan Anda lebih...",
        options: [
            { text: "Realistis, pragmatis, dan membumi.", trait: "S" },
            { text: "Imajinatif, visioner, dan penuh ide.", trait: "N" }
        ]
    },

    // === THINKING (T) vs FEELING (F) — 6 Pertanyaan ===
    {
        id: 13,
        dimension: "TF",
        question: "Ketika menghadapi masalah besar, biasanya Anda...",
        options: [
            { text: "Menganalisis sebab-akibat secara objektif dan logis.", trait: "T" },
            { text: "Mempertimbangkan dampaknya terhadap perasaan orang-orang yang terlibat.", trait: "F" }
        ]
    },
    {
        id: 14,
        dimension: "TF",
        question: "Dalam memberikan masukan atau kritik kepada teman, Anda cenderung...",
        options: [
            { text: "Menyampaikan kebenaran secara langsung dan jujur apa adanya.", trait: "T" },
            { text: "Menyampaikannya dengan bijaksana agar tidak melukai perasaan.", trait: "F" }
        ]
    },
    {
        id: 15,
        dimension: "TF",
        question: "Prinsip apa yang lebih mendasari keputusan penting Anda?",
        options: [
            { text: "Keadilan, konsistensi aturan, dan kebenaran objektif.", trait: "T" },
            { text: "Keharmonisan, empati, dan kebaikan antar sesama.", trait: "F" }
        ]
    },
    {
        id: 16,
        dimension: "TF",
        question: "Saat terjadi konflik di dalam kelompok, prioritas Anda adalah...",
        options: [
            { text: "Mencari akar permasalahan logis dan menemukan solusi terbaik.", trait: "T" },
            { text: "Meredakan ketegangan dan memastikan hubungan tetap terjaga baik.", trait: "F" }
        ]
    },
    {
        id: 17,
        dimension: "TF",
        question: "Anda merasa lebih dihargai ketika orang lain mengakui...",
        options: [
            { text: "Kompetensi, kecerdasan, dan efisiensi kerja Anda.", trait: "T" },
            { text: "Kepedulian, kehangatan, dan ketulusan hati Anda.", trait: "F" }
        ]
    },
    {
        id: 18,
        dimension: "TF",
        question: "Dalam situasi mendesak, cara berpikir Anda cenderung lebih...",
        options: [
            { text: "Kritis dan terfokus pada angka atau fakta objektif.", trait: "T" },
            { text: "Humanis dan terfokus pada kesejahteraan nilai kemanusiaan.", trait: "F" }
        ]
    },

    // === JUDGING (J) vs PERCEIVING (P) — 6 Pertanyaan ===
    {
        id: 19,
        dimension: "JP",
        question: "Bagaimana cara Anda mengelola aktivitas dan jadwal harian?",
        options: [
            { text: "Membuat agenda terencana dan berusaha mematuhinya secara teratur.", trait: "J" },
            { text: "Membiarkan alur jadwal mengalir secara fleksibel dan spontan.", trait: "P" }
        ]
    },
    {
        id: 20,
        dimension: "JP",
        question: "Ketika menghadapi tenggat waktu (deadline) proyek, Anda...",
        options: [
            { text: "Menyelesaikannya jauh-jauh hari agar merasa tenang.", trait: "J" },
            { text: "Bekerja lebih optimal dan kreatif saat mendekati batas waktu.", trait: "P" }
        ]
    },
    {
        id: 21,
        dimension: "JP",
        question: "Mengenai ruang kerja dan kerapian dokumen Anda...",
        options: [
            { text: "Suka mengelompokkan barang dengan rapi dan terorganisir.", trait: "J" },
            { text: "Nyaman dengan kondisi yang adaptif selama barang mudah ditemukan.", trait: "P" }
        ]
    },
    {
        id: 22,
        dimension: "JP",
        question: "Saat merencanakan liburan atau perjalanan jauh, Anda biasanya...",
        options: [
            { text: "Menyusun rute, tempat tinggal, dan jadwal kegiatan secara detail.", trait: "J" },
            { text: "Menentukan tujuan utama saja dan membiarkan sisanya mengalir.", trait: "P" }
        ]
    },
    {
        id: 23,
        dimension: "JP",
        question: "Bagaimana perasaan Anda ketika rencana yang disusun berubah mendadak?",
        options: [
            { text: "Agak terganggu karena menyukai kejelasan dan kepastian.", trait: "J" },
            { text: "Santai dan mudah menyesuaikan diri dengan situasi baru.", trait: "P" }
        ]
    },
    {
        id: 24,
        dimension: "JP",
        question: "Dalam mengambil keputusan terkait tindakan harian, Anda lebih suka...",
        options: [
            { text: "Segera memutuskan agar ada kepastian langkah selanjutnya.", trait: "J" },
            { text: "Menunda keputusan akhir untuk mengumpulkan lebih banyak pilihan.", trait: "P" }
        ]
    }
]);

export const MBTI_PROFILES = Object.freeze({
    ISTJ: {
        code: "ISTJ",
        name: "The Inspector (Inspektur)",
        shortDescription: "Pribadi yang tekun, bertanggung jawab, dan sangat menghargai fakta serta ketertiban terstruktur.",
        strengths: ["Sangat teratur & terencana", "Jujur & bertanggung jawab", "Fokus pada fakta nyata"],
        challenges: ["Cenderung kaku terhadap perubahan", "Bisa terlalu menghakimi jika aturan dilanggar"],
        learningStyle: "Suka alur belajar terstruktur, langkah demi langkah, dengan panduan yang jelas.",
        workStyle: "Sangat dapat diandalkan dalam tugas mandiri yang membutuhkan ketelitian tinggi."
    },
    ISFJ: {
        code: "ISFJ",
        name: "The Protector (Pelindung)",
        shortDescription: "Pribadi yang hangat, setia, dan penuh perhatian dalam menjaga kesejahteraan lingkungan sekitarnya.",
        strengths: ["Sangat suportif & empatik", "Teliti & cermat", "Setia pada komitmen"],
        challenges: ["Sering enggan menerima perubahan mendadak", "Cenderung memendam beban pribadi"],
        learningStyle: "Menyukai materi praktis yang memberikan dampak positif nyata bagi orang lain.",
        workStyle: "Bekerja dengan cermat di balik layar untuk memastikan seluruh sistem berjalan harmonis."
    },
    INFJ: {
        code: "INFJ",
        name: "The Advocate (Penganjur)",
        shortDescription: "Pendiam namun memiliki visi intuitif tajam, idealis, dan berkomitmen tinggi pada nilai kemanusiaan.",
        strengths: ["Visioner & penuh empati", "Memiliki prinsip moral kuat", "Pemikir mendalam"],
        challenges: ["Bisa terlalu perfeksionis", "Rentan mengalami kelelahan emosional (burnout)"],
        learningStyle: "Menyukai diskusi konsep mendalam tentang potensi manusia dan pengembangan diri.",
        workStyle: "Fokus pada pekerjaan yang selaras dengan misi dan nilai personal jangka panjang."
    },
    INTJ: {
        code: "INTJ",
        name: "The Architect (Arsitek)",
        shortDescription: "Pemikir strategis yang inovatis, analitis, dan memiliki dorongan kuat untuk menyempurnakan sistem.",
        strengths: ["Berpikir strategis & terstruktur", "Mandiri & percaya diri", "Visioner analitis"],
        challenges: ["Bisa terlihat terlalu kritis", "Cenderung kurang sabar terhadap proses yang tidak efisien"],
        learningStyle: "Belajar secara mandiri melalui eksplorasi teori, sistem kompleks, dan arsitektur logis.",
        workStyle: "Unggul dalam merancang kerangka kerja jangka panjang dan pemecahan masalah rumit."
    },
    ISTP: {
        code: "ISTP",
        name: "The Craftsman (Pengrajin)",
        shortDescription: "Pengamat yang tenang, praktis, dan cepat menganalisis mekanisme kerja suatu alat atau situasi.",
        strengths: ["Sangat praktis & analitis", "Tenang dalam krisis", "Cepat beradaptasi"],
        challenges: ["Bisa cepat merasa bosan dengan rutinitas", "Terkadang tampak acuh secara emosional"],
        learningStyle: "Sangat menyukai metode belajar langsung (hands-on) dan eksperimen mandiri.",
        workStyle: "Efektif dalam memecahkan masalah teknis secara cepat dan efisien tanpa banyak kendala."
    },
    ISFP: {
        code: "ISFP",
        name: "The Composer (Seniman)",
        shortDescription: "Pribadi yang ramah, artistik, dan sensitif yang menikmati momen saat ini dengan kebebasan ekspresi.",
        strengths: ["Kreatif & fleksibel", "Penuh empati & hangat", "Menghargai keindahan alami"],
        challenges: ["Sulit menerima kritik keras", "Kurang menyukai perencanaan yang terlalu kaku"],
        learningStyle: "Belajar lebih baik melalui pendekatan visual, eksperimen rasa, dan kebebasan kreasi.",
        workStyle: "Suka lingkungan yang fleksibel dan memberi ruang untuk ekspresi nilai personal."
    },
    INFP: {
        code: "INFP",
        name: "The Healer (Idealist)",
        shortDescription: "Pribadi yang puitis, terbuka, dan didorong oleh nilai-nilai internal serta pencarian makna hidup.",
        strengths: ["Sangat kreatif & otentik", "Empati mendalam", "Open-minded"],
        challenges: ["Sering merasa terlalu idealis", "Kesulitan mengelola rincian administrasi kaku"],
        learningStyle: "Menyukai materi pembelajaran yang memberi ruang refleksi diri dan inovasi cerita.",
        workStyle: "Bekerja penuh dedikasi ketika tugas yang dijalani sesuai dengan nilai inti pribadinya."
    },
    INTP: {
        code: "INTP",
        name: "The Thinker (Pemikir)",
        shortDescription: "Peneliti yang berpengetahuan luas, logis, dan selalu penasaran terhadap pola serta konsep baru.",
        strengths: ["Sangat analitis & objektif", "Inovatif & berpikiran terbuka", "Cepat menangkap konsep"],
        challenges: ["Cenderung ragu-ragu karena terlalu banyak analisis", "Kurang tertarik pada detail emosional"],
        learningStyle: "Suka membedah teori, logika mendasar, dan mengeksplorasi ide abstrak.",
        workStyle: "Unggul dalam riset konsep dan formulasi gagasan pemecahan masalah kompleks."
    },
    ESTP: {
        code: "ESTP",
        name: "The Dynamo (Penggerak)",
        shortDescription: "Pribadi yang energik, spontan, dan bertindak cepat berdasarkan fakta konkret di sekitarnya.",
        strengths: ["Cepat mengambil keputusan", "Berani & adaptif", "Komunikator komunikatif"],
        challenges: ["Cenderung impulsif", "Kurang sabar dengan penjelasan teori yang terlalu panjang"],
        learningStyle: "Belajar paling cepat melalui aksi nyata, stimulasi langsung, dan studi kasus praktis.",
        workStyle: "Sangat handal dalam mengeksekusi peluang bisnis dan menyelesaikan masalah darurat."
    },
    ESFP: {
        code: "ESFP",
        name: "The Performer (Penampil)",
        shortDescription: "Pribadi yang antusias, ramah, dan membawa energi kegembiraan di mana pun mereka berada.",
        strengths: ["Sangat sosialis & hangat", "Optimis & praktis", "Pandai mencairkan suasana"],
        challenges: ["Mudah terdistraksi dari fokus jangka panjang", "Cenderung menghindari konflik"],
        learningStyle: "Menyukai pembelajaran interaktif, penuh permainan peran, dan interaksi kelompok.",
        workStyle: "Sangat fleksibel dan unggul dalam pekerjaan yang melibatkan pelayanan dan orang banyak."
    },
    ENFP: {
        code: "ENFP",
        name: "The Campaigner (Juara)",
        shortDescription: "Pribadi yang penuh semangat, kreatif, dan selalu melihat potensi tak terbatas pada orang lain.",
        strengths: ["Sangat antusias & imajinatif", "Punya empati sosial tinggi", "Komunikator ulung"],
        challenges: ["Terkadang kesulitan menyelesaikan detail akhir", "Mudah merasa kewalahan oleh ide sendiri"],
        learningStyle: "Suka berdiskusi curah pendapat (brainstorming) dan mencoba banyak topik baru sekaligus.",
        workStyle: "Penuh ide segar dan pembawa semangat positif di dalam tim kolaboratif."
    },
    ENTP: {
        code: "ENTP",
        name: "The Visionary (Inovator)",
        shortDescription: "Cerdas, kritis, dan gemar berdiskusi gagasan untuk menantang status quo secara konstruktif.",
        strengths: ["Sangat inovatif & cerdas", "Cepat berpikir & fleksibel", "Suka tantangan ide"],
        challenges: ["Sering berdebat hanya untuk menguji ide", "Kurang konsisten dalam pelaksanaan rutin"],
        learningStyle: "Menyukai tantangan pemikiran kognitif, eksplorasi strategi baru, dan debat konseptual.",
        workStyle: "Pencetus ide besar yang ahli menemukan peluang baru yang belum dipikirkan orang lain."
    },
    ESTJ: {
        code: "ESTJ",
        name: "The Executive (Eksekutif)",
        shortDescription: "Pengorganisasi yang efisien, berorientasi pada hasil, dan tegas dalam menegakkan aturan.",
        strengths: ["Sangat terorganisir & efisien", "Tegas & berdedikasi", "Kepemimpinan kuat"],
        challenges: ["Bisa terlalu kaku terhadap aturan", "Kurang peka terhadap nuansa perasaan halus"],
        learningStyle: "Menyukai struktur pembelajaran sistematis dengan indikator keberhasilan terukur.",
        workStyle: "Unggul dalam mengelola proyek, mengoordinasikan tim, dan mengeksekusi target terencana."
    },
    ESFJ: {
        code: "ESFJ",
        name: "The Provider (Pengasuh)",
        shortDescription: "Pribadi yang kooperatif, ramah, dan berdedikasi menciptakan keharmonisan sosial di lingkungannya.",
        strengths: ["Sangat setia & dapat diandalkan", "Pandai membangun hubungan", "Praktis & cermat"],
        challenges: ["Rentan terlalu memikirkan anggapan orang lain", "Kurang nyaman dengan konflik terbuka"],
        learningStyle: "Belajar lebih baik dalam suasana kelompok yang suportif dan saling membantu.",
        workStyle: "Sangat cermat dalam memastikan kebutuhan seluruh anggota tim terpenuhi dengan baik."
    },
    ENFJ: {
        code: "ENFJ",
        name: "The Teacher (Pengajar)",
        shortDescription: "Pemimpin karismatis, empatik, dan inspiratif yang pandai mengembakan potensi orang lain.",
        strengths: ["Karismatik & menginspirasi", "Empati tinggi", "Komunikator persuasive"],
        challenges: ["Cenderung terlalu memikul beban orang lain", "Bisa terlalu idealis"],
        learningStyle: "Suka diskusi kolaboratif yang berfokus pada pengembangan nilai kepemimpinan positif.",
        workStyle: "Mampu memotivasi tim dan membimbing orang lain mencapai kinerja puncak bersama."
    },
    ENTJ: {
        code: "ENTJ",
        name: "The Commander (Komandan)",
        shortDescription: "Pemimpin yang berani, strategis, dan berorientasi pada pencapaian target jangka panjang.",
        strengths: ["Pemimpin alami & tegas", "Sangat strategis & efisien", "Percaya diri tinggi"],
        challenges: ["Bisa terlihat terlalu dominan atau tidak sabar", "Cenderung mengesampingkan emosi"],
        learningStyle: "Menyukai materi kepemimpinan tingkat lanjut, manajemen risiko, dan arsitektur bisnis.",
        workStyle: "Sangat kuat dalam mengambil keputusan strategis dan memimpin organisasi besar."
    }
});
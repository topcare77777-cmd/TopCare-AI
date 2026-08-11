/**
 * TOPCARE AI PLATFORM V2 — CONVERSATION ENGINE
 * Path: assets/js/coach/conversation/coach-conversation-engine.js
 * Status: APPROVED & SMART INTENT DETECTION (RELATIONSHIP & DYNAMIC TYPO HANDLER)
 */

export class CoachConversationEngine {
    constructor() {
        this.personalityType = localStorage.getItem('user_personality') || 'Melankolis';
        this.lastFallbackIndex = -1;
    }

    processInput(userInput) {
        const safeInput = String(userInput || '');
        const query = safeInput.toLowerCase().trim();

        this.personalityType = localStorage.getItem('user_personality') || 'Melankolis';
        const pType = this.personalityType;

        if (!query || query === '[object mouseevent]' || query === '[object event]') {
            return `Silakan ketikkan pertanyaan Anda, saya siap memandu Anda sebagai pendamping berkarakter ${pType}.`;
        }

        const containsAny = (words) => words.some(word => query.includes(word));

        // ==========================================
        // DETEKSI TYPO NAMA TEMPERAMEN (SANGAT FLEKSIBEL)
        // ==========================================
        const isKoleris = containsAny(['koleris', 'colleris', 'choleris', 'collery', 'kolery', 'kolerik', 'coleris', 'kolaris', 'colaris']);
        const isSanguinis = containsAny(['sanguinis', 'sangwinis', 'sanguin', 'sangwin', 'sanguines', 'sangguinis']);
        const isMelankolis = containsAny(['melankolis', 'melankoli', 'melancolis', 'melankolik', 'meloncolis', 'melancholic', 'melangcolis']);
        const isPlegmatis = containsAny(['plegmatis', 'pelekmatis', 'pelek mati', 'plegma', 'flegmatis', 'phlegmatic', 'plekmatis', 'pregmatis', 'pregis', 'prekmatis']);

        // ==========================================
        // 1. SAPAAN & KABAR
        // ==========================================
        if (containsAny(['halo', 'hai', 'pagi', 'siang', 'sore', 'malam', 'hei', 'kabar', 'hi', 'salam'])) {
            return `Halo! Kabar saya sangat baik. Sebagai pendamping dengan pendekatan ${pType}, saya siap membantu Anda belajar AI dan mengembangkan potensi diri hari ini. Apa yang ingin Anda diskusikan?`;
        }

        // ==========================================
        // 2. TERIMA KASIH / PENUTUP
        // ==========================================
        if (containsAny(['terima kasih', 'makasih', 'thanks', 'oke', 'baiklah', 'sip', 'mantap', 'siap', 'okey', 'bagus'])) {
            return `Sama-sama! Jika ada hal lain yang ingin Anda eksplorasi, baik itu tentang materi AI maupun pengembangan karakter ${pType} Anda, jangan ragu untuk bertanya.`;
        }

        // ==========================================
        // 3. CURHAT / EMOSI (MALAS, BOSAN, CAPEK)
        // ==========================================
        if (containsAny(['malas', 'males', 'bosan', 'jenuh', 'capek', 'lelah', 'mager', 'enggan', 'pusing'])) {
            return `Merasa ${query.includes('malas') || query.includes('males') ? 'malas' : 'jenuh'} itu sangat wajar kok! Sebagai seorang ${pType}, Anda tidak perlu memaksakan diri maraton belajar sekaligus. Coba mulai dari hal terkecil dulu, misalnya membaca 1 paragraf atau mencoba 1 prompt AI santai selama 3 menit. Mau coba yang ringan-ringan dulu?`;
        }

        // ==========================================
        // 4. HUBUNGAN / DINAMIKA RELASI ANTARA DUA KARAKTER (PRIORITAS KHUSUS)
        // ==========================================
        if (containsAny(['hubungan', 'relasi', 'dinamika', 'pasangan', 'interaksi antara', 'antara'])) {
            if (isPlegmatis && isSanguinis) {
                return `Dinamika Plegmatis & Sanguinis: Plegmatis yang tenang dan damai menjadi penyeimbang alami bagi Sanguinis yang antusias dan ekspresif. Sanguinis membawa keceriaan dan ide-ide baru, sementara Plegmatis memberikan rasa aman dan pendengar yang setia.`;
            }
            if (isPlegmatis && isKoleris) {
                return `Dinamika Plegmatis & Koleris: Pasangan kombinasi klasik "Pemimpin & Pengikut yang Setia". Koleris bertindak sebagai pengambil keputusan yang tegas dan cepat, sementara Plegmatis menjadi pelaksana yang tenang, sabar, dan jarang berkonflik. Koleris perlu menjaga agar tidak terlalu mendominasi.`;
            }
            if (isPlegmatis && isMelankolis) {
                return `Dinamika Plegmatis & Melankolis: Hubungan yang sangat tenang, rapi, dan teratur. Melankolis memberikan detail dan standar tinggi, sementara Plegmatis memberikan kenyamanan dan kedamaian tanpa tekanan.`;
            }
            if (isKoleris && isSanguinis) {
                return `Dinamika Koleris & Sanguinis: Hubungan yang sangat berenergi tinggi dan ekstrovert! Koleris fokus pada eksekusi target, sedangkan Sanguinis fokus pada jaringan sosial dan kreativitas.`;
            }
            if (isKoleris && isMelankolis) {
                return `Dinamika Koleris & Melankolis: Kombinasi berorientasi kerja yang luar biasa. Koleris menentukan arah besar (visioner), dan Melankolis memastikan semua detail perencanaan sempurna tanpa cela.`;
            }
            if (isSanguinis && isMelankolis) {
                return `Dinamika Sanguinis & Melankolis: Pasangan yang saling melengkapi pertentangan. Sanguinis membawa warna dan kegembiraan, sedangkan Melankolis menjaga keteraturan dan kerapian data/fakta.`;
            }
        }

        // ==========================================
        // 5. CARA BERKOMUNIKASI / INTERAKSI INDIVIDUAL
        // ==========================================
        if (containsAny(['berkomunikasi', 'komunikasi', 'ngobrol', 'bicara', 'menghadapi', 'interaksi']) || (containsAny(['bagaimana', 'gimana', 'kalo', 'kalau']) && (isKoleris || isSanguinis || isMelankolis || isPlegmatis))) {
            if (isKoleris) {
                return `Untuk berkomunikasi dengan tipe Koleris: Bicara langsung ke inti poin (to the point), fokus pada solusi dan hasil nyata, hargai efisiensi waktu mereka, serta hindari penjelasan yang bertele-tele.`;
            }
            if (isSanguinis) {
                return `Untuk berkomunikasi dengan tipe Sanguinis: Gunakan nada yang ramah dan antusias, berikan pujian yang tulus, biarkan mereka mengekspresikan ide kreatifnya, dan buat suasana ngobrol tetap santai dan menyenangkan.`;
            }
            if (isMelankolis) {
                return `Untuk berkomunikasi dengan tipe Melankolis: Berikan data dan fakta yang akurat, bicara secara terstruktur dan terencana, berikan waktu bagi mereka untuk berpikir mendalam, dan hargai standar kualitas mereka.`;
            }
            if (isPlegmatis) {
                return `Untuk berkomunikasi dengan tipe Plegmatis: Bicara dengan tenang dan bersahabat, hindari sikap menghakimi atau mendesak secara mendadak, dengarkan pendapat mereka, dan ciptakan suasana aman.`;
            }
        }

        // ==========================================
        // 6. TUTORIAL / BIKIN KONTEN / PROMPT
        // ==========================================
        if (containsAny(['buat konten', 'bikin konten', 'pembuatan konten', 'konten ai', 'prompt ai', 'membuat konten'])) {
            return `Untuk membuat konten menggunakan AI secara efektif, langkah praktisnya adalah:\n1. Tentukan ide & target audiens Anda.\n2. Gunakan Prompt AI di menu Creator untuk membuat draf skrip atau ide visual.\n3. Manfaatkan tools AI Generatif untuk menghasilkan teks atau gambar pendukung.\n\nSebagai tipe ${pType}, pendekatan bertahap dan konsisten akan membuat proses kreasi terasa sangat menyenangkan. Mau coba gunakan koleksi Prompt AI di menu Creator kita?`;
        }

        // ==========================================
        // 7. REKOMENDASI KARIR / PROFESI / PERAN YANG COCOK
        // ==========================================
        if (containsAny(['cocok', 'profesi', 'karir', 'pekerjaan', 'kerjaan', 'bidang', 'peran', 'jadi apa'])) {
            const careerGuide = {
                'Koleris': 'Sebagai Koleris (Tipe Pemimpin & Eksekutor), Anda cocok menjadi Project Manager, AI Solutions Architect, Tech Entrepreneur, atau Lead Prompt Engineer yang berorientasi pada target dan hasil nyata.',
                'Sanguinis': 'Sebagai Sanguinis (Tipe Kreatif & Komunikator), Anda sangat cocok menjadi AI Content Creator, Creative Director, Digital Marketer, atau UI/UX Experience Designer yang memanfaatkan AI Generatif.',
                'Melankolis': 'Sebagai Melankolis (Tipe Analitis & Teliti), Anda sangat cocok menjadi Data Analyst, AI Ethics Specialist, Systems Auditor, atau Technical Researcher yang membutuhkan ketelitian tinggi.',
                'Plegmatis': 'Sebagai Plegmatis (Tipe Pendamai & Stabil), Anda sangat cocok menjadi AI Customer Success Specialist, HR Talent Specialist, Education Facilitator, atau Quality Assurance (QA) Analyst yang menjaga konsistensi alur kerja.'
            };
            return careerGuide[pType] || `Sebagai tipe ${pType}, Anda sangat cocok di bidang yang membutuhkan stabilitas, kerjasama tim, serta perencanaan yang matang seperti AI Support Specialist atau Quality Control.`;
        }

        // ==========================================
        // 8. DISKUSI TEMPERAMEN / KEPRIBADIAN UMUM
        // ==========================================
        if (isKoleris || isSanguinis || isMelankolis || isPlegmatis || containsAny(['kepribadian', 'sifat', 'karakter', 'temperamen'])) {
            if (isKoleris) {
                return `Koleris adalah tipe kepribadian yang berjiwa pemimpin, tegas, sangat berorientasi pada target, dan suka tantangan. Mereka cocok memanfaatkan AI untuk otomatisasi dan efisiensi kerja cepat.`;
            }
            if (isSanguinis) {
                return `Sanguinis adalah tipe yang sangat antusias, kreatif, ramah, dan penuh energi. Mereka paling cocok memanfaatkan AI Generatif untuk membuat konten visual, ide-ide out-of-the-box, dan eksperimen kreatif.`;
            }
            if (isMelankolis) {
                return `Melankolis adalah tipe yang tekun, analitis, sistematis, dan memiliki standar kualitas tinggi. Mereka sangat unggul dalam riset data mendalam dan analisis etika AI.`;
            }
            if (isPlegmatis) {
                return `Plegmatis adalah tipe yang tenang, damai, setia, dan pengamat yang baik. Mereka menyukai alur belajar AI yang bertahap, santai, dan tidak tergesa-gesa.`;
            }

            return `Setiap karakter (Koleris, Sanguinis, Melankolis, Plegmatis) memiliki keunggulan unik dalam mempelajari AI. Karakter Anda sendiri saat ini adalah ${pType}. Mau bahas keunggulan karakter yang mana lebih detail?`;
        }

        // ==========================================
        // 9. DETEKSI KEBINGUNGAN / MINTA PENJELASAN UMUM
        // ==========================================
        if (containsAny(['maksud', 'jelas', 'contoh', 'kenapa', 'arti', 'apa itu', 'bingung', 'paham', 'ngerti', 'detail'])) {
            return `Baik, saya jelaskan lebih spesifik. Intinya adalah bagaimana menghubungkan teknologi AI ini dengan kebiasaan ${pType} Anda sehari-hari agar terasa mudah dan langsung berdampak nyata. Mau saya beri contoh penerapannya?`;
        }

        // ==========================================
        // 10. MINTA BANTUAN / BERTANYA
        // ==========================================
        if (containsAny(['bantu', 'tolong', 'panduan', 'tanya'])) {
            return `Tentu saja, saya siap membantu! Sebagai pendamping berkarakter ${pType}, saya bisa bantu jelaskan materi AI atau diskusi soal strategi belajarmu. Topik spesifik apa yang ingin kita bahas?`;
        }

        // ==========================================
        // 11. DISKUSI MODUL / BELAJAR
        // ==========================================
        if (containsAny(['belajar', 'modul', 'kursus', 'materi', 'akademi', 'academy', 'ai', 'topcare'])) {
            return `Untuk tipe ${pType}, saya menyarankan mulai dari modul 'Dasar Artificial Intelligence' di menu Belajar, lalu lanjut coba-coba Prompt Engineering di menu Creator sesuai ritme santai Anda.`;
        }

        // ==========================================
        // 12. ANTI-LOOPING FALLBACK DINAMIS
        // ==========================================
        const dynamicFallbacks = [
            `Topik yang menarik tentang "${safeInput}". Bagaimana kalau kita hubungkan ini dengan cara belajar AI yang paling cocok untuk tipe ${pType}?`,
            `Saya mengerti sudut pandang Anda. Sebagai seorang ${pType}, menurut Anda apa langkah kecil yang paling nyaman dilakukan sekarang?`,
            `Wah, pertanyaan bagus! Mari kita bedah santai. Dari sudut pandang ${pType}, aspek mana yang paling membuat Anda penasaran?`,
            `Setiap orang punya ritme belajar sendiri. Sebagai tipe ${pType}, pendekatan bertahap biasanya jauh lebih efektif untuk Anda.`
        ];

        let randomIndex;
        let attempts = 0;
        do {
            randomIndex = Math.floor(Math.random() * dynamicFallbacks.length);
            attempts++;
        } while (randomIndex === this.lastFallbackIndex && attempts < 10);

        this.lastFallbackIndex = randomIndex;
        return dynamicFallbacks[randomIndex];
    }
}

export default new CoachConversationEngine();
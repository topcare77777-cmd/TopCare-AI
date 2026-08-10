/**
 * TOPCARE AI PLATFORM V2 — ADAPTIVE RESPONSE ENGINE
 * Path: assets/js/coach/personalization/coach-adaptive-response-engine.js
 * Status: APPROVED & FIXED (DYNAMIC RESPONSES + INDONESIAN TTS)
 */

export class CoachAdaptiveResponseEngine {
    constructor() {
        this.synth = window.speechSynthesis || null;
    }

    // Ambil Tipe Kepribadian User (Default: Melankolis)
    getPersonality() {
        return localStorage.getItem('user_personality') || 'Melankolis';
    }

    // Fitur Suara (Text-to-Speech Bahasa Indonesia)
    speak(text) {
        if (!this.synth) return;
        this.synth.cancel(); // Hentikan suara jika sedang berjalan

        const cleanText = text.replace(/<[^>]*>?/gm, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'id-ID';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        this.synth.speak(utterance);
    }

    /**
     * Menghasilkan respon dinamis kontekstual berdasarkan input pesan user
     */
    generateResponse(userInput) {
        const query = (userInput || '').toLowerCase().trim();
        const pType = this.getPersonality();

        if (!query) {
            const emptyReply = `Silakan ketikkan pertanyaan Anda. Sebagai Coach berkarakter ${pType}, saya siap membantu Anda.`;
            this.speak(emptyReply);
            return emptyReply;
        }

        let responseText = '';

        // Detections Sapaan / Kabar
        if (query.includes('hallo') || query.includes('halo') || query.includes('khabar') || query.includes('kabar') || query.includes('hai')) {
            responseText = `Halo! Kabar saya sangat baik. Sebagai Coach berorientasi ${pType}, saya siap mendampingi Anda belajar AI dan pengembangan diri hari ini. Apa yang bisa saya bantu?`;
        }
        // Detections Minta Bantuan / Bertanya
        else if (query.includes('bantu') || query.includes('nanya') || query.includes('tanya')) {
            responseText = `Tentu saja! Saya sangat senang membantu Anda. Sebagai tipe ${pType}, penjelasan terstruktur seperti apa yang sedang Anda butuhkan?`;
        }
        // Pembahasan Belajar & Modul AI
        else if (query.includes('belajar') || query.includes('modul') || query.includes('kursus') || query.includes('materi') || query.includes('academy')) {
            responseText = `Untuk tipe kepribadian ${pType}, saya merekomendasikan Anda memulai dari modul 'Dasar Artificial Intelligence' di menu Belajar.`;
        }
        // Pembahasan Kepribadian / Temperamen
        else if (query.includes('kepribadian') || query.includes('sifat') || query.includes('karakter') || query.includes('melankolis') || query.includes('koleris') || query.includes('sanguinis') || query.includes('plegmatis')) {
            responseText = `Karakter Anda terdeteksi sebagai ${pType}. Ini memberi Anda keunggulan analitis yang luar biasa dalam memahami teknologi AI secara mendalam.`;
        }
        // Fallback Acak agar jawaban tidak pernah monoton/berulang
        else {
            const fallbacks = [
                `Mengenai "${userInput}", sebagai seorang ${pType}, Anda pasti menyukai analisis yang mendalam dan terstruktur. Mari kita bedah topik ini bersama.`,
                `Topik "${userInput}" sangat menarik! Pendekatan ${pType} yang Anda miliki sangat cocok untuk mengeksplorasi hal ini di modul TopCare AI.`,
                `Terima kasih sudah bertanya tentang "${userInput}". Saya siap memandu Anda memahami langkah-langkahnya secara sistematis.`
            ];
            responseText = fallbacks[Math.floor(Math.random() * fallbacks.length)];
        }

        // Jalankan Suara Otomatis
        this.speak(responseText);

        return responseText;
    }
}

// Export Singleton Instance
export const adaptiveEngine = new CoachAdaptiveResponseEngine();
export default adaptiveEngine;
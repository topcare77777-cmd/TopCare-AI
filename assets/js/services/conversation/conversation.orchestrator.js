/**
 * TOPCARE AI PLATFORM V2 — COACH FRONTEND EXPERIENCE
 * Path: assets/js/coach/ui/coach-frontend-experience.js
 * Status: UPDATED (BUILD 138.6 — TEXT-TO-SPEECH INTEGRATION)
 */
import { CoachWidget } from '../../coach/ui/coach-widget.js';

/**
 * Utilitas Text-to-Speech (TTS) Ringan untuk Web Statis
 */
export const CoachVoiceService = {
    speak(text) {
        if (!('speechSynthesis' in window)) return;

        // Hentikan suara yang sedang berjalan agar tidak tumpang tindih
        window.speechSynthesis.cancel();

        // Bersihkan teks dari Markdown dan Emoji agar suara AI natural
        const cleanText = String(text || '')
            .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '')
            .replace(/[*_#`~]/g, '')
            .trim();

        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'id-ID'; // Bahasa Indonesia
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Cari profil suara bahasa Indonesia di perangkat pengguna
        const voices = window.speechSynthesis.getVoices();
        const indonesianVoice = voices.find(v => v.lang === 'id-ID' || v.lang === 'id_ID');
        if (indonesianVoice) {
            utterance.voice = indonesianVoice;
        }

        window.speechSynthesis.speak(utterance);
    },

    stop() {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }
};

// Pasang secara global agar CoachWidget bisa langsung memanggilnya tanpa import yang rumit
window.CoachVoiceService = CoachVoiceService;

export const CoachFrontendExperience = {
    initialized: false,
    container: null,

    start(container) {
        if (this.initialized) {
            return;
        }
        this.container = container || document.getElementById('topcare-ai-coach-container');
        if (!this.container) {
            return;
        }
        this.initialized = true;

        // Pancing browser untuk memuat daftar suara di awal (mencegah delay di klik pertama)
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
        }

        try {
            // Delegate real UI rendering back to the original CoachWidget subsystem
            if (typeof CoachWidget.render === 'function') {
                CoachWidget.render(this.container);
            } else if (typeof CoachWidget.init === 'function') {
                CoachWidget.init(this.container);
            }
        } catch (error) {
            console.error("Failed to render AI Coach widget UI:", error);
        }
    },

    destroy() {
        if (!this.initialized) {
            return;
        }

        // Pastikan suara AI mati otomatis ketika user berpindah halaman/menutup widget
        CoachVoiceService.stop();

        try {
            if (typeof CoachWidget.destroy === 'function') {
                CoachWidget.destroy();
            } else if (this.container) {
                this.container.innerHTML = '';
            }
        } catch (error) {
            console.error("Failed to destroy AI Coach widget UI:", error);
        }
        this.initialized = false;
        this.container = null;
    }
};

export default CoachFrontendExperience;

/**
 * TOPCARE AI PLATFORM V2 — VOICE ENGINE
 * Path: assets/js/coach/coach-voice-engine.js
 * Status: APPROVED & ACTIVE (INDONESIAN TTS)
 */

export class CoachVoiceEngine {
    constructor() {
        this.synth = window.speechSynthesis || null;
        this.voice = null;
        this._initVoice();
    }

    _initVoice() {
        if (!this.synth) return;

        // Load daftar suara bawaan browser
        const loadVoices = () => {
            const voices = this.synth.getVoices();
            // Prioritaskan suara Bahasa Indonesia
            this.voice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID')) || voices[0];
        };

        loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }

    /**
     * Membunyikan teks dari jawaban Coach
     */
    speak(text) {
        if (!this.synth) return;

        // Hentikan suara yang sedang berjalan
        this.synth.cancel();

        // Bersihkan tag HTML jika ada sebelum disuarakan
        const cleanText = text.replace(/<[^>]*>?/gm, '');

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'id-ID';
        utterance.rate = 1.0;  // Kecepatan standar
        utterance.pitch = 1.0; // Pitch standar

        if (this.voice) {
            utterance.voice = this.voice;
        }

        this.synth.speak(utterance);
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
    }
}

export default new CoachVoiceEngine();
/**
 * TOPCARE AI PLATFORM V2 — VOICE ENGINE
 * Path: assets/js/coach/coach-voice-engine.js
 * Status: APPROVED & FIXED (CHROME CANCEL BUG & MARKDOWN STRIP)
 */

export class CoachVoiceEngine {
    constructor() {
        this.synth = window.speechSynthesis || null;
        this.voice = null;
        this.voices = [];
        this._initVoice();
    }

    _initVoice() {
        if (!this.synth) return;

        const loadVoices = () => {
            this.voices = this.synth.getVoices();
            const voiceSelect = document.getElementById('coach-voice-select');
            
            if (voiceSelect && this.voices.length > 0) {
                voiceSelect.innerHTML = '';
                const idVoices = this.voices.filter(v => v.lang.includes('id') || v.lang.includes('ID'));
                const listToRender = idVoices.length > 0 ? idVoices : this.voices;

                listToRender.forEach((voice) => {
                    const option = document.createElement('option');
                    option.value = voice.name;
                    option.textContent = `${voice.name} (${voice.lang})`;
                    if (voice.lang.includes('id') || voice.lang.includes('ID')) {
                        option.selected = true;
                        this.voice = voice;
                    }
                    voiceSelect.appendChild(option);
                });
            }
        };

        loadVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = loadVoices;
        }
    }

    initSpeechRecognition(onResultCallback) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Browser Anda belum mendukung fitur pengenal suara.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'id-ID';
        recognition.interimResults = false;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (onResultCallback) onResultCallback(transcript);
        };

        recognition.start();
    }

    /**
     * Membunyikan teks dari jawaban Coach secara presisi
     */
    speak(text) {
        if (!this.synth) return;

        // 1. Hentikan suara lama (Clear Queue)
        this.synth.cancel();

        // 2. Bersihkan tag HTML dan Simbol Markdown (*, _, #) agar tidak dibaca kaku oleh sistem
        const cleanText = text
            .replace(/<[^>]*>?/gm, '') 
            .replace(/[*_#`~]/g, '')   
            .trim();

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'id-ID';
        utterance.rate = 1.0;  // Kecepatan
        utterance.pitch = 1.0; // Nada suara

        const voiceSelect = document.getElementById('coach-voice-select');
        if (voiceSelect && voiceSelect.value) {
            const selectedVoice = this.voices.find(v => v.name === voiceSelect.value);
            if (selectedVoice) utterance.voice = selectedVoice;
        } else if (this.voice) {
            utterance.voice = this.voice;
        }

        // 3. FIX: Beri jeda 150ms agar Chrome tidak menabrakkan synth.cancel() dengan synth.speak()
        setTimeout(() => {
            this.synth.speak(utterance);
        }, 150);
    }

    stop() {
        if (this.synth) {
            this.synth.cancel();
        }
    }
}

export default new CoachVoiceEngine();
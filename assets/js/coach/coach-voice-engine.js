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
        this.recognition = null;
        this.listening = false;
        this.speaking = false;
        this.onRecognitionStart = null;
        this.onRecognitionEnd = null;
        this.onRecognitionError = null;
        this.onSpeechStart = null;
        this.onSpeechEnd = null;
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

    isRecognitionSupported() {
        return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    }

    isListening() { return this.listening; }

    isSpeaking() { return this.speaking || Boolean(this.synth && this.synth.speaking); }

    initSpeechRecognition(onResultCallback) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            this.onRecognitionError?.('Input suara tidak tersedia di browser ini. Anda tetap dapat menggunakan chat teks.');
            return false;
        }

        if (this.isSpeaking()) {
            this.onRecognitionError?.('Tunggu Coach selesai berbicara sebelum menggunakan mikrofon.');
            return false;
        }

        this.stopListening();

        const recognition = this.recognition = new SpeechRecognition();
        recognition.lang = 'id-ID';
        recognition.interimResults = false;
        recognition.continuous = false;

        recognition.onstart = () => {
            this.listening = true;
            this.onRecognitionStart?.();
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            if (onResultCallback) onResultCallback(transcript);
        };

        recognition.onerror = (event) => {
            const messages = {
                'not-allowed': 'Izin mikrofon ditolak. Aktifkan izin mikrofon untuk memakai input suara.',
                'no-speech': 'Suara tidak terdeteksi. Coba lagi atau gunakan chat teks.',
                'audio-capture': 'Mikrofon tidak tersedia pada perangkat ini.',
                network: 'Pengenal suara tidak dapat terhubung. Chat teks tetap dapat digunakan.'
            };
            this.onRecognitionError?.(messages[event.error] || 'Input suara berhenti. Silakan coba lagi.');
        };
        recognition.onend = () => {
            this.listening = false;
            if (this.recognition === recognition) this.recognition = null;
            this.onRecognitionEnd?.();
        };
        try {
            recognition.start();
            return true;
        } catch (error) {
            this.onRecognitionError?.('Input suara belum siap. Silakan coba lagi.');
            return false;
        }
    }

    stopListening() {
        if (!this.recognition) return;
        try { this.recognition.abort(); } catch (error) { /* recognition is already stopped */ }
    }

    /**
     * Membunyikan teks dari jawaban Coach secara presisi
     */
    speak(text) {
        if (!this.synth) return;

        this.stopListening();

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

        utterance.onstart = () => {
            this.speaking = true;
            this.onSpeechStart?.();
        };
        utterance.onend = utterance.onerror = () => {
            this.speaking = false;
            this.onSpeechEnd?.();
        };

        // 3. FIX: Beri jeda 150ms agar Chrome tidak menabrakkan synth.cancel() dengan synth.speak()
        setTimeout(() => {
            this.synth.speak(utterance);
        }, 150);
    }

    stop() {
        this.stopListening();
        if (this.synth) {
            this.synth.cancel();
        }
        this.speaking = false;
    }
}

export default new CoachVoiceEngine();

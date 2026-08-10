/**
 * TOPCARE AI PLATFORM V2 — NATURAL CONVERSATIONAL COACH RENDERER
 * Path: assets/js/coach/coach.renderer.js
 * Status: APPROVED & FIXED (NATURAL CONVERSATION - NO REPEATING USER INPUT)
 */

export class CoachRendererClass {
    constructor() {
        this.synth = window.speechSynthesis || null;
        this.recognition = null;
        this.isListening = false;
        this.voices = [];
        this.selectedVoiceURI = localStorage.getItem('coach_voice_uri') || '';

        this._initVoices();
        this._initSpeechRecognition();
    }

    _initVoices() {
        if (!this.synth) return;

        const populate = () => {
            this.voices = this.synth.getVoices();
            this._populateVoiceDropdown();
        };

        populate();
        if (speechSynthesis.onvoiceschanged !== undefined) {
            speechSynthesis.onvoiceschanged = populate;
        }
    }

    _initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'id-ID';

        this.recognition.onstart = () => {
            this.isListening = true;
            this._updateMicUI(true);
        };

        this.recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            const inputEl = document.getElementById('coach-user-input') || document.querySelector('input[placeholder*="Ketik"]');

            if (inputEl) {
                inputEl.value = transcript;
                this._handleProcessSend();
            }
        };

        this.recognition.onerror = () => {
            this.isListening = false;
            this._updateMicUI(false);
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this._updateMicUI(false);
        };
    }

    toggleMic() {
        if (!this.recognition) {
            alert('Fitur pengenal suara tidak didukung browser ini. Gunakan Chrome/Edge terbaru.');
            return;
        }

        if (this.isListening) {
            this.recognition.stop();
        } else {
            try {
                this.recognition.start();
            } catch (err) {
                this.recognition.stop();
            }
        }
    }

    _updateMicUI(isListening) {
        const micBtn = document.getElementById('coach-btn-mic');
        if (!micBtn) return;

        if (isListening) {
            micBtn.style.background = '#ef4444';
            micBtn.style.boxShadow = '0 0 12px rgba(239, 68, 68, 0.6)';
            micBtn.innerHTML = '🔴 Mendengar...';
        } else {
            micBtn.style.background = 'rgba(255, 255, 255, 0.08)';
            micBtn.style.boxShadow = 'none';
            micBtn.innerHTML = '🎙️';
        }
    }

    _populateVoiceDropdown() {
        const selectEl = document.getElementById('coach-voice-select');
        if (!selectEl) return;

        selectEl.innerHTML = '';

        if (this.voices.length === 0) {
            selectEl.innerHTML = `<option value="">Default System Voice</option>`;
            return;
        }

        const sortedVoices = [...this.voices].sort((a, b) => {
            const aLang = a.lang.toLowerCase();
            const bLang = b.lang.toLowerCase();
            const isAAsia = aLang.includes('id') || aLang.includes('ms');
            const isBAsia = bLang.includes('id') || bLang.includes('ms');
            if (isAAsia && !isBAsia) return -1;
            if (!isAAsia && isBAsia) return 1;
            return a.name.localeCompare(b.name);
        });

        sortedVoices.forEach((voice) => {
            const option = document.createElement('option');
            option.value = voice.voiceURI;
            option.textContent = `${voice.name} (${voice.lang})`;

            if (this.selectedVoiceURI && voice.voiceURI === this.selectedVoiceURI) {
                option.selected = true;
            } else if (!this.selectedVoiceURI && (voice.lang.includes('id') || voice.lang.includes('ms'))) {
                option.selected = true;
                this.selectedVoiceURI = voice.voiceURI;
            }

            selectEl.appendChild(option);
        });
    }

    getCurrentLang() {
        const langBtn = document.getElementById('lang-toggle-btn');
        if (langBtn) {
            const btnText = langBtn.textContent.toUpperCase();
            if (btnText.includes('EN')) return 'EN';
            if (btnText.includes('ID')) return 'ID';
        }
        return localStorage.getItem('app_lang') || 'ID';
    }

    getPersonality() {
        return localStorage.getItem('user_personality') || 'Melankolis';
    }

    speak(text) {
        if (!this.synth) return;
        this.synth.cancel();

        const cleanText = text.replace(/<[^>]*>?/gm, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);

        if (this.voices.length === 0) {
            this.voices = this.synth.getVoices();
        }

        let chosenVoice = this.voices.find(v => v.voiceURI === this.selectedVoiceURI);

        if (!chosenVoice) {
            chosenVoice = this.voices.find(v => v.lang.toLowerCase().includes('id') || v.lang.toLowerCase().includes('ms'));
        }

        if (chosenVoice) {
            utterance.voice = chosenVoice;
            utterance.lang = chosenVoice.lang;
        } else {
            utterance.lang = 'id-ID';
        }

        utterance.rate = 0.95;
        utterance.pitch = 1.0;

        this.synth.speak(utterance);
    }

    // GENERATOR BALASAN ALAMI (TANPA MENGULANG TEKS USER)
    generateResponse(userInput) {
        const query = (userInput || '').toLowerCase().trim();
        const pType = this.getPersonality();
        const lang = this.getCurrentLang();

        if (lang === 'EN') {
            if (!query) return `Please type your question. As a ${pType} coach, I am ready to assist you.`;
            if (query.includes('hello') || query.includes('hi') || query.includes('how are you')) {
                return `Hello! I am doing great. As a coach tailored for ${pType} personality, I am ready to help you explore AI and self-development today.`;
            }
            if (query.includes('next') || query.includes('what else') || query.includes('then')) {
                return `Next, I recommend focusing on practical exercises. Try implementing prompt structures or exploring our Learning Center modules step-by-step.`;
            }
            if (query.includes('help') || query.includes('can you help')) {
                return `Of course! For a ${pType} personality, structured guidance works best. What specific topic shall we cover?`;
            }
            return `That is a great direction. Considering your ${pType} trait, structured execution will help you maximize your results.`;
        } else {
            if (!query) return `Silakan ketikkan pertanyaan Anda. Sebagai Coach berkarakter ${pType}, saya siap membantu Anda.`;

            // Sapaan Singkat
            if (query === 'hallo' || query === 'halo' || query === 'hai' || query === 'hi') {
                return `Halo! Selamat datang. Ada materi AI atau topik pengembangan diri ${pType} yang ingin kita bahas hari ini?`;
            }
            // Tanya Kabar
            if (query.includes('khabar') || query.includes('kabar')) {
                return `Kabar saya sangat baik dan penuh energi! Sebagai pendamping ${pType}, saya siap membantu Anda memahami konsep AI secara rinci.`;
            }
            // Kelanjutan Percakapan ("terus apalagi", "bagaimana kelanjutannya", "lalu", "selanjutnya")
            if (query.includes('terus') || query.includes('apalagi') || query.includes('kelanjutan') || query.includes('lalu') || query.includes('selanjutnya')) {
                return `Langkah selanjutnya yang sangat cocok untuk tipe ${pType} adalah mempraktikkan susunan Prompt AI di menu Creator, lalu mencatat poin-poin evaluasinya secara terstruktur.`;
            }
            // Minta Saran / Solusi
            if (query.includes('saran') || query.includes('rekomendasi') || query.includes('solusi')) {
                return `Saran terbaik saya untuk karakter ${pType}: Mulailah dari modul 'Prompt Engineering' dasar, buat satu proyek kecil, dan gunakan AI untuk menyempurnakan detail riset Anda.`;
            }
            // Minta Bantuan
            if (query.includes('bantu') || query.includes('tolong')) {
                return `Tentu saja, saya siap mendampingi Anda! Khusus untuk tipe ${pType}, saya bisa menyajikan panduan bertahap yang rinci dan teratur.`;
            }
            // Tanya Kepribadian
            if (query.includes('kepribadian') || query.includes('melankolis') || query.includes('koleris') || query.includes('sanguinis') || query.includes('plegmatis')) {
                return `Tipe kepribadian Anda adalah ${pType}. Keunggulan utama Anda terletak pada ketelitian, fokus, dan analisis yang mendalam.`;
            }

            // FALLBACK ALAMI & DINAMIS (TIDAK MENGULANG TEKS USER)
            const naturalFallbacks = [
                `Pendekatan terstruktur sangat penting di sini. Sebagai seorang ${pType}, Anda bisa mulai membedah bagian terpentingnya terlebih dahulu.`,
                `Sangat menarik! Karakter ${pType} yang Anda miliki sangat membantu dalam mengevaluasi ide ini secara objektif dan mendalam.`,
                `Langkah yang bagus. Mari kita hubungkan konsep ini dengan materi pembelajaran yang ada di platform TopCare AI.`
            ];

            return naturalFallbacks[Math.floor(Math.random() * naturalFallbacks.length)];
        }
    }

    renderCard() {
        const pType = this.getPersonality();
        const isEN = this.getCurrentLang() === 'EN';

        setTimeout(() => {
            this.attachEvents();
            this._populateVoiceDropdown();
        }, 200);

        return `
            <div class="tc-coach-card-container" style="background: rgba(17, 24, 39, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 1.5rem; color: #f8fafc; max-width: 900px; margin: 0 auto;">
                <div class="tc-coach-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); padding-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.5rem;">💬</span>
                        <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700;">
                            ${isEN ? 'Discussion with Coach TopCare AI' : 'Diskusi dengan Coach TopCare AI'} (${pType})
                        </h3>
                    </div>

                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <label for="coach-voice-select" style="font-size: 0.8rem; color: #94a3b8;">🔊 Suara:</label>
                        <select id="coach-voice-select" style="background: #1e293b; color: #f8fafc; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 0.35rem 0.65rem; font-size: 0.8rem; outline: none; max-width: 200px;">
                            <option value="">Memuat suara...</option>
                        </select>
                    </div>
                </div>

                <div id="coach-chat-area" class="tc-chat-messages" style="height: 320px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.85rem; padding-right: 0.5rem; margin-bottom: 1rem;">
                    <div style="display: flex; justify-content: flex-start; margin-bottom: 0.5rem;">
                        <div style="background: #1e293b; color: #f8fafc; padding: 0.85rem 1.25rem; border-radius: 14px 14px 14px 2px; max-width: 80%; border: 1px solid rgba(255, 255, 255, 0.1); line-height: 1.5; font-size: 0.95rem;">
                            ${isEN
                ? `Hello! I am your TopCare AI Coach. Based on your <strong>${pType}</strong> trait, how can I assist you today?`
                : `Halo! Saya Coach TopCare AI Anda. Berdasarkan karakter <strong>${pType}</strong> Anda, ada yang bisa saya bantu hari ini?`}
                        </div>
                    </div>
                </div>

                <div class="tc-chat-input-wrapper" style="display: flex; gap: 0.5rem; align-items: center;">
                    <input type="text" id="coach-user-input" class="tc-chat-input" placeholder="${isEN ? 'Type or speak your message...' : 'Ketik atau katakan pesan Anda...'}" style="flex: 1; padding: 0.85rem 1.25rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px; color: #ffffff; font-size: 0.95rem; outline: none;">
                    
                    <button type="button" id="coach-btn-mic" title="Bicara Lewat Mikrofon" style="padding: 0.85rem 1rem; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px; color: #ffffff; font-size: 1.1rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center;">
                        🎙️
                    </button>

                    <button type="button" id="coach-btn-send" class="tc-btn-send" style="padding: 0.85rem 1.5rem; background: #2563eb; color: #ffffff; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; transition: background 0.2s;">
                        ${isEN ? 'Send' : 'Kirim'}
                    </button>
                </div>
            </div>
        `;
    }

    renderPage() {
        return this.renderCard();
    }

    _handleProcessSend() {
        const inputEl = document.getElementById('coach-user-input') || document.querySelector('input[placeholder*="Ketik"]');
        if (!inputEl) return;

        const text = inputEl.value.trim();
        if (!text) return;

        this.appendBubble(text, 'user');
        inputEl.value = '';

        setTimeout(() => {
            const reply = this.generateResponse(text);
            this.appendBubble(reply, 'coach');
            this.speak(reply);
        }, 300);
    }

    attachEvents() {
        const inputEl = document.getElementById('coach-user-input') || document.querySelector('input[placeholder*="Ketik"]');
        const btnSend = document.getElementById('coach-btn-send') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Kirim' || b.textContent.trim() === 'Send');
        const btnMic = document.getElementById('coach-btn-mic');
        const selectVoice = document.getElementById('coach-voice-select');

        if (btnMic && !btnMic.dataset.bound) {
            btnMic.dataset.bound = 'true';
            btnMic.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMic();
            });
        }

        if (selectVoice && !selectVoice.dataset.bound) {
            selectVoice.dataset.bound = 'true';
            selectVoice.addEventListener('change', (e) => {
                this.selectedVoiceURI = e.target.value;
                localStorage.setItem('coach_voice_uri', e.target.value);
                const testMsg = this.getCurrentLang() === 'EN' ? 'Voice updated' : 'Suara diperbarui';
                this.speak(testMsg);
            });
        }

        if (!btnSend || btnSend.dataset.bound) return;
        btnSend.dataset.bound = 'true';

        btnSend.addEventListener('click', (e) => {
            e.preventDefault();
            this._handleProcessSend();
        });

        if (inputEl) {
            inputEl.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this._handleProcessSend();
                }
            });
        }
    }

    appendBubble(text, sender) {
        const chatBox = document.getElementById('coach-chat-area') || document.querySelector('.tc-chat-messages') || document.querySelector('.tc-chat-box');
        if (!chatBox) return;

        const isUser = sender === 'user';
        const msgDiv = document.createElement('div');
        msgDiv.style.cssText = `display: flex; justify-content: ${isUser ? 'flex-end' : 'flex-start'}; margin-bottom: 0.85rem; width: 100%;`;

        msgDiv.innerHTML = `
            <div style="background: ${isUser ? '#2563eb' : '#1e293b'}; color: #ffffff; padding: 0.85rem 1.25rem; border-radius: ${isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px'}; max-width: 80%; border: 1px solid ${isUser ? '#3b82f6' : 'rgba(255,255,255,0.1)'}; line-height: 1.5; font-size: 0.95rem;">
                ${text}
            </div>
        `;

        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

export const CoachRenderer = new CoachRendererClass();
export default CoachRenderer;
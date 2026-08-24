/**
 * TOPCARE AI PLATFORM V2 — COACH PAGE SPA VIEW CONTROLLER
 * Path: assets/js/pages/coach.page.js
 * Version: 140.0.0 (COACH AI RECOVERY)
 * Status: APPROVED & LOCKED — COACH AI RECOVERY COMPLETE; VOICE ENABLED;
 *         RESPONSIVE VERIFIED; CROSS-DEVICE VERIFIED; REGRESSION PASS.
 * SRP: SPA View Entry Point for Coach Discussion Hub.
 */

import { CoachConversationEngine } from '../coach/conversation/coach-conversation-engine.js';
import { CoachVoiceEngine } from '../coach/coach-voice-engine.js';

const COACH_STYLESHEET_ID = 'tc-coach-page-styles';
const COACH_STYLESHEET_URL = new URL('../../css/coach/coach.page.css', import.meta.url).href;

export class CoachPage {
    constructor(container) {
        this.container = typeof container === 'string'
            ? document.querySelector(container)
            : container;

        this.conversationEngine = new CoachConversationEngine();
        this.voiceEngine = new CoachVoiceEngine();
        this.userPersonality = localStorage.getItem('user_personality') || 'Plegmatis';
    }

    async mount(container) {
        if (container) {
            this.container = typeof container === 'string'
                ? document.querySelector(container)
                : container;
        }

        if (!this.container) {
            this.container = document.getElementById('app') || document.body;
        }

        if (!this.container) {
            console.error('[CoachPage] Host container #app not found.');
            return;
        }

        this.userPersonality = localStorage.getItem('user_personality') || 'Plegmatis';

        this.ensureStylesheet();
        this.render();
        this.bindEvents();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    ensureStylesheet() {
        if (document.getElementById(COACH_STYLESHEET_ID)) return;
        const link = document.createElement('link');
        link.id = COACH_STYLESHEET_ID;
        link.rel = 'stylesheet';
        link.href = COACH_STYLESHEET_URL;
        document.head.appendChild(link);
    }

    render() {
        // RULE 1: Sapaan awal bersih, hangat, dan natural tanpa klausa template berlebihan
        const initialGreeting = "Halo! Saya Coach TopCare AI. Ada yang sedang ingin kamu diskusikan atau pelajari hari ini?";

        this.container.innerHTML = `
            <div class="tc-coach-page-wrapper" style="max-width: 900px; margin: 0 auto; padding: clamp(1rem, 3vh, 2.5rem) 1rem; color: #f8fafc;">
                
                <!-- HEADER COACH -->
                <div style="text-align: center; margin-bottom: 1.5rem;">
                    <span style="background: rgba(139, 92, 246, 0.15); color: #a78bfa; padding: 0.35rem 0.85rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; border: 1px solid rgba(139, 92, 246, 0.3);">
                        AI Companion Platform
                    </span>
                    <h1 style="font-size: clamp(1.8rem, 4vw, 2.5rem); font-weight: 800; margin-top: 0.5rem; margin-bottom: 0.35rem; color: #ffffff;">
                        Coach TopCare AI
                    </h1>
                    <p style="color: #94a3b8; max-width: 600px; margin: 0 auto; line-height: 1.5; font-size: 0.9rem;">
                        Pendamping pribadi Anda dalam memahami potensi kepribadian dan menavigasi jalur belajar Artificial Intelligence.
                    </p>
                </div>

                <!-- BOX DISKUSI CHAT -->
                <div style="background: rgba(17, 24, 39, 0.85); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; padding: 1.5rem; backdrop-filter: blur(16px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);">
                    
                    <!-- BAR ATAS: JUDUL & SELECTOR SUARA -->
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 1rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-size: 1.5rem;">💬</span>
                            <strong style="font-size: 1.1rem; color: #ffffff;">
                                Diskusi dengan Coach TopCare AI (${this.userPersonality})
                            </strong>
                        </div>

                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span style="font-size: 0.85rem; color: #94a3b8;">🔊 Suara:</span>
                            <select id="coach-voice-select" style="background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255, 255, 255, 0.15); color: #ffffff; padding: 0.4rem 0.75rem; border-radius: 8px; font-size: 0.85rem; outline: none; max-width: 220px;">
                                <option value="">Default System Voice</option>
                            </select>
                        </div>
                    </div>

                    <!-- AREA BUBBLE CHAT MESSAGES -->
                    <div id="coach-chat-messages" role="log" aria-live="polite" aria-relevant="additions" tabindex="0" style="height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; padding-right: 0.5rem; margin-bottom: 0.75rem;">
                        <!-- Greeting Awal Coach -->
                        <div style="align-self: flex-start; background: rgba(30, 41, 59, 0.9); color: #f8fafc; padding: 0.85rem 1.15rem; border-radius: 16px 16px 16px 2px; max-width: 82%; line-height: 1.5; font-size: 0.925rem; border: 1px solid rgba(255, 255, 255, 0.08);">
                            ${initialGreeting}
                        </div>
                    </div>

                    <div id="coach-status" role="status" aria-live="polite" style="min-height: 1.25rem; margin-bottom: 0.5rem; color: #bfdbfe; font-size: 0.85rem;"></div>

                    <!-- BAR INPUT TEKS & MIKROFON -->
                    <div style="display: flex; gap: 0.75rem; align-items: center;">
                        <input type="text" id="coach-user-input" aria-label="Pesan untuk Coach" autocomplete="off" maxlength="2000" placeholder="Ketik atau katakan pesan Anda..." style="flex: 1; min-width: 0; background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255, 255, 255, 0.15); color: #ffffff; padding: 0.85rem 1.15rem; border-radius: 12px; font-size: 0.95rem; outline: none; transition: border-color 0.2s ease;">
                        
                        <button id="coach-mic-btn" type="button" aria-pressed="false" title="Gunakan Mikrofon Suara" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #ffffff; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; cursor: pointer; transition: all 0.2s ease;">
                            🎙️
                        </button>
                        
                        <button id="coach-send-btn" type="button" style="background: #2563eb; color: #ffffff; border: none; padding: 0.85rem 1.5rem; border-radius: 12px; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: background 0.2s ease; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
                            Kirim
                        </button>
                    </div>

                </div>
            </div>
        `;
    }

    bindEvents() {
        const inputField = document.getElementById('coach-user-input');
        const sendBtn = document.getElementById('coach-send-btn');
        const micBtn = document.getElementById('coach-mic-btn');
        const status = document.getElementById('coach-status');
        const setStatus = (message, isError = false) => {
            if (!status) return;
            status.textContent = message;
            status.style.color = isError ? '#fda4af' : '#bfdbfe';
        };

        if (this.voiceEngine && typeof this.voiceEngine._initVoice === 'function') {
            this.voiceEngine._initVoice();
        }

        const handleSend = () => {
            if (!inputField) return;
            const userText = inputField.value.trim();
            if (!userText) return;

            this.voiceEngine.stopListening?.();
            if (sendBtn) sendBtn.disabled = true;
            setStatus('Coach sedang menyiapkan jawaban…');

            // 1. Append Bubble User
            this.appendUserMessage(userText);
            inputField.value = '';

            window.requestAnimationFrame(() => {
                try {
                    const reply = this.conversationEngine.processInput(userText);
                    if (!String(reply || '').trim()) throw new Error('EMPTY_RESPONSE');
                    this.appendCoachMessage(reply);
                    this.voiceEngine?.speak?.(reply);
                    setStatus('');
                } catch (error) {
                    this.appendCoachMessage('Maaf, Coach belum dapat menyiapkan jawaban. Silakan coba kirim ulang pesan Anda.');
                    setStatus('Jawaban Coach tidak tersedia. Chat dapat dicoba kembali.', true);
                } finally {
                    if (sendBtn) sendBtn.disabled = false;
                    inputField.focus();
                }
            });
        };

        if (sendBtn) {
            sendBtn.onclick = handleSend;
        }

        if (inputField) {
            inputField.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                }
            };
        }

        if (micBtn) {
            if (!this.voiceEngine.isRecognitionSupported?.()) {
                micBtn.disabled = true;
                micBtn.title = 'Input suara tidak tersedia di browser ini';
                setStatus('Input suara tidak tersedia di browser ini. Anda tetap dapat menggunakan chat teks.');
            }
            this.voiceEngine.onRecognitionStart = () => {
                micBtn.setAttribute('aria-pressed', 'true');
                micBtn.style.background = 'rgba(239, 68, 68, 0.35)';
                micBtn.style.borderColor = '#fb7185';
                setStatus('Mendengarkan… silakan bicara.');
            };
            this.voiceEngine.onRecognitionEnd = () => {
                micBtn.setAttribute('aria-pressed', 'false');
                micBtn.style.background = 'rgba(255, 255, 255, 0.08)';
                micBtn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            };
            this.voiceEngine.onRecognitionError = (message) => setStatus(message, true);
            this.voiceEngine.onSpeechStart = () => setStatus('Coach sedang berbicara. Mikrofon dihentikan agar tidak terjadi umpan balik.');
            this.voiceEngine.onSpeechEnd = () => setStatus('');
            micBtn.onclick = () => {
                if (this.voiceEngine?.isSpeaking?.()) {
                    setStatus('Tunggu Coach selesai berbicara sebelum menyalakan mikrofon.');
                    return;
                }
                if (this.voiceEngine?.isListening?.()) {
                    this.voiceEngine.stopListening();
                } else if (this.voiceEngine && typeof this.voiceEngine.initSpeechRecognition === 'function') {
                    this.voiceEngine.initSpeechRecognition((transcript) => {
                        inputField.value = transcript;
                        handleSend();
                    });
                }
            };
        }
    }

    appendUserMessage(text) {
        const container = document.getElementById('coach-chat-messages');
        if (!container) return;

        const bubble = document.createElement('div');
        bubble.style.cssText = 'align-self: flex-end; background: #2563eb; color: #ffffff; padding: 0.85rem 1.15rem; border-radius: 16px 16px 2px 16px; max-width: 82%; line-height: 1.5; font-size: 0.925rem; word-break: break-word;';
        bubble.innerText = text;

        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;
    }

    appendCoachMessage(text) {
        const container = document.getElementById('coach-chat-messages');
        if (!container) return;

        const bubble = document.createElement('div');
        bubble.style.cssText = 'align-self: flex-start; background: rgba(30, 41, 59, 0.9); color: #f8fafc; padding: 0.85rem 1.15rem; border-radius: 16px 16px 16px 2px; max-width: 82%; line-height: 1.5; font-size: 0.925rem; word-break: break-word; border: 1px solid rgba(255, 255, 255, 0.08);';
        bubble.innerText = text;

        container.appendChild(bubble);
        container.scrollTop = container.scrollHeight;
    }

    destroy() {
        if (this.voiceEngine && typeof this.voiceEngine.stop === 'function') {
            this.voiceEngine.stop();
        }
        if (this.conversationEngine && typeof this.conversationEngine.clearHistory === 'function') {
            this.conversationEngine.clearHistory();
        }
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export default CoachPage;

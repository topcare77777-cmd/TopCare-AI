/**
 * TOPCARE AI PLATFORM V2 — COACH PAGE SPA VIEW CONTROLLER
 * Path: assets/js/pages/coach.page.js
 * Status: APPROVED & FULLY CONNECTED TO CONVERSATION & VOICE ENGINE
 * SRP: SPA View Entry Point for Coach Discussion Hub.
 */

import { CoachConversationEngine } from '../coach/conversation/coach-conversation-engine.js';
import { CoachVoiceEngine } from '../coach/coach-voice-engine.js';

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
        // Dukung passing container dinamis dari Router
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

        // Ambil pembaruan kepribadian pengguna
        this.userPersonality = localStorage.getItem('user_personality') || 'Plegmatis';

        this.render();
        this.bindEvents();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    render() {
        const initialGreeting = `Halo! Saya Coach TopCare AI Anda. Berdasarkan karakter ${this.userPersonality} Anda, ada yang bisa saya bantu hari ini?`;

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
                    <div id="coach-chat-messages" style="height: 380px; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; padding-right: 0.5rem; margin-bottom: 1.25rem;">
                        <!-- Greeting Awal Coach -->
                        <div style="align-self: flex-start; background: rgba(30, 41, 59, 0.9); color: #f8fafc; padding: 0.85rem 1.15rem; border-radius: 16px 16px 16px 2px; max-width: 82%; line-height: 1.5; font-size: 0.925rem; border: 1px solid rgba(255, 255, 255, 0.08);">
                            ${initialGreeting}
                        </div>
                    </div>

                    <!-- BAR INPUT TEKS & MIKROFON -->
                    <div style="display: flex; gap: 0.75rem; align-items: center;">
                        <input type="text" id="coach-user-input" placeholder="Ketik atau katakan pesan Anda..." style="flex: 1; background: rgba(30, 41, 59, 0.9); border: 1px solid rgba(255, 255, 255, 0.15); color: #ffffff; padding: 0.85rem 1.15rem; border-radius: 12px; font-size: 0.95rem; outline: none; transition: border-color 0.2s ease;">
                        
                        <button id="coach-mic-btn" type="button" title="Gunakan Mikrofon Suara" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #ffffff; width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; cursor: pointer; transition: all 0.2s ease;">
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

        // Inisialisasi daftar suara di dropdown
        if (this.voiceEngine && typeof this.voiceEngine._initVoice === 'function') {
            this.voiceEngine._initVoice();
        }

        const handleSend = () => {
            if (!inputField) return;
            const userText = inputField.value.trim();
            if (!userText) return;

            // 1. Append Bubble User
            this.appendUserMessage(userText);
            inputField.value = '';

            // 2. Minta Jawaban dari Conversation Engine
            const reply = this.conversationEngine.processInput(userText);

            // 3. Append Bubble Coach
            this.appendCoachMessage(reply);

            // 4. Suarakan dengan Voice Engine
            if (this.voiceEngine && typeof this.voiceEngine.speak === 'function') {
                this.voiceEngine.speak(reply);
            }
        };

        if (sendBtn) {
            sendBtn.onclick = handleSend;
        }

        if (inputField) {
            inputField.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSend();
                }
            };
        }

        if (micBtn) {
            micBtn.onclick = () => {
                if (this.voiceEngine && typeof this.voiceEngine.initSpeechRecognition === 'function') {
                    micBtn.style.background = 'rgba(239, 68, 68, 0.2)';
                    micBtn.style.borderColor = '#ef4444';

                    this.voiceEngine.initSpeechRecognition((transcript) => {
                        inputField.value = transcript;
                        micBtn.style.background = 'rgba(255, 255, 255, 0.08)';
                        micBtn.style.borderColor = 'rgba(255, 255, 255, 0.15)';
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
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export default CoachPage;
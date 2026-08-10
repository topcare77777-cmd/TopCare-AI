/**
 * TOPCARE AI PLATFORM V2 — INTERACTION HANDLER
 * Path: assets/js/coach/ui/coach-interaction-handler.js
 */

import adaptiveEngine from '../personalization/coach-adaptive-response-engine.js';

export class CoachInteractionHandler {
    init() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('button');
            if (btn && (btn.textContent.trim() === 'Kirim' || btn.classList.contains('tc-chat-send-btn'))) {
                e.preventDefault();
                this.handleSend();
            }
        });

        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.matches('input[placeholder*="Ketik pesan"]')) {
                e.preventDefault();
                this.handleSend();
            }
        });
    }

    handleSend() {
        const inputEl = document.querySelector('input[placeholder*="Ketik pesan"]');
        if (!inputEl || !inputEl.value.trim()) return;

        const userText = inputEl.value.trim();
        inputEl.value = '';

        // Render Bubble User
        this.appendBubble(userText, 'user');

        // Render Bubble Coach Dinamis + Voice
        setTimeout(() => {
            const coachReply = adaptiveEngine.generateResponse(userText);
            this.appendBubble(coachReply, 'coach');
        }, 300);
    }

    appendBubble(text, sender) {
        const chatContainer = document.querySelector('.tc-chat-messages') || document.querySelector('.tc-chat-box') || document.querySelector('#coach-chat-area');
        if (!chatContainer) return;

        const isUser = sender === 'user';
        const html = `
            <div style="display: flex; justify-content: ${isUser ? 'flex-end' : 'flex-start'}; margin-bottom: 1rem; width: 100%;">
                <div style="background: ${isUser ? '#2563eb' : '#1e293b'}; color: #ffffff; padding: 0.85rem 1.25rem; border-radius: 12px; max-width: 80%; border: 1px solid ${isUser ? '#3b82f6' : 'rgba(255,255,255,0.1)'}; line-height: 1.5;">
                    ${text}
                </div>
            </div>
        `;
        chatContainer.insertAdjacentHTML('beforeend', html);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

const handler = new CoachInteractionHandler();
handler.init();
export default handler;
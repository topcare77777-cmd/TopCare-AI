/**
 * TOPCARE AI PLATFORM V2 — COACH CONTROLLER
 * Path: assets/js/coach/coach.controller.js
 * Status: APPROVED & FIXED (DIRECT ENGINE BINDING)
 */

import { CoachConversationEngine } from './conversation/coach-conversation-engine.js';
import { CoachVoiceEngine } from './coach-voice-engine.js';

const conversationEngine = new CoachConversationEngine();
const voiceEngine = new CoachVoiceEngine();

/**
 * Fungsi utama yang dipanggil saat tombol KIRIM diklik atau ENTER ditekan
 */
export function onUserSendMessage(userMessageText) {
    if (!userMessageText || !userMessageText.trim()) return;

    const cleanInput = userMessageText.trim();

    // 1. Tampilkan pesan user ke UI Chat
    renderUserBubbleToUI(cleanInput);

    // 2. Dapatkan balasan DARI CONVERSATION ENGINE TERBARU KITA
    const coachReply = conversationEngine.processInput(cleanInput);

    // 3. Tampilkan balasan Coach ke UI Chat
    renderCoachBubbleToUI(coachReply);

    // 4. Suarakan balasan Coach dengan Voice Engine yang presisi
    voiceEngine.speak(coachReply);
}

/**
 * Helper untuk menampilkan bubble teks user di layar UI
 */
function renderUserBubbleToUI(text) {
    const chatContainer = document.getElementById('coach-chat-messages') || document.querySelector('.tc-coach-chat-list');
    if (!chatContainer) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'tc-chat-bubble user-bubble';
    userBubble.style.cssText = 'align-self: flex-end; background: #2563eb; color: #fff; padding: 0.75rem 1rem; border-radius: 16px 16px 2px 16px; margin-bottom: 0.75rem; max-width: 80%; word-break: break-word;';
    userBubble.innerText = text;

    chatContainer.appendChild(userBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

/**
 * Helper untuk menampilkan bubble teks Coach di layar UI
 */
function renderCoachBubbleToUI(text) {
    const chatContainer = document.getElementById('coach-chat-messages') || document.querySelector('.tc-coach-chat-list');
    if (!chatContainer) return;

    const coachBubble = document.createElement('div');
    coachBubble.className = 'tc-chat-bubble coach-bubble';
    coachBubble.style.cssText = 'align-self: flex-start; background: rgba(30, 41, 59, 0.9); color: #f8fafc; padding: 0.75rem 1rem; border-radius: 16px 16px 16px 2px; margin-bottom: 0.75rem; max-width: 80%; word-break: break-word; border: 1px solid rgba(255, 255, 255, 0.08);';
    coachBubble.innerText = text;

    chatContainer.appendChild(coachBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Inisialisasi otomatis jika dipanggil lewat event listener UI
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('coach-send-btn');
    const inputField = document.getElementById('coach-user-input');

    if (sendBtn && inputField) {
        const handleSend = () => {
            const text = inputField.value;
            if (text.trim()) {
                onUserSendMessage(text);
                inputField.value = '';
            }
        };

        sendBtn.onclick = handleSend;
        inputField.onkeypress = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
            }
        };
    }
});
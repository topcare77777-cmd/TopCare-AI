import { CoachConversationEngine } from './conversation/coach-conversation-engine.js';
import { CoachVoiceEngine } from './coach-voice-engine.js';

const conversationEngine = new CoachConversationEngine();
const voiceEngine = new CoachVoiceEngine();

export function onUserSendMessage(userMessageText) {
    // 1. Dapatkan jawaban dinamis dari Conversation Engine
    const coachReply = conversationEngine.processInput(userMessageText);

    // 2. Tampilkan pesan di layar (Append Bubble UI)
    renderCoachBubbleToUI(coachReply);

    // 3. Suarakan teks balasan Coach!
    voiceEngine.speak(coachReply);
}
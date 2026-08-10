/**
 * TOPCARE AI PLATFORM V2 — CONVERSATION CONTEXT
 * Path: assets/js/coach/conversation/coach-conversation-context.js
 */

import { adaptiveEngine } from '../personalization/coach-adaptive-response-engine.js';

export class CoachConversationContext {
    constructor() {
        this.history = [];
    }

    processUserMessage(message) {
        this.history.push({ role: 'user', text: message });

        // Panggil mesin adaptive dinamis + suara
        const coachReply = adaptiveEngine.generateResponse(message);

        this.history.push({ role: 'coach', text: coachReply });
        return coachReply;
    }
}

export default new CoachConversationContext();
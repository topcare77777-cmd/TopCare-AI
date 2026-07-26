// assets/js/coach/conversation/coach-conversation-context.js
/**
 * @file coach-conversation-context.js
 * @description Manages lightweight, transient session state and conversation context for active interactions.
 * @module Coach/Conversation/Context
 */

let sessionContext = {
    sessionId: null,
    lastTopic: null,
    interactionMode: "text",
    userMood: "neutral",
    conversationDepth: 0,
    lastResponseStyle: "supportive",
    updatedAt: null
};

export const CoachConversationContext = {
    initialize() {
        this.resetSession();
        return true;
    },

    resetSession() {
        sessionContext = {
            sessionId: "sess_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            lastTopic: null,
            interactionMode: "text",
            userMood: "neutral",
            conversationDepth: 0,
            lastResponseStyle: "supportive",
            updatedAt: new Date().toISOString()
        };
        return { ...sessionContext };
    },

    getSession() {
        if (!sessionContext.sessionId) {
            this.initialize();
        }
        return { ...sessionContext };
    },

    update(partialContext) {
        if (!sessionContext.sessionId) {
            this.initialize();
        }

        sessionContext = {
            ...sessionContext,
            ...partialContext,
            conversationDepth: (partialContext.incrementDepth) ? sessionContext.conversationDepth + 1 : sessionContext.conversationDepth,
            updatedAt: new Date().toISOString()
        };

        // Remove ephemeral flags
        delete sessionContext.incrementDepth;

        return { ...sessionContext };
    },

    clear() {
        return this.resetSession();
    }
};
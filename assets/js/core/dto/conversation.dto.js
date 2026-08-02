/**
 * TOPCARE AI PLATFORM V2 — CONVERSATION DTO SCHEMA
 * Path: assets/js/core/dto/conversation.dto.js
 * Role: Single Source of Truth for Pipeline Execution State Payload
 */

import { deepFreezeDTO } from '../utils/dto.js';

/**
 * Creates a standardized immutable ConversationDTO packet (Vendor-Agnostic & Deterministic).
 * @param {Object} params
 * @returns {Object} Deep-frozen ConversationDTO.
 */
export function createConversationDTO({
    identity = {},
    personality = {},
    memory = {},
    context = {},
    strategy = {},
    userMessage = '',
    metadata = {}
}) {
    const dtoPayload = {
        identity: {
            displayName: identity.displayName || identity.name || 'Tamu',
            membership: identity.membership || 'free',
            isLoggedIn: Boolean(identity.isLoggedIn)
        },
        personality: {
            type: personality.type || identity.personality || 'Umum',
            traits: Array.isArray(personality.traits) ? [...personality.traits] : []
        },
        conversation: {
            history: Array.isArray(memory.history) ? [...memory.history] : [],
            turnCount: typeof memory.turnCount === 'number' ? memory.turnCount : 0,
            lastTopic: memory.lastTopic || null,
            lastIntent: memory.lastIntent || null,
            userMessage: typeof userMessage === 'string' ? userMessage.trim() : ''
        },
        reasoning: {
            intentId: context.intent?.id || 'unknown',
            confidence: context.intent?.confidence || 0.0,
            entities: context.intent?.entities || []
        },
        instruction: {
            coachId: strategy.coach?.id || 'coach-kael',
            persona: strategy.coach?.persona || 'standard-guide',
            tone: strategy.communication?.tone || 'neutral',
            style: strategy.communication?.style || 'structured',
            verbosity: strategy.communication?.verbosity || 'normal',
            primaryObjective: strategy.objective?.primary || 'assist'
        },
        runtime: {
            version: '2.0.0',
            schema: 'generic-conversation-v2',
            ...metadata
        }
    };

    return deepFreezeDTO(dtoPayload);
}

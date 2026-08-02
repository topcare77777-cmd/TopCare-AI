/**
 * TOPCARE AI PLATFORM V2 — DIALOGUE STATE DTO & RESPONSE MODEL DTO FACTORIES
 * Path: assets/js/core/conversation/dialogue.state.dto.js
 * Status: ACTIVE (SPRINT B - LOCKED GOLDEN BASELINE)
 */

import { KNOWN_SCHEMA_TYPES } from '../schema/schema.catalog.js';
import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const CONVERSATION_SCHEMA_VERSION = '2.0.0';

export const DIALOGUE_ACTIONS = deepFreezeDTO({
    EXECUTE_CAPABILITY: 'EXECUTE_CAPABILITY',
    CLARIFY: 'CLARIFY',
    INFORM: 'INFORM',
    TERMINATE: 'TERMINATE'
});

export function createDialogueStateDTO({
    conversationId,
    activeIntent = null,
    currentCapabilityId = null,
    clarificationRequired = false,
    missingEntities = [],
    collectedEntities = {},
    nextAction = DIALOGUE_ACTIONS.EXECUTE_CAPABILITY,
    timeProvider = TimeProvider
}) {
    if (!conversationId || typeof conversationId !== 'string') {
        throw new Error('[DialogueStateDTO] conversationId is required.');
    }

    return deepFreezeDTO({
        schemaType: 'DialogueStateDTO',
        schemaVersion: CONVERSATION_SCHEMA_VERSION,
        conversationId: String(conversationId),
        activeIntent: activeIntent ? String(activeIntent).toUpperCase().trim() : null,
        currentCapabilityId: currentCapabilityId ? String(currentCapabilityId).toLowerCase().trim() : null,
        clarificationRequired: Boolean(clarificationRequired),
        missingEntities: Object.freeze([...missingEntities]),
        collectedEntities: deepFreezeDTO({ ...collectedEntities }),
        nextAction: DIALOGUE_ACTIONS[nextAction] || DIALOGUE_ACTIONS.EXECUTE_CAPABILITY,
        updatedAt: timeProvider.iso()
    });
}

export function createResponseModelDTO({
    conversationId,
    rawContent = '',
    suggestedActions = [],
    uiWidgetHint = 'standard-card',
    metadata = {}
}) {
    return deepFreezeDTO({
        schemaType: 'ResponseModelDTO',
        schemaVersion: CONVERSATION_SCHEMA_VERSION,
        conversationId: String(conversationId),
        rawContent: String(rawContent),
        suggestedActions: Object.freeze([...suggestedActions]),
        uiWidgetHint: String(uiWidgetHint),
        metadata: deepFreezeDTO({ ...metadata })
    });
}

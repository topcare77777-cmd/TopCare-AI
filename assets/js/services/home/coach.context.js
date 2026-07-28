/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Conversation Context Engine)
 * Status       : ACTIVE
 * Version      : 1.1.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 49A.2
 * Last Updated : Sprint 49A.2 (Final Hardened)
 * 
 * Description  : Pure orchestration service that merges user messages,
 *                intent analysis results, and runtime memory snapshots into
 *                a unified, immutable conversation context contract deterministically.
 * -----------------------------------------------------------------
 */

import CoachIntent from './coach.intent.js';
import CoachMemory from './coach.memory.js';

/**
 * Context Engine Schema Version.
 * @type {string}
 */
const CONTEXT_SCHEMA_VERSION = '1.1.0';

/**
 * Coach Context Engine Singleton Service.
 * Combines runtime inputs into a unified read-only context contract without side effects.
 */
const CoachContext = (() => {

    /**
     * Builds conversation context by automatically retrieving active state from CoachIntent and CoachMemory.
     * 
     * @param {string} message - Raw user input message.
     * @param {string} [timestamp] - Optional injected timestamp to maintain determinism.
     * @returns {Object} Structured conversation context contract.
     */
    function build(message, timestamp = new Date().toISOString()) {
        const rawMessage = typeof message === 'string' ? message : '';
        const intentResult = CoachIntent.detect(rawMessage);
        const memorySnapshot = CoachMemory.get();

        return buildFrom(rawMessage, intentResult, memorySnapshot, timestamp);
    }

    /**
     * Builds conversation context using injected dependencies (ideal for unit testing).
     * Pure function: Deterministic mapping of explicit inputs to output context contract.
     * 
     * @param {string} message - Raw user input message.
     * @param {Object} intent - Intent result contract from CoachIntent.
     * @param {Object} memory - Memory snapshot from CoachMemory.
     * @param {string} [timestamp] - Optional explicit timestamp for complete determinism.
     * @returns {Object} Structured conversation context contract.
     */
    function buildFrom(message, intent, memory, timestamp = null) {
        const safeMessage = typeof message === 'string' ? message : '';
        const safeIntent = intent && typeof intent === 'object' ? intent : { id: 'unknown', confidence: 0.0, entities: [], metadata: {} };
        const safeMemory = memory && typeof memory === 'object' ? memory : {};

        const identity = safeMemory.identity || {};
        const conversation = safeMemory.conversation || {};
        const preferences = safeMemory.preferences || {};

        const historyArray = Array.isArray(conversation.history) ? conversation.history : [];
        const lastHistoryItem = historyArray.length > 0 ? historyArray[historyArray.length - 1] : null;

        // Deep copy entities to prevent shared references
        const safeEntities = Array.isArray(safeIntent.entities)
            ? safeIntent.entities.map(entity => ({ ...(entity || {}) }))
            : [];

        // Deep copy metadata to isolate nested structures
        const safeMetadata = safeIntent.metadata && typeof safeIntent.metadata === 'object'
            ? JSON.parse(JSON.stringify(safeIntent.metadata))
            : {};

        return Object.freeze({
            message: safeMessage,
            intent: Object.freeze({
                id: safeIntent.id || 'unknown',
                confidence: typeof safeIntent.confidence === 'number' ? safeIntent.confidence : 0.0,
                entities: Object.freeze(safeEntities),
                metadata: Object.freeze(safeMetadata)
            }),
            identity: Object.freeze({
                isLoggedIn: Boolean(identity.isLoggedIn),
                displayName: identity.displayName || identity.name || 'Guest',
                membership: identity.membership || 'free',
                personality: identity.personality || null,
                avatar: identity.avatar || null
            }),
            conversation: Object.freeze({
                turn: typeof conversation.turnCount === 'number' ? conversation.turnCount : 0,
                lastIntent: conversation.lastIntent || null,
                lastTopic: conversation.lastTopic || null,
                greeting: conversation.lastGreeting || null,
                historyLength: historyArray.length,
                lastHistory: lastHistoryItem ? Object.freeze({ ...lastHistoryItem }) : null
            }),
            preferences: Object.freeze({
                coach: preferences.coach || identity.coachPreference || null,
                voice: preferences.voice || identity.voicePreference || null
            }),
            runtime: Object.freeze({
                version: CONTEXT_SCHEMA_VERSION,
                timestamp: timestamp || new Date().toISOString()
            })
        });
    }

    return Object.freeze({
        build,
        buildFrom
    });
})();

export default CoachContext;
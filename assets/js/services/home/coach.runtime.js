/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Runtime Orchestrator)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 49A.5
 * 
 * Description  : End-to-end pipeline execution conductor.
 *                Coordinates Intent Detection, Context Building, Strategy Resolution, 
 *                Response Composition, Memory Synchronization, and Event Notification 
 *                with robust Error Boundary protection.
 * -----------------------------------------------------------------
 */

import CoachIntent from './coach.intent.js';
import CoachContext from './coach.context.js';
import CoachStrategy from './coach.strategy.js';
import CoachResponse from './coach.response.js';
import CoachMemory from './coach.memory.js';

/**
 * Runtime Orchestrator Schema Version.
 * @type {string}
 */
const RUNTIME_SCHEMA_VERSION = '1.0.0';

/**
 * Event Types emitted by CoachRuntime.
 * @readonly
 */
const RUNTIME_EVENTS = Object.freeze({
    RESPONSE_READY: 'COACH_RESPONSE_READY',
    PIPELINE_ERROR: 'COACH_PIPELINE_ERROR'
});

/**
 * Fallback response contract used when the pipeline encounters an unrecoverable exception.
 * @readonly
 */
const FALLBACK_RESPONSE = Object.freeze({
    text: "Maaf, mari kita mulai kembali dari kebutuhan utama Anda.",
    coach: Object.freeze({
        id: 'coach-kael',
        persona: 'standard-guide'
    }),
    communication: Object.freeze({
        tone: 'neutral',
        style: 'structured',
        verbosity: 'normal'
    }),
    objective: Object.freeze({
        primary: 'assist',
        secondary: 'clarify'
    }),
    metadata: Object.freeze({
        version: RUNTIME_SCHEMA_VERSION,
        generatedBy: 'error-boundary-fallback',
        template: 'unknown',
        coach: 'coach-kael',
        deterministic: true
    })
});

/**
 * Coach Runtime Orchestrator Singleton Service.
 * Manages the unified intelligence pipeline execution and memory updates.
 */
const CoachRuntime = (() => {

    /** @type {Set<Function>} */
    const listeners = new Set();

    /**
     * Internal step: Executes intent detection.
     * @param {string} message - User input message.
     * @returns {Object} Intent contract.
     * @private
     */
    function executeIntent(message) {
        return CoachIntent.detect(message);
    }

    /**
     * Internal step: Builds conversation context.
     * @param {string} message - User input message.
     * @param {Object} intent - Intent contract.
     * @param {string} timestamp - Timestamp for determinism.
     * @returns {Object} Context contract.
     * @private
     */
    function buildContext(message, intent, timestamp) {
        const memorySnapshot = CoachMemory.get();
        return CoachContext.buildFrom(message, intent, memorySnapshot, timestamp);
    }

    /**
     * Internal step: Resolves communication strategy.
     * @param {Object} context - Context contract.
     * @returns {Object} Strategy contract.
     * @private
     */
    function resolveStrategy(context) {
        return CoachStrategy.resolve(context);
    }

    /**
     * Internal step: Composes final response.
     * @param {Object} context - Context contract.
     * @param {Object} strategy - Strategy contract.
     * @returns {Object} Response contract.
     * @private
     */
    function composeResponse(context, strategy) {
        return CoachResponse.compose(context, strategy);
    }

    /**
     * Internal step: Synchronizes runtime memory updates (lastIntent, lastTopic, turnCount).
     * @param {string} message - User input message.
     * @param {Object} intent - Intent contract.
     * @param {Object} response - Response contract.
     * @private
     */
    function persistMemory(message, intent, response) {
        try {
            const currentMemory = CoachMemory.get();
            const currentConv = currentMemory.conversation || {};

            // Append user history turn
            CoachMemory.appendHistory({
                role: 'user',
                intent: intent.id,
                topic: intent.entities?.[0]?.value || null,
                timestamp: new Date().toISOString()
            });

            // Update conversational state parameters via official update contract
            CoachMemory.update({
                conversation: {
                    ...currentConv,
                    lastIntent: intent.id,
                    lastTopic: intent.entities?.[0]?.value || currentConv.lastTopic || null,
                    lastGreeting: response.text ? currentConv.lastGreeting : currentConv.lastGreeting
                }
            });
        } catch (err) {
            console.error('[CoachRuntime] Failed to persist memory update:', err);
        }
    }

    /**
     * Internal step: Dispatches events to registered consumer subscribers.
     * @param {string} type - Event type identifier.
     * @param {Object} payload - Event payload data.
     * @private
     */
    function emit(type, payload) {
        const eventObject = Object.freeze({
            type,
            payload: Object.freeze(payload),
            timestamp: new Date().toISOString()
        });

        for (const callback of listeners) {
            try {
                callback(eventObject);
            } catch (err) {
                console.error('[CoachRuntime] Error in event listener execution:', err);
            }
        }
    }

    /**
     * Public API: Subscribes to runtime pipeline event notifications.
     * @param {Function} callback - Execution handler receiving event packets.
     * @returns {Function} Unsubscribe cleanup handler.
     */
    function subscribe(callback) {
        if (typeof callback === 'function') {
            listeners.add(callback);
        }
        return () => unsubscribe(callback);
    }

    /**
     * Public API: Unregisters an existing event listener callback.
     * @param {Function} callback - Handler to remove.
     */
    function unsubscribe(callback) {
        if (typeof callback === 'function') {
            listeners.delete(callback);
        }
    }

    /**
     * Public API: Executes the complete intelligence pipeline for a given user message.
     * Enforces error boundary protection and memory synchronization.
     * 
     * @param {string} message - Raw user input message.
     * @returns {Object} Standardized execution bundle (context, strategy, response, metadata, timestamp).
     */
    function process(message) {
        const timestamp = new Date().toISOString();
        let context, strategy, response;

        try {
            // 1. Intent Detection
            const intent = executeIntent(message);

            // 2. Context Building
            context = buildContext(message, intent, timestamp);

            // 3. Strategy Resolution
            strategy = resolveStrategy(context);

            // 4. Response Composition
            response = composeResponse(context, strategy);

            // 5. Memory Synchronization
            persistMemory(message, intent, response);

        } catch (error) {
            console.error('[CoachRuntime] Pipeline execution exception caught by Error Boundary:', error);

            // Fallback safe recovery bundle
            response = FALLBACK_RESPONSE;
            context = CoachContext.buildFrom(message, { id: 'unknown', confidence: 0.0, entities: [], metadata: {} }, CoachMemory.get(), timestamp);
            strategy = CoachStrategy.resolve(context);

            emit(RUNTIME_EVENTS.PIPELINE_ERROR, { error: error.message, response });
        }

        const executionBundle = Object.freeze({
            context: Object.freeze(context),
            strategy: Object.freeze(strategy),
            response: Object.freeze(response),
            metadata: Object.freeze({
                version: RUNTIME_SCHEMA_VERSION,
                pipeline: Object.freeze(['intent', 'context', 'strategy', 'response']),
                deterministic: true
            }),
            timestamp
        });

        // Emit successful response ready event
        emit(RUNTIME_EVENTS.RESPONSE_READY, executionBundle);

        return executionBundle;
    }

    return Object.freeze({
        process,
        subscribe,
        unsubscribe,
        EVENTS: RUNTIME_EVENTS
    });
})();

export default CoachRuntime;
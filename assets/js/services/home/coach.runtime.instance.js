/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Runtime Instance)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 51A.1
 * 
 * Description  : Non-singleton, isolated execution instance for a specific coach persona.
 *                Wraps the locked Intelligence Layer v1.0 pipeline, binds to a dedicated 
 *                memory namespace, and emits source-tracked event notifications.
 * -----------------------------------------------------------------
 */

import CoachIntent from './coach.intent.js';
import CoachContext from './coach.context.js';
import CoachStrategy from './coach.strategy.js';
import CoachResponse from './coach.response.js';

/**
 * Runtime Instance Schema Version.
 * @type {string}
 */
const RUNTIME_INSTANCE_SCHEMA_VERSION = '1.0.0';

/**
 * Runtime Instance Event Types.
 * @readonly
 */
const INSTANCE_EVENTS = Object.freeze({
    RESPONSE_READY: 'COACH_RESPONSE_READY',
    PIPELINE_ERROR: 'COACH_PIPELINE_ERROR'
});

/**
 * Fallback response contract used when instance pipeline encounters unrecoverable errors.
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
        version: RUNTIME_INSTANCE_SCHEMA_VERSION,
        generatedBy: 'error-boundary-fallback',
        template: 'unknown',
        coach: 'coach-kael',
        deterministic: true
    })
});

/**
 * Creates a unique runtime instance identifier.
 * @returns {string} Unique hash string.
 */
function generateRuntimeId() {
    return 'runtime-' + Math.random().toString(36).substring(2, 9);
}

/**
 * Factory creator function for a standalone Coach Runtime Instance.
 * 
 * @param {Object} config - Instance configuration parameters.
 * @param {string} config.coachId - Unique identifier of the coach.
 * @param {string} config.persona - Persona description of the coach.
 * @param {string} config.memoryNamespace - Dedicated memory namespace identifier.
 * @param {Object} [config.memoryManager] - Injected namespaced memory manager instance.
 * @returns {Object} Immutable runtime instance controller.
 */
function createCoachRuntimeInstance(config) {
    const safeConfig = config && typeof config === 'object' ? config : {};
    const coachId = safeConfig.coachId || 'coach-kael';
    const persona = safeConfig.persona || 'standard-guide';
    const memoryNamespace = safeConfig.memoryNamespace || 'default-session';
    const memoryManager = safeConfig.memoryManager || null;

    const runtimeId = generateRuntimeId();
    const listeners = new Set();

    /**
     * Internal step: Retrieves memory snapshot from the isolated namespace manager.
     * @returns {Object} Memory snapshot contract.
     * @private
     */
    function getMemorySnapshot() {
        if (memoryManager && typeof memoryManager.get === 'function') {
            return memoryManager.get(memoryNamespace);
        }
        // Fallback default structure if no namespaced manager is injected
        return { identity: {}, conversation: {}, preferences: {} };
    }

    /**
     * Internal step: Persists updates to the isolated memory namespace.
     * @param {Object} updatePayload - Data to update.
     * @private
     */
    function persistMemory(updatePayload) {
        if (memoryManager && typeof memoryManager.update === 'function') {
            memoryManager.update(memoryNamespace, updatePayload);
        }
    }

    /**
     * Internal step: Appends history turn to namespaced memory.
     * @param {Object} historyItem - Turn item.
     * @private
     */
    function appendHistory(historyItem) {
        if (memoryManager && typeof memoryManager.appendHistory === 'function') {
            memoryManager.appendHistory(memoryNamespace, historyItem);
        }
    }

    /**
     * Internal step: Dispatches events containing source identity metadata.
     * @param {string} type - Event type identifier.
     * @param {Object} payload - Event payload data.
     * @private
     */
    function emit(type, payload) {
        const eventObject = Object.freeze({
            type,
            source: Object.freeze({
                coachId,
                runtimeId,
                memoryNamespace
            }),
            payload: Object.freeze(payload),
            timestamp: new Date().toISOString()
        });

        for (const callback of listeners) {
            try {
                callback(eventObject);
            } catch (err) {
                console.error(`[CoachRuntimeInstance:${coachId}] Error in event listener execution:`, err);
            }
        }
    }

    /**
     * Subscribes to instance event notifications.
     * @param {Function} callback - Execution handler receiving event packets.
     * @returns {Function} Unsubscribe cleanup handler.
     */
    function subscribe(callback) {
        if (typeof callback === 'function') {
            listeners.add(callback);
        }
        return () => {
            if (typeof callback === 'function') {
                listeners.delete(callback);
            }
        };
    }

    /**
     * Executes the intelligence pipeline for this specific coach runtime instance.
     * 
     * @param {string} message - Raw user input message.
     * @returns {Object} Standardized execution bundle with source tracking.
     */
    function process(message) {
        const timestamp = new Date().toISOString();
        let context, strategy, response;

        try {
            // 1. Intent Detection
            const intent = CoachIntent.detect(message);

            // 2. Context Building using namespaced memory snapshot
            const memorySnapshot = getMemorySnapshot();
            context = CoachContext.buildFrom(message, intent, memorySnapshot, timestamp);

            // 3. Strategy Resolution (forcing instance coach preference if needed)
            strategy = CoachStrategy.resolve(context);

            // 4. Response Composition
            response = CoachResponse.compose(context, strategy);

            // 5. Memory Synchronization via Namespaced Manager
            appendHistory({
                role: 'user',
                intent: intent.id,
                topic: intent.entities?.[0]?.value || null,
                timestamp
            });

            const currentConv = memorySnapshot.conversation || {};
            persistMemory({
                conversation: {
                    ...currentConv,
                    lastIntent: intent.id,
                    lastTopic: intent.entities?.[0]?.value || currentConv.lastTopic || null
                }
            });

        } catch (error) {
            console.error(`[CoachRuntimeInstance:${coachId}] Pipeline exception caught by Error Boundary:`, error);

            response = FALLBACK_RESPONSE;
            const memorySnapshot = getMemorySnapshot();
            context = CoachContext.buildFrom(message, { id: 'unknown', confidence: 0.0, entities: [], metadata: {} }, memorySnapshot, timestamp);
            strategy = CoachStrategy.resolve(context);

            emit(INSTANCE_EVENTS.PIPELINE_ERROR, { error: error.message, response });
        }

        const executionBundle = Object.freeze({
            context: Object.freeze(context),
            strategy: Object.freeze(strategy),
            response: Object.freeze(response),
            metadata: Object.freeze({
                version: RUNTIME_INSTANCE_SCHEMA_VERSION,
                coachId,
                runtimeId,
                namespace: memoryNamespace,
                pipeline: Object.freeze(['intent', 'context', 'strategy', 'response']),
                deterministic: true
            }),
            timestamp
        });

        emit(INSTANCE_EVENTS.RESPONSE_READY, executionBundle);

        return executionBundle;
    }

    /**
     * Returns current instance identity configuration.
     * @returns {Object} Immutable identity profile.
     */
    function getIdentity() {
        return Object.freeze({
            coachId,
            persona,
            runtimeId,
            memoryNamespace
        });
    }

    /**
     * Returns current operational status of the runtime instance.
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            runtimeId,
            coachId,
            activeListeners: listeners.size,
            schemaVersion: RUNTIME_INSTANCE_SCHEMA_VERSION
        });
    }

    return Object.freeze({
        process,
        subscribe,
        getIdentity,
        getStatus,
        EVENTS: INSTANCE_EVENTS
    });
}

export default createCoachRuntimeInstance;
/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Trace Middleware)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 52A.2
 * 
 * Description  : Runtime middleware responsible for injecting
 *                immutable trace context into coach execution flow.
 *                Provides correlation metadata without altering
 *                intelligence decisions.
 * -----------------------------------------------------------------
 */

import CoachTraceContext from './coach.trace.context.js';

/**
 * Trace Middleware Schema Version.
 * @type {string}
 */
const MIDDLEWARE_SCHEMA_VERSION = '1.0.0';

/**
 * Factory creator function for a Coach Trace Injection Middleware.
 * 
 * @param {Object} [config={}] - Optional configuration parameters for correlation.
 * @param {string} [config.coachId] - Target coach persona identifier.
 * @param {string} [config.runtimeId] - Runtime instance identifier.
 * @param {string} [config.sessionId] - Session namespace identifier.
 * @returns {Object} Immutable trace middleware instance controller.
 */
function createMiddleware(config) {
    const safeConfig = config && typeof config === 'object' ? config : {};
    const coachId = safeConfig.coachId || 'unknown-coach';
    const runtimeId = safeConfig.runtimeId || 'unknown-runtime';
    const sessionId = safeConfig.sessionId || 'default-session';

    /**
     * Executes a given handler function wrapped with an injected trace context.
     * Enriches execution output bundles with immutable trace metadata.
     * 
     * @param {Function} handler - The execution function (e.g., runtime.process callback).
     * @returns {Object} Enriched and frozen execution bundle.
     * @throws {Error} Propagates any handler execution errors safely.
     */
    function execute(handler) {
        if (typeof handler !== 'function') {
            throw new Error('[CoachTraceMiddleware] Provided handler must be a function.');
        }

        // 1. Generate unique correlation trace context for this execution turn
        const trace = CoachTraceContext.create({
            coachId,
            runtimeId,
            sessionId
        });

        const startTime = Date.now();
        let result;

        try {
            // 2. Execute the downstream intelligence pipeline handler
            result = handler(trace);
        } catch (error) {
            // 3. Error Boundary Propagation: Attach trace correlation and rethrow
            console.error(`[CoachTraceMiddleware] Pipeline error captured under TraceID: ${trace.traceId}`, error);

            // Attach trace reference to error object if extensible
            if (error && typeof error === 'object') {
                try {
                    error.traceId = trace.traceId;
                    error.requestId = trace.requestId;
                    error.errorCaptured = true;
                } catch (_) {
                    // Ignore immutability constraints on arbitrary error objects
                }
            }
            throw error;
        }

        const durationMs = Date.now() - startTime;

        // 4. Enrich result bundle with immutable trace metadata contract
        const safeResult = result && typeof result === 'object' ? result : { response: result };
        const existingMetadata = safeResult.metadata && typeof safeResult.metadata === 'object' ? safeResult.metadata : {};

        return Object.freeze({
            ...safeResult,
            metadata: Object.freeze({
                ...existingMetadata,
                version: existingMetadata.version || '1.0.0',
                trace: Object.freeze({
                    traceId: trace.traceId,
                    requestId: trace.requestId,
                    runtimeId: trace.runtimeId,
                    sessionId: trace.sessionId,
                    coachId: trace.coachId,
                    durationMs
                })
            })
        });
    }

    /**
     * Returns operational status and metadata of this middleware instance.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: MIDDLEWARE_SCHEMA_VERSION,
            active: true,
            provider: 'coach-trace-context',
            boundCoachId: coachId,
            boundRuntimeId: runtimeId
        });
    }

    return Object.freeze({
        execute,
        getStatus
    });
}

/**
 * Coach Trace Middleware Namespace Object.
 * Exposes factory creator.
 */
const CoachTraceMiddleware = Object.freeze({
    create: createMiddleware
});

export default CoachTraceMiddleware;
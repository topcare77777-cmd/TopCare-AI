/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Trace Context)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 52A.1
 * 
 * Description  : Immutable tracing context generator.
 *                Provides deterministic execution identifiers
 *                and metadata propagation across Coach Runtime pipeline.
 * -----------------------------------------------------------------
 */

/**
 * Trace Context Schema Version.
 * @type {string}
 */
const TRACE_SCHEMA_VERSION = '1.0.0';

/**
 * Generates a unique, pseudo-random correlation identifier with a specified prefix.
 * 
 * @param {string} prefix - Identifier category prefix (e.g., 'trace', 'request').
 * @returns {string} Formatted unique ID string.
 * @private
 */
function generateId(prefix) {
    const safePrefix = typeof prefix === 'string' && prefix.trim() ? prefix.trim() : 'id';
    const randomPart = Math.random().toString(36).substring(2, 10);
    const timePart = Date.now().toString(36);
    return `${safePrefix}-${timePart}${randomPart}`;
}

/**
 * Coach Trace Context Singleton Service / Factory.
 * Generates immutable execution trace packets for pipeline correlation.
 */
const CoachTraceContext = (() => {

    /**
     * Creates an immutable trace context object for an execution turn.
     * 
     * @param {Object} [options={}] - Optional runtime identity binding parameters.
     * @param {string} [options.runtimeId] - Runtime instance identifier.
     * @param {string} [options.sessionId] - Session namespace identifier.
     * @param {string} [options.coachId] - Target coach persona identifier.
     * @param {string} [options.traceId] - Optional pre-existing trace ID for distributed correlation.
     * @returns {Object} Immutable trace context contract.
     */
    function create(options) {
        const safeOptions = options && typeof options === 'object' ? options : {};

        const traceId = safeOptions.traceId || generateId('trace');
        const requestId = generateId('request');
        const runtimeId = safeOptions.runtimeId || 'runtime-unknown';
        const sessionId = safeOptions.sessionId || 'session-default';
        const coachId = safeOptions.coachId || 'coach-kael';
        const createdAt = new Date().toISOString();

        return Object.freeze({
            traceId,
            requestId,
            runtimeId,
            sessionId,
            coachId,
            createdAt,
            metadata: Object.freeze({
                version: TRACE_SCHEMA_VERSION,
                source: 'coach-observability',
                deterministic: true
            })
        });
    }

    /**
     * Returns operational status and metadata of the trace context generator.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: TRACE_SCHEMA_VERSION,
            active: true,
            provider: 'coach-trace-context'
        });
    }

    return Object.freeze({
        create,
        getStatus
    });
})();

export default CoachTraceContext;
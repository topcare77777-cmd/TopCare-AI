/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Observability Event Aggregator)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 52A.5
 * 
 * Description  : Unified telemetry hub and event aggregator.
 *                Subscribes to analytics metrics and decision audits,
 *                normalizes packet schemas, correlates events by traceId,
 *                and exposes a single synchronized observability stream.
 * -----------------------------------------------------------------
 */

import CoachAnalyticsHooks from './coach.analytics.hooks.js';
import CoachDecisionAudit from './coach.decision.audit.js';

/**
 * Aggregator Schema Version.
 * @type {string}
 */
const AGGREGATOR_SCHEMA_VERSION = '1.0.0';

/**
 * Aggregated Event Types.
 * @readonly
 */
const AGGREGATED_EVENTS = Object.freeze({
    TELEMETRY_RECORDED: 'COACH_TELEMETRY_RECORDED'
});

/**
 * Coach Observability Aggregator Singleton Service.
 * Centralizes telemetry event ingestion, correlation, and dispatching.
 */
const CoachObservabilityAggregator = (() => {

    /** @type {Set<Function>} */
    const subscribers = new Set();

    /** @type {Function|null} */
    let analyticsUnsubscribe = null;

    /** @type {Function|null} */
    let auditUnsubscribe = null;

    /** @type {boolean} */
    let isInitialized = false;

    /**
     * Internal correlation buffer to map related events by traceId.
     * @type {Map<string, Array<Object>>}
     */
    const traceBuffer = new Map();

    /**
     * Maximum capacity for the trace correlation buffer to prevent memory bloat.
     * @type {number}
     */
    const MAX_BUFFER_SIZE = 500;

    /**
     * Dispatches normalized, unified event packets to all global subscribers.
     * @param {Object} unifiedPacket - Normalized telemetry packet.
     * @private
     */
    function emitUnified(unifiedPacket) {
        for (const callback of subscribers) {
            try {
                callback(unifiedPacket);
            } catch (err) {
                console.error('[CoachObservabilityAggregator] Error in subscriber callback:', err);
            }
        }
    }

    /**
     * Ingests, normalizes, buffers, and dispatches incoming raw telemetry events.
     * @param {Object} rawEvent - Incoming raw event from hooks or audits.
     * @private
     */
    function handleIncomingEvent(rawEvent) {
        if (!rawEvent || typeof rawEvent !== 'object') return;

        const rawPayload = rawEvent.payload || {};
        const traceId = rawPayload.traceId || 'untracked-trace';
        const timestamp = rawPayload.timestamp || new Date().toISOString();

        const normalizedPacket = Object.freeze({
            type: AGGREGATED_EVENTS.TELEMETRY_RECORDED,
            category: rawEvent.type === CoachAnalyticsHooks.EVENTS.PIPELINE_METRIC_RECORDED ? 'metric' : 'decision',
            sourceEventType: rawEvent.type,
            payload: Object.freeze({
                ...rawPayload,
                aggregatedAt: new Date().toISOString()
            }),
            timestamp
        });

        // Buffer correlation by traceId
        if (!traceBuffer.has(traceId)) {
            if (traceBuffer.size >= MAX_BUFFER_SIZE) {
                // Evict oldest entry (First-In, First-Out)
                const oldestKey = traceBuffer.keys().next().value;
                traceBuffer.delete(oldestKey);
            }
            traceBuffer.set(traceId, []);
        }

        const buffer = traceBuffer.get(traceId);
        buffer.push(normalizedPacket);

        // Emit to global subscribers
        emitUnified(normalizedPacket);
    }

    /**
     * Public API: Initializes the aggregator by subscribing to underlying analytics and audit streams.
     */
    function initialize() {
        if (isInitialized) return;

        analyticsUnsubscribe = CoachAnalyticsHooks.subscribe(handleIncomingEvent);
        auditUnsubscribe = CoachDecisionAudit.subscribe(handleIncomingEvent);

        isInitialized = true;
    }

    /**
     * Public API: Shuts down the aggregator, cleaning up all upstream subscriptions.
     */
    function shutdown() {
        if (typeof analyticsUnsubscribe === 'function') {
            analyticsUnsubscribe();
            analyticsUnsubscribe = null;
        }

        if (typeof auditUnsubscribe === 'function') {
            auditUnsubscribe();
            auditUnsubscribe = null;
        }

        subscribers.clear();
        traceBuffer.clear();
        isInitialized = false;
    }

    /**
     * Public API: Subscribes to the unified observability event stream.
     * 
     * @param {Function} callback - Execution handler receiving normalized event packets.
     * @returns {Function} Unsubscribe cleanup handler.
     */
    function subscribe(callback) {
        if (typeof callback === 'function') {
            subscribers.add(callback);
        }
        return () => {
            if (typeof callback === 'function') {
                subscribers.delete(callback);
            }
        };
    }

    /**
     * Public API: Retrieves correlated telemetry events for a specific traceId.
     * 
     * @param {string} traceId - Target correlation trace identifier.
     * @returns {Array<Object>} Immutable list of correlated telemetry packets.
     */
    function getCorrelatedTrace(traceId) {
        const safeId = typeof traceId === 'string' ? traceId.trim() : '';
        if (!safeId || !traceBuffer.has(safeId)) {
            return Object.freeze([]);
        }
        return Object.freeze([...traceBuffer.get(safeId)]);
    }

    /**
     * Returns operational status and metadata of the observability aggregator.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: AGGREGATOR_SCHEMA_VERSION,
            initialized: isInitialized,
            activeSubscribers: subscribers.size,
            bufferedTracesCount: traceBuffer.size,
            provider: 'coach-observability-aggregator'
        });
    }

    return Object.freeze({
        initialize,
        shutdown,
        subscribe,
        getCorrelatedTrace,
        getStatus,
        EVENTS: AGGREGATED_EVENTS
    });
})();

export default CoachObservabilityAggregator;
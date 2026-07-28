/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Pipeline Analytics Hooks)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 52A.3
 * 
 * Description  : Non-invasive telemetry hook engine. Measures granular 
 *                execution latencies across individual intelligence pipeline 
 *                stages and emits standardized analytics event streams.
 * -----------------------------------------------------------------
 */

/**
 * Analytics Hooks Schema Version.
 * @type {string}
 */
const ANALYTICS_SCHEMA_VERSION = '1.0.0';

/**
 * Analytics Event Types emitted by telemetry hooks.
 * @readonly
 */
const ANALYTICS_EVENTS = Object.freeze({
    PIPELINE_METRIC_RECORDED: 'COACH_PIPELINE_METRIC_RECORDED'
});

/**
 * Coach Pipeline Analytics Hooks Singleton Service.
 * Measures stage-by-stage latencies and dispatches observability metrics.
 */
const CoachAnalyticsHooks = (() => {

    /** @type {Set<Function>} */
    const analyticsListeners = new Set();

    /**
     * Dispatches recorded metric packets to all registered analytics subscribers.
     * @param {Object} metricPacket - Immutable metric data packet.
     * @private
     */
    function emitMetric(metricPacket) {
        for (const callback of analyticsListeners) {
            try {
                callback(metricPacket);
            } catch (err) {
                console.error('[CoachAnalyticsHooks] Error in analytics listener callback:', err);
            }
        }
    }

    /**
     * Public API: Subscribes to telemetry analytics event emissions.
     * 
     * @param {Function} callback - Execution handler receiving telemetry packets.
     * @returns {Function} Unsubscribe cleanup handler.
     */
    function subscribe(callback) {
        if (typeof callback === 'function') {
            analyticsListeners.add(callback);
        }
        return () => {
            if (typeof callback === 'function') {
                analyticsListeners.delete(callback);
            }
        };
    }

    /**
     * Measures execution duration of a given synchronous task and records stage telemetry.
     * 
     * @param {string} stageName - Name of the pipeline stage (e.g., 'intent', 'context', 'strategy', 'response').
     * @param {Function} taskFn - The execution function for the stage.
     * @param {Object} [traceContext] - Optional trace correlation context.
     * @returns {*} Result returned by the task function.
     */
    function measureStage(stageName, taskFn, traceContext = null) {
        if (typeof taskFn !== 'function') {
            throw new Error('[CoachAnalyticsHooks] Task function is required for stage measurement.');
        }

        const safeStage = typeof stageName === 'string' && stageName.trim() ? stageName.trim() : 'unknown-stage';
        const startTime = performance.now ? performance.now() : Date.now();
        let result;
        let success = true;
        let errorObj = null;

        try {
            result = taskFn();
        } catch (err) {
            success = false;
            errorObj = err;
            throw err;
        } finally {
            const endTime = performance.now ? performance.now() : Date.now();
            const durationMs = Number((endTime - startTime).toFixed(3));

            const safeTrace = traceContext && typeof traceContext === 'object' ? traceContext : {};

            const metricPacket = Object.freeze({
                type: ANALYTICS_EVENTS.PIPELINE_METRIC_RECORDED,
                payload: Object.freeze({
                    stage: safeStage,
                    durationMs,
                    success,
                    error: errorObj ? errorObj.message : null,
                    traceId: safeTrace.traceId || null,
                    requestId: safeTrace.requestId || null,
                    coachId: safeTrace.coachId || null,
                    timestamp: new Date().toISOString()
                })
            });

            emitMetric(metricPacket);
        }

        return result;
    }

    /**
     * Returns operational status and metadata of the analytics hooks service.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: ANALYTICS_SCHEMA_VERSION,
            activeListeners: analyticsListeners.size,
            provider: 'coach-analytics-hooks'
        });
    }

    return Object.freeze({
        measureStage,
        subscribe,
        getStatus,
        EVENTS: ANALYTICS_EVENTS
    });
})();

export default CoachAnalyticsHooks;
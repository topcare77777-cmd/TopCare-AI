/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (Coach Decision Audit Trail)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 52A.4
 * 
 * Description  : Decision transparency and audit trail engine.
 *                Records deterministic execution reasoning (intent, confidence, 
 *                selected strategy, template, active persona) correlated with 
 *                trace contexts, strictly avoiding storage of private message content.
 * -----------------------------------------------------------------
 */

/**
 * Decision Audit Schema Version.
 * @type {string}
 */
const AUDIT_SCHEMA_VERSION = '1.0.0';

/**
 * Audit Event Types emitted by decision hooks.
 * @readonly
 */
const AUDIT_EVENTS = Object.freeze({
    DECISION_RECORDED: 'COACH_DECISION_RECORDED'
});

/**
 * Coach Decision Audit Trail Singleton Service.
 * Captures transparent execution reasoning packets for observability and debugging.
 */
const CoachDecisionAudit = (() => {

    /** @type {Set<Function>} */
    const auditListeners = new Set();

    /**
     * Dispatches recorded decision audit packets to all registered subscribers.
     * @param {Object} auditPacket - Immutable audit data packet.
     * @private
     */
    function emitAudit(auditPacket) {
        for (const callback of auditListeners) {
            try {
                callback(auditPacket);
            } catch (err) {
                console.error('[CoachDecisionAudit] Error in audit listener callback:', err);
            }
        }
    }

    /**
     * Public API: Subscribes to decision audit event emissions.
     * 
     * @param {Function} callback - Execution handler receiving audit packets.
     * @returns {Function} Unsubscribe cleanup handler.
     */
    function subscribe(callback) {
        if (typeof callback === 'function') {
            auditListeners.add(callback);
        }
        return () => {
            if (typeof callback === 'function') {
                auditListeners.delete(callback);
            }
        };
    }

    /**
     * Captures and records a structured decision audit trail from execution contracts.
     * Strictly avoids recording raw private message text.
     * 
     * @param {Object} executionBundle - The complete execution bundle (context, strategy, response).
     * @param {Object} [traceContext] - Optional trace correlation context.
     * @returns {Object} Immutable recorded audit packet.
     */
    function record(executionBundle, traceContext = null) {
        const bundle = executionBundle && typeof executionBundle === 'object' ? executionBundle : {};
        const context = bundle.context && typeof bundle.context === 'object' ? bundle.context : {};
        const strategy = bundle.strategy && typeof bundle.strategy === 'object' ? bundle.strategy : {};
        const response = bundle.response && typeof bundle.response === 'object' ? bundle.response : {};
        const trace = traceContext && typeof traceContext === 'object' ? traceContext : (bundle.metadata?.trace || {});

        const intentData = context.intent && typeof context.intent === 'object' ? context.intent : {};
        const communication = strategy.communication && typeof strategy.communication === 'object' ? strategy.communication : {};
        const objective = strategy.objective && typeof strategy.objective === 'object' ? strategy.objective : {};
        const responseMetadata = response.metadata && typeof response.metadata === 'object' ? response.metadata : {};
        const coachProfile = response.coach && typeof response.coach === 'object' ? response.coach : {};

        const auditPacket = Object.freeze({
            type: AUDIT_EVENTS.DECISION_RECORDED,
            payload: Object.freeze({
                traceId: trace.traceId || null,
                requestId: trace.requestId || null,
                coachId: coachProfile.id || trace.coachId || 'unknown-coach',
                persona: coachProfile.persona || 'unknown-persona',
                decision: Object.freeze({
                    intent: intentData.id || 'unknown',
                    confidence: typeof intentData.confidence === 'number' ? intentData.confidence : 0.0,
                    entitiesDetected: Array.isArray(intentData.entities) ? intentData.entities.length : 0,
                    primaryObjective: objective.primary || 'unknown',
                    secondaryObjective: objective.secondary || null,
                    communicationStyle: communication.style || 'neutral',
                    communicationTone: communication.tone || 'neutral',
                    verbosity: communication.verbosity || 'normal',
                    selectedTemplate: responseMetadata.template || 'unknown',
                    deterministic: responseMetadata.deterministic !== false
                }),
                timestamp: new Date().toISOString()
            })
        });

        emitAudit(auditPacket);
        return auditPacket;
    }

    /**
     * Returns operational status and metadata of the decision audit service.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: AUDIT_SCHEMA_VERSION,
            activeListeners: auditListeners.size,
            provider: 'coach-decision-audit'
        });
    }

    return Object.freeze({
        record,
        subscribe,
        getStatus,
        EVENTS: AUDIT_EVENTS
    });
})();

export default CoachDecisionAudit;
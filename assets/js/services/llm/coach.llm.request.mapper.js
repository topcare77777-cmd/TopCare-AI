/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (LLM Request Mapper)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 53A.3
 * 
 * Description  : Request translation engine. Transforms internal Coach Runtime 
 *                execution bundles and context into standardized LLMAdapterContract 
 *                request payloads without coupling to external API providers.
 * -----------------------------------------------------------------
 */

/**
 * Request Mapper Schema Version.
 * @type {string}
 */
const MAPPER_SCHEMA_VERSION = '1.0.0';

/**
 * Default generation parameters for LLM requests.
 * @readonly
 */
const DEFAULT_PARAMETERS = Object.freeze({
    temperature: 0.7,
    maxTokens: 500,
    topP: 1.0
});

/**
 * Coach LLM Request Mapper Singleton Service.
 * Maps internal runtime contexts into standardized LLM request structures.
 */
const CoachLLMRequestMapper = (() => {

    /**
     * Translates internal execution bundles and contexts into a standardized LLMAdapterContract request payload.
     * 
     * @param {Object} executionContext - Internal runtime execution bundle (context, strategy, response, metadata).
     * @param {Object} [traceContext={}] - Trace correlation metadata (traceId, requestId, coachId, runtimeId, sessionId).
     * @param {Object} [options={}] - Optional request customization parameters (temperature, maxTokens).
     * @returns {Object} Immutable standardized LLM request payload contract.
     */
    function map(executionContext, traceContext = {}, options = {}) {
        const bundle = executionContext && typeof executionContext === 'object' ? executionContext : {};
        const context = bundle.context && typeof bundle.context === 'object' ? bundle.context : {};
        const strategy = bundle.strategy && typeof bundle.strategy === 'object' ? bundle.strategy : {};
        const trace = traceContext && typeof traceContext === 'object' ? traceContext : (bundle.metadata?.trace || {});
        const userOpts = options && typeof options === 'object' ? options : {};

        const intentData = context.intent && typeof context.intent === 'object' ? context.intent : {};
        const communication = strategy.communication && typeof strategy.communication === 'object' ? strategy.communication : {};
        const objective = strategy.objective && typeof strategy.objective === 'object' ? strategy.objective : {};

        // Extract coach profile and session details safely
        const coachId = trace.coachId || context.coachId || 'coach-kael';
        const persona = context.persona || 'standard-guide';

        // Construct standardized role messages for model instruction prompt
        const messages = [
            Object.freeze({
                role: 'system',
                content: `You are TopCare AI Coach. Persona: ${persona}. Tone: ${communication.tone || 'supportive'}. Style: ${communication.style || 'structured'}. Primary Objective: ${objective.primary || 'assist'}.`
            }),
            Object.freeze({
                role: 'user',
                content: context.rawMessage || 'Halo, saya ingin berkonsultasi.'
            })
        ];

        // Compile generation parameters safely
        const parameters = Object.freeze({
            temperature: typeof userOpts.temperature === 'number' ? userOpts.temperature : DEFAULT_PARAMETERS.temperature,
            maxTokens: typeof userOpts.maxTokens === 'number' ? userOpts.maxTokens : DEFAULT_PARAMETERS.maxTokens,
            topP: typeof userOpts.topP === 'number' ? userOpts.topP : DEFAULT_PARAMETERS.topP
        });

        // Compile standardized trace metadata
        const metadata = Object.freeze({
            version: MAPPER_SCHEMA_VERSION,
            traceId: trace.traceId || null,
            requestId: trace.requestId || null,
            coachId,
            runtimeId: trace.runtimeId || null,
            sessionId: trace.sessionId || null
        });

        return Object.freeze({
            messages: Object.freeze(messages),
            context: Object.freeze({
                coachId,
                persona,
                intent: intentData.id || 'unknown',
                objective: objective.primary || 'assist',
                communicationStyle: communication.style || 'neutral'
            }),
            parameters,
            metadata
        });
    }

    /**
     * Returns operational status and metadata of the request mapper service.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: MAPPER_SCHEMA_VERSION,
            provider: 'coach-llm-request-mapper'
        });
    }

    return Object.freeze({
        map,
        getStatus
    });
})();

export default CoachLLMRequestMapper;
/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (LLM Adapter Contract Foundation)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 53A.1
 * 
 * Description  : Pure interface contract for LLM provider adapters.
 *                Defines standardized request and response payloads, error boundaries,
 *                and tracing integration without coupling to any specific LLM provider.
 * -----------------------------------------------------------------
 */

/**
 * LLM Adapter Contract Schema Version.
 * @type {string}
 */
const LLM_CONTRACT_SCHEMA_VERSION = '1.0.0';

/**
 * Standardized LLM Adapter Interface Contract Object.
 * All concrete LLM provider implementations (OpenAI, Gemini, Local) must adhere to this structural signature.
 */
const LLMAdapterContract = Object.freeze({

    /**
     * Unique identifier of the LLM provider adapter.
     * @returns {string} Provider ID (e.g., 'openai-adapter', 'gemini-adapter').
     */
    getId() {
        throw new Error('[LLMAdapterContract] Method "getId" not implemented.');
    },

    /**
     * Returns human-readable name and version of the adapter.
     * @returns {Object} Immutable metadata profile.
     */
    getMetadata() {
        throw new Error('[LLMAdapterContract] Method "getMetadata" not implemented.');
    },

    /**
     * Initializes the adapter (e.g., connection setup, client validation).
     * 
     * @param {Object} [config={}] - Initialization configuration parameters.
     * @returns {Promise<boolean>} Resolves to true if initialization succeeded.
     */
    async initialize(config = {}) {
        throw new Error('[LLMAdapterContract] Method "initialize" not implemented.');
    },

    /**
     * Executes a single text completion request against the LLM provider.
     * 
     * @param {Object} request - Standardized completion request payload.
     * @param {Array<Object>} request.messages - Conversation history / prompt messages.
     * @param {Object} request.context - Context metadata (coachId, persona, objective).
     * @param {Object} [request.parameters] - Generation parameters (temperature, maxTokens).
     * @param {Object} [request.metadata] - Tracing metadata (traceId, requestId, coachId, runtimeId).
     * @returns {Promise<Object>} Standardized response bundle or error envelope.
     */
    async complete(request) {
        throw new Error('[LLMAdapterContract] Method "complete" not implemented.');
    },

    /**
     * Executes a streaming text completion request against the LLM provider.
     * 
     * @param {Object} request - Standardized completion request payload.
     * @param {Function} onChunk - Callback executed upon receiving each stream chunk.
     * @returns {Promise<Object>} Standardized final completion response bundle.
     */
    async stream(request, onChunk) {
        throw new Error('[LLMAdapterContract] Method "stream" not implemented.');
    },

    /**
     * Shuts down and cleans up adapter resources.
     * 
     * @returns {Promise<boolean>} Resolves to true if successfully shut down.
     */
    async shutdown() {
        throw new Error('[LLMAdapterContract] Method "shutdown" not implemented.');
    },

    /**
     * Returns operational status of the adapter instance.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    getStatus() {
        throw new Error('[LLMAdapterContract] Method "getStatus" not implemented.');
    }
});

/**
 * Helper utility to build a standardized, safe error envelope when an adapter call fails.
 * 
 * @param {string} code - Error code identifier (e.g., 'PROVIDER_UNAVAILABLE', 'TIMEOUT', 'MALFORMED_RESPONSE').
 * @param {string} message - Descriptive error message.
 * @param {Object} [traceContext={}] - Tracing metadata for error correlation.
 * @returns {Object} Immutable error envelope contract.
 */
function createErrorEnvelope(code, message, traceContext = {}) {
    return Object.freeze({
        success: false,
        error: Object.freeze({
            code: code || 'UNKNOWN_ERROR',
            message: message || 'An unspecified error occurred in the LLM adapter.',
            timestamp: new Date().toISOString()
        }),
        metadata: Object.freeze({
            version: LLM_CONTRACT_SCHEMA_VERSION,
            traceId: traceContext.traceId || null,
            requestId: traceContext.requestId || null
        })
    });
}

/**
 * Helper utility to build a standardized success response bundle.
 * 
 * @param {Object} data - Completion result data.
 * @param {string} data.text - Generated completion text.
 * @param {Object} [data.usage] - Token usage statistics (inputTokens, outputTokens).
 * @param {Object} [data.provider] - Provider info (id, model).
 * @param {Object} [data.metadata] - Execution metadata (latencyMs, traceId).
 * @returns {Object} Immutable success response bundle contract.
 */
function createSuccessResponse(data) {
    const safeData = data && typeof data === 'object' ? data : {};
    const usage = safeData.usage && typeof safeData.usage === 'object' ? safeData.usage : {};
    const provider = safeData.provider && typeof safeData.provider === 'object' ? safeData.provider : {};
    const metadata = safeData.metadata && typeof safeData.metadata === 'object' ? safeData.metadata : {};

    return Object.freeze({
        success: true,
        text: typeof safeData.text === 'string' ? safeData.text : '',
        usage: Object.freeze({
            inputTokens: typeof usage.inputTokens === 'number' ? usage.inputTokens : 0,
            outputTokens: typeof usage.outputTokens === 'number' ? usage.outputTokens : 0
        }),
        provider: Object.freeze({
            id: provider.id || 'unknown-provider',
            model: provider.model || 'unknown-model'
        }),
        metadata: Object.freeze({
            version: LLM_CONTRACT_SCHEMA_VERSION,
            latencyMs: typeof metadata.latencyMs === 'number' ? metadata.latencyMs : 0,
            traceId: metadata.traceId || null,
            requestId: metadata.requestId || null
        })
    });
}

export {
    LLMAdapterContract,
    createErrorEnvelope,
    createSuccessResponse,
    LLM_CONTRACT_SCHEMA_VERSION
};

export default LLMAdapterContract;s
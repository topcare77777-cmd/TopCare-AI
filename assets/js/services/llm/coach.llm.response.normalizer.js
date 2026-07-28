/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (LLM Response Normalizer)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 53A.4
 * 
 * Description  : Response normalization engine. Translates heterogeneous 
 *                raw provider responses into standardized, immutable response 
 *                bundles or error envelopes compatible with Coach Runtime contracts.
 * -----------------------------------------------------------------
 */

import { createSuccessResponse, createErrorEnvelope } from './llm.adapter.contract.js';

/**
 * Response Normalizer Schema Version.
 * @type {string}
 */
const NORMALIZER_SCHEMA_VERSION = '1.0.0';

/**
 * Coach LLM Response Normalizer Singleton Service.
 * Normalizes raw responses from external LLM adapters into standardized platform contracts.
 */
const CoachLLMResponseNormalizer = (() => {

    /**
     * Normalizes a raw provider response bundle into a standardized platform response contract.
     * 
     * @param {Object} rawProviderResponse - Raw response object returned by an LLM adapter.
     * @param {Object} [traceContext={}] - Trace correlation metadata (traceId, requestId, coachId, runtimeId).
     * @returns {Object} Immutable standardized success response bundle or error envelope.
     */
    function normalize(rawProviderResponse, traceContext = {}) {
        const trace = traceContext && typeof traceContext === 'object' ? traceContext : {};
        const response = rawProviderResponse && typeof rawProviderResponse === 'object' ? rawProviderResponse : {};

        // 1. Handle explicit adapter error envelopes
        if (response.success === false) {
            const errorInfo = response.error || {};
            return createErrorEnvelope(
                errorInfo.code || 'PROVIDER_EXECUTION_FAILED',
                errorInfo.message || 'The LLM provider returned an unsuccessful execution state.',
                trace
            );
        }

        // 2. Extract and sanitize text content across various provider payload shapes
        let generatedText = '';
        if (typeof response.text === 'string') {
            generatedText = response.text;
        } else if (typeof response.content === 'string') {
            generatedText = response.content;
        } else if (response.choices && Array.isArray(response.choices) && response.choices.length > 0) {
            // Common OpenAI shape fallback
            const firstChoice = response.choices[0];
            if (typeof firstChoice.text === 'string') {
                generatedText = firstChoice.text;
            } else if (firstChoice.message && typeof firstChoice.message.content === 'string') {
                generatedText = firstChoice.message.content;
            }
        }

        // 3. Extract usage and token metrics safely
        const rawUsage = response.usage && typeof response.usage === 'object' ? response.usage : {};
        const inputTokens = typeof rawUsage.inputTokens === 'number' ? rawUsage.inputTokens : (rawUsage.prompt_tokens || 0);
        const outputTokens = typeof rawUsage.outputTokens === 'number' ? rawUsage.outputTokens : (rawUsage.completion_tokens || 0);

        // 4. Extract provider identification metadata
        const rawProvider = response.provider && typeof response.provider === 'object' ? response.provider : {};
        const providerId = rawProvider.id || response.providerId || 'unknown-provider';
        const modelName = rawProvider.model || response.model || 'unknown-model';

        // 5. Extract execution metrics and tracing metadata
        const rawMeta = response.metadata && typeof response.metadata === 'object' ? response.metadata : {};
        const latencyMs = typeof rawMeta.latencyMs === 'number' ? rawMeta.latencyMs : 0;
        const traceId = rawMeta.traceId || trace.traceId || null;
        const requestId = rawMeta.requestId || trace.requestId || null;

        // Guard: If text is missing or invalid after normalization, return a malformed error envelope
        if (typeof generatedText !== 'string' || !generatedText.trim()) {
            return createErrorEnvelope(
                'MALFORMED_PROVIDER_RESPONSE',
                'The LLM provider returned a response devoid of valid text content.',
                { traceId, requestId }
            );
        }

        // 6. Compile into official standardized success response bundle
        return createSuccessResponse({
            text: generatedText.trim(),
            usage: {
                inputTokens,
                outputTokens
            },
            provider: {
                id: providerId,
                model: modelName
            },
            metadata: {
                version: NORMALIZER_SCHEMA_VERSION,
                latencyMs,
                traceId,
                requestId
            }
        });
    }

    /**
     * Returns operational status and metadata of the response normalizer service.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: NORMALIZER_SCHEMA_VERSION,
            provider: 'coach-llm-response-normalizer'
        });
    }

    return Object.freeze({
        normalize,
        getStatus
    });
})();

export default CoachLLMResponseNormalizer;
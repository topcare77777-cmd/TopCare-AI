/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service (LLM Execution Gateway)
 * Status       : ACTIVE
 * Version      : 1.0.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Intelligence Team
 * Created      : Sprint 53A.5
 * 
 * Description  : Centralized LLM execution gateway. Orchestrates request 
 *                mapping, provider lookup via registry, adapter execution, 
 *                response normalization, and telemetry logging.
 * -----------------------------------------------------------------
 */

import CoachLLMProviderRegistry from './coach.llm.provider.registry.js';
import CoachLLMRequestMapper from './coach.llm.request.mapper.js';
import CoachLLMResponseNormalizer from './coach.llm.response.normalizer.js';
import { createErrorEnvelope } from './llm.adapter.contract.js';

/**
 * Execution Gateway Schema Version.
 * @type {string}
 */
const GATEWAY_SCHEMA_VERSION = '1.0.0';

/**
 * Coach LLM Execution Gateway Singleton Service.
 * Coordinates the end-to-end execution lifecycle of LLM requests across registered providers.
 */
const CoachLLMExecutionGateway = (() => {

    /**
     * Executes an end-to-end LLM completion request.
     * 
     * @param {Object} executionContext - Runtime execution bundle (context, strategy, response).
     * @param {Object} [traceContext={}] - Trace correlation metadata (traceId, requestId, coachId, runtimeId, sessionId).
     * @param {Object} [options={}] - Execution options including providerId selection and generation parameters.
     * @returns {Promise<Object>} Standardized immutable response bundle or error envelope.
     */
    async function execute(executionContext, traceContext = {}, options = {}) {
        const opts = options && typeof options === 'object' ? options : {};
        const trace = traceContext && typeof traceContext === 'object' ? traceContext : {};
        const startTime = Date.now();

        try {
            // 1. Resolve target provider from Registry (falls back to default/first available or fails gracefully)
            let providerId = opts.providerId;
            if (!providerId || !CoachLLMProviderRegistry.exists(providerId)) {
                // Try listing available providers to pick the first active one
                const available = CoachLLMProviderRegistry.list();
                if (available.length > 0) {
                    providerId = available[0].providerId;
                } else {
                    return createErrorEnvelope(
                        'NO_LLM_PROVIDER_AVAILABLE',
                        'No registered LLM provider adapters are currently available in the registry.',
                        trace
                    );
                }
            }

            const adapter = CoachLLMProviderRegistry.get(providerId);
            if (!adapter) {
                return createErrorEnvelope(
                    'PROVIDER_NOT_FOUND',
                    `Specified LLM provider adapter "${providerId}" could not be retrieved from the registry.`,
                    trace
                );
            }

            // 2. Map internal execution bundle into standardized LLM adapter request payload
            const mappedRequest = CoachLLMRequestMapper.map(executionContext, trace, opts.parameters || {});

            // 3. Execute completion call against the concrete provider adapter with error boundaries
            let rawResponse;
            try {
                rawResponse = await adapter.complete(mappedRequest);
            } catch (adapterErr) {
                const latencyMs = Date.now() - startTime;
                return createErrorEnvelope(
                    'ADAPTER_EXECUTION_EXCEPTION',
                    adapterErr.message || 'An unhandled exception occurred during adapter execution.',
                    { ...trace, latencyMs }
                );
            }

            const latencyMs = Date.now() - startTime;

            // Ensure latency metadata is attached to raw response before normalization if possible
            const responseWithLatency = rawResponse && typeof rawResponse === 'object' ? {
                ...rawResponse,
                metadata: {
                    ...(rawResponse.metadata || {}),
                    latencyMs,
                    traceId: trace.traceId || rawResponse.metadata?.traceId,
                    requestId: trace.requestId || rawResponse.metadata?.requestId
                }
            } : rawResponse;

            // 4. Normalize heterogeneous provider response into platform standard contract
            const normalizedResult = CoachLLMResponseNormalizer.normalize(responseWithLatency, trace);

            return normalizedResult;

        } catch (error) {
            const latencyMs = Date.now() - startTime;
            console.error('[CoachLLMExecutionGateway] Uncaught gateway execution error:', error);
            return createErrorEnvelope(
                'GATEWAY_UNHANDLED_EXCEPTION',
                error.message || 'An unexpected error occurred within the LLM Execution Gateway.',
                { ...trace, latencyMs }
            );
        }
    }

    /**
     * Returns operational status and metadata of the execution gateway service.
     * 
     * @returns {Object} Immutable status snapshot.
     */
    function getStatus() {
        return Object.freeze({
            version: GATEWAY_SCHEMA_VERSION,
            provider: 'coach-llm-execution-gateway',
            registryStatus: CoachLLMProviderRegistry.getStatus()
        });
    }

    return Object.freeze({
        execute,
        getStatus
    });
})();

export default CoachLLMExecutionGateway;
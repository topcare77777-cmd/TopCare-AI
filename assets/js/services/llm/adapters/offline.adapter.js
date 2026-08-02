/**
 * TOPCARE AI PLATFORM V2 — FIRST-CLASS OFFLINE PROVIDER ADAPTER
 * Path: assets/js/services/llm/adapters/offline.adapter.js
 * Role: Standalone Client-Side Rule Engine Adapter (0 Import to Coach Layer)
 */

import { deepFreezeDTO } from '../../../core/utils/dto.js';

/**
 * Internal Standalone Offline Rule Engine (Isolated within LLM Domain)
 */
const OfflineRuleEngine = (() => {
    const TEMPLATES = Object.freeze({
        greeting: "Halo {displayName}. Senang bisa mendampingi sesi bimbingan Anda hari ini.",
        coaching: "Mari kita fokus membahas pengembangan diri Anda secara terstruktur sesuai potensi kepribadian Anda.",
        unknown: "Saya siap membantu memandu tujuan dan fokus pengembangan diri Anda hari ini."
    });

    function evaluate(promptDTO) {
        const text = promptDTO?.user?.toLowerCase() || '';
        let body = TEMPLATES.unknown;
        if (text.includes('halo') || text.includes('hai')) body = TEMPLATES.greeting;
        else if (text.includes('karir') || text.includes('tujuan')) body = TEMPLATES.coaching;

        return body.replace('{displayName}', 'Tamu');
    }

    return { evaluate };
})();

export const OfflineAdapter = (() => {
    const PROVIDER_ID = 'offline';

    function getId() { return PROVIDER_ID; }

    function getMetadata() {
        return deepFreezeDTO({
            name: 'TopCare AI Offline Rule Engine',
            version: '2.0.0',
            priority: 999, // Lowest priority baseline
            capabilities: { streaming: false, offline: true }
        });
    }

    function initialize() { return Promise.resolve(true); }

    async function complete(requestDTO) {
        const startTime = Date.now();
        const promptDTO = requestDTO.promptDTO || {};

        // Evaluates offline using internal standalone engine
        const textOutput = OfflineRuleEngine.evaluate(promptDTO);

        return deepFreezeDTO({
            content: {
                text: textOutput,
                finishReason: 'STOP'
            },
            telemetry: {
                providerId: PROVIDER_ID,
                model: 'standalone-offline-engine-v2',
                latencyMs: Date.now() - startTime,
                usage: { promptTokens: 0, completionTokens: 0, totalTokens: 0 }
            },
            metadata: {
                isOfflineEngine: true,
                isFallback: true
            }
        });
    }

    async function stream(requestDTO, onChunk) {
        const responseDTO = await complete(requestDTO);
        if (typeof onChunk === 'function') {
            onChunk({ text: responseDTO.content.text, isFinal: true });
        }
        return responseDTO;
    }

    function shutdown() { return Promise.resolve(true); }

    function getStatus() {
        return deepFreezeDTO({ status: 'READY', active: true });
    }

    return Object.freeze({
        getId,
        getMetadata,
        initialize,
        complete,
        stream,
        shutdown,
        getStatus
    });
})();

export default OfflineAdapter;

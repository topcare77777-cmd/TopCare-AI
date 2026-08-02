/**
 * TOPCARE AI PLATFORM V2 — PROMPT BUILDER ENGINE
 * Path: assets/js/services/llm/prompt.builder.js
 * Role: Compiles ConversationDTO into Structured Vendor-Agnostic PromptDTO
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const PromptBuilder = (() => {

    /**
     * Compiles ConversationDTO into Vendor-Agnostic PromptDTO.
     * @param {Object} conversationDTO
     * @returns {Object} Immutable PromptDTO.
     */
    function build(conversationDTO) {
        if (!conversationDTO || typeof conversationDTO !== 'object') {
            throw new Error('[PromptBuilder] Invalid ConversationDTO provided.');
        }

        const { identity, personality, instruction, reasoning, conversation } = conversationDTO;

        const system = `Anda adalah AI Coach profesional berorientasi kepribadian manusia (${instruction?.persona || 'standard-guide'}). Aturan: Berikan bimbingan terstruktur, empatik, dan bebas diagnosa medis.`;
        const persona = `Gaya Komunikasi: Nada = ${instruction?.tone || 'neutral'}, Gaya = ${instruction?.style || 'structured'}, Verbosity = ${instruction?.verbosity || 'normal'}. Profile User: Nama = ${identity?.displayName || 'Tamu'}, Kepribadian = ${personality?.type || 'Umum'}.`;
        const context = `Konteks Percakapan: Intent = ${reasoning?.intentId || 'unknown'}, Topik Terakhir = ${conversation?.lastTopic || 'N/A'}.`;
        const user = conversation?.userMessage || '';
        const history = (conversation?.history || []).map(turn => ({
            role: turn.role === 'user' ? 'user' : 'model',
            text: turn.text || turn.topic || ''
        }));

        return deepFreezeDTO({
            system,
            persona,
            context,
            user,
            history
        });
    }

    return Object.freeze({
        build
    });
})();

export default PromptBuilder;

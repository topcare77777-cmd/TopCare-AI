/**
 * TOPCARE AI PLATFORM V2 — RESPONSE MODEL DTO
 * Path: assets/js/core/conversation/response.model.dto.js
 * Status: ACTIVE (BUILD 123.1 - REVISION 2)
 * Role: Factory and Immutable DTO Contract for Conversation Response Models
 */

import { deepFreezeDTO } from '../utils/dto.js';

export function createResponseModelDTO({
    conversationId = `conv_${Date.now()}`,
    rawContent = '',
    uiWidgetHint = 'standard-card',
    metadata = {},
    timestamp = Date.now()
} = {}) {
    const dto = {
        conversationId: String(conversationId),
        rawContent: String(rawContent),
        uiWidgetHint: String(uiWidgetHint),
        metadata: typeof metadata === 'object' && metadata !== null ? { ...metadata } : {},
        timestamp: Number(timestamp) || Date.now()
    };

    return deepFreezeDTO(dto);
}

export default createResponseModelDTO;
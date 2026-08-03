/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION INTENT DTO
 * Path: assets/js/runtime/navigation.intent.dto.js
 * Version: 124.1.0 (BUILD 124.1)
 * Status: APPROVED & LOCKED
 * SRP: Immutable DTO Factory for Navigation Continuation Intent State
 */

import { deepFreezeDTO } from '../core/utils/dto.js';

/**
 * Creates an immutable NavigationIntentDTO object.
 * @param {Object} params
 * @param {string} params.route - Target destination path (e.g. '/workspace')
 * @param {string|null} [params.coachId=null] - Selected coach identifier (e.g. 'maya', 'alex')
 * @param {string} [params.action='navigate'] - Intended user action (e.g. 'chat', 'navigate')
 * @param {Object} [params.metadata={}] - Additional extensibility metadata
 * @param {number} [params.timestamp=Date.now()] - Timestamp when intent was captured
 * @returns {Object} Immutable NavigationIntentDTO
 */
export function createNavigationIntentDTO({
    route = '/workspace',
    coachId = null,
    action = 'navigate',
    metadata = {},
    timestamp = Date.now()
} = {}) {
    const dto = {
        route: String(route || '/workspace'),
        coachId: coachId ? String(coachId) : null,
        action: String(action || 'navigate'),
        metadata: typeof metadata === 'object' && metadata !== null ? { ...metadata } : {},
        timestamp: Number(timestamp) || Date.now()
    };

    return deepFreezeDTO(dto);
}

export default createNavigationIntentDTO;
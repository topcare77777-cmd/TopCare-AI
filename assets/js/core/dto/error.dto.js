/**
 * TOPCARE AI PLATFORM V2 — ERROR CLASSIFICATION DTO FACTORY
 * Path: assets/js/core/dto/error.dto.js
 * Status: ACTIVE (BUILD AC-017R1 - LOCKED GOLDEN BASELINE)
 * Role: Creates Standardized Deterministic Error DTOs
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const ERROR_CATEGORIES = Object.freeze({
    NETWORK: 'NETWORK',
    PROVIDER: 'PROVIDER',
    VALIDATION: 'VALIDATION',
    TIMEOUT: 'TIMEOUT',
    ABORTED: 'ABORTED',
    OFFLINE: 'OFFLINE',
    INTERNAL: 'INTERNAL'
});

/**
 * Creates a standardized immutable & deterministic Error DTO.
 * @param {Object} params
 * @returns {Object} Deep-frozen ErrorDTO.
 */
export function createErrorDTO({ category, code, message, details = {} }) {
    const validCategory = ERROR_CATEGORIES[category] || ERROR_CATEGORIES.INTERNAL;

    return deepFreezeDTO({
        error: {
            category: validCategory,
            code: code || 'UNKNOWN_ERROR',
            message: message || 'Terjadi kesalahan sistem.',
            details: { ...details }
        }
    });
}

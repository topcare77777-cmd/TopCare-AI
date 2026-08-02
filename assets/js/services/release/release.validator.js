/**
 * TOPCARE AI PLATFORM V2 — RELEASE CANDIDATE VALIDATOR
 * Path: assets/js/services/release/release.validator.js
 * Status: ACTIVE (BUILD AC-030 - LOCKED GOLDEN BASELINE)
 * Role: Read-Only Verification Gate for Release Bundle Completeness & Integrity
 */

import { HEALTH_STATUS } from '../../core/diagnostics/diagnostics.catalog.js';
import { COMPATIBILITY_LEVELS } from '../../core/schema/schema.catalog.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const ReleaseCandidateValidator = Object.freeze({
    /**
     * Validates snapshot bundle completeness and health thresholds.
     * Read-Only: 0 Runtime execution.
     */
    validateCandidateBundle(bundle = {}) {
        const violations = [];

        // 1. Bundle Completeness Check (Constitution 61)
        if (!bundle.architectureSnapshot) violations.push('Missing Architecture Snapshot.');
        if (!bundle.configSnapshot) violations.push('Missing Configuration Snapshot.');
        if (!bundle.metricsSnapshot) violations.push('Missing Metrics Snapshot.');
        if (!bundle.compatibilityMatrix) violations.push('Missing Compatibility Matrix.');
        if (!bundle.diagnosticsReport) violations.push('Missing Diagnostics Report.');

        // 2. Health Threshold Validation
        if (bundle.diagnosticsReport) {
            const overall = bundle.diagnosticsReport.overallStatus;
            if (overall === HEALTH_STATUS.CRITICAL || overall === HEALTH_STATUS.DEGRADED) {
                violations.push(`Diagnostics reported unacceptable overall health status: ${overall}`);
            }
        }

        // 3. Compatibility Threshold Validation
        if (bundle.compatibilityMatrix) {
            const status = bundle.compatibilityMatrix.status;
            if (status === COMPATIBILITY_LEVELS.INCOMPATIBLE) {
                violations.push('Compatibility Matrix reported incompatible DTO schemas.');
            }
        }

        return deepFreezeDTO({
            isValid: violations.length === 0,
            violations: Object.freeze(violations)
        });
    }
});

export default ReleaseCandidateValidator;

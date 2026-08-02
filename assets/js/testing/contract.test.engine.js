/**
 * TOPCARE AI PLATFORM V2 — CONTRACT VERIFICATION TEST ENGINE
 * Path: assets/js/testing/contract.test.engine.js
 * Status: ACTIVE (SPRINT K - LOCKED GOLDEN BASELINE)
 * Role: Verifies Schema Integrity, Immutability, and Deep Freeze Guarantees Across All DTOs
 */

import { deepFreezeDTO } from '../core/utils/dto.js';

export const ContractTestEngine = Object.freeze({
    /**
     * Verifies that a target DTO instance strictly satisfies schema contracts.
     * @param {Object} dtoInstance
     * @param {string} expectedSchemaType
     * @returns {Object} Test Result Details
     */
    verifyDTOContract(dtoInstance, expectedSchemaType) {
        const violations = [];

        if (!dtoInstance || typeof dtoInstance !== 'object') {
            return { isValid: false, violations: ['DTO instance is null or not an object.'] };
        }

        // 1. Mandatory Identity Attributes Check
        if (!dtoInstance.schemaType || typeof dtoInstance.schemaType !== 'string') {
            violations.push('Missing or non-string "schemaType" attribute.');
        } else if (expectedSchemaType && dtoInstance.schemaType !== expectedSchemaType) {
            violations.push(`SchemaType mismatch: expected "${expectedSchemaType}", got "${dtoInstance.schemaType}".`);
        }

        if (!dtoInstance.schemaVersion || typeof dtoInstance.schemaVersion !== 'string') {
            violations.push('Missing or non-string "schemaVersion" attribute.');
        }

        // 2. Immutability & Deep Freeze Check
        if (!Object.isFrozen(dtoInstance)) {
            violations.push('DTO instance is not frozen at root level.');
        }

        // Recursive Nested Objects Freeze Check
        for (const [key, val] of Object.entries(dtoInstance)) {
            if (val && typeof val === 'object' && !Object.isFrozen(val)) {
                violations.push(`Nested property "${key}" is not frozen.`);
            }
        }

        // 3. Mutation Attempt Test
        try {
            dtoInstance.__illegal_mutation_test__ = true;
            violations.push('DTO allowed property addition (Immutability Violation).');
        } catch (err) {
            // Expected Behavior: Strict Mode Throws TypeError
        }

        return deepFreezeDTO({
            isValid: violations.length === 0,
            schemaType: dtoInstance.schemaType || 'UNKNOWN',
            violations: Object.freeze(violations)
        });
    }
});

export default ContractTestEngine;

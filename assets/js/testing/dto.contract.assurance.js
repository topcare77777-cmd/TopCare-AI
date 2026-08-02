/**
 * TOPCARE AI PLATFORM V2 — DTO CONTRACT ASSURANCE SUITE
 * Path: assets/js/testing/dto.contract.assurance.js
 * Status: ACTIVE (BUILD AC-022 - LOCKED GOLDEN BASELINE)
 * Role: Validates Immutability, Portability, and Schema Compliance of All DTOs
 */

import { deepCloneDTO } from '../core/utils/dto.js';

export const DTOContractAssurance = Object.freeze({
    /**
     * Inspects a DTO instance against strict portability rules.
     * @param {Object} dtoInstance
     * @param {string} dtoName
     * @returns {Object} Assurance Inspection Result
     */
    verifyDTO(dtoInstance, dtoName = 'UnknownDTO') {
        const violations = [];

        if (!dtoInstance || typeof dtoInstance !== 'object') {
            return { dtoName, passed: false, violations: ['DTO instance must be a non-null object.'] };
        }

        // 1. Immutability Check
        if (!Object.isFrozen(dtoInstance)) {
            violations.push('DTO is not deeply frozen (Object.isFrozen failed).');
        }

        // 2. Schema Version Availability
        if (!dtoInstance.schemaVersion && !dtoInstance.version) {
            violations.push('DTO lacks explicit schemaVersion metadata.');
        }

        // 3. Portability Inspection (No Functions, DOM, Promise, Symbol)
        const inspectPortability = (val, path = 'dto') => {
            if (val === null || val === undefined) return;

            const type = typeof val;
            if (type === 'function') violations.push(`Function reference forbidden at path: ${path}`);
            if (type === 'symbol') violations.push(`Symbol reference forbidden at path: ${path}`);

            if (type === 'object') {
                if (val instanceof Promise || typeof val.then === 'function') {
                    violations.push(`Promise reference forbidden at path: ${path}`);
                }
                if (typeof window !== 'undefined' && (val instanceof HTMLElement || val instanceof Node)) {
                    violations.push(`DOM reference forbidden at path: ${path}`);
                }
                if (val instanceof WeakMap || val instanceof WeakSet) {
                    violations.push(`WeakMap/WeakSet reference forbidden at path: ${path}`);
                }

                if (Array.isArray(val)) {
                    val.forEach((item, idx) => inspectPortability(item, `${path}[${idx}]`));
                } else {
                    Object.keys(val).forEach(key => inspectPortability(val[key], `${path}.${key}`));
                }
            }
        };

        inspectPortability(dtoInstance, dtoName);

        // 4. JSON Serialization & Safe Deep Clone
        try {
            const jsonString = JSON.stringify(dtoInstance);
            if (!jsonString) violations.push('JSON serialization produced empty result.');
            const cloned = deepCloneDTO(dtoInstance);
            if (!cloned) violations.push('Safe deep clone returned null.');
        } catch (err) {
            violations.push(`JSON/Clone failure: ${err.message}`);
        }

        return {
            dtoName,
            passed: violations.length === 0,
            violations: Object.freeze(violations)
        };
    }
});

export default DTOContractAssurance;

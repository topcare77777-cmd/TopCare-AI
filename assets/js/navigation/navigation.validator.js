/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION MANIFEST VALIDATOR
 * Path: assets/js/navigation/navigation.validator.js
 * Version: 2.1.0 (BUILD 139.0 ENTERPRISE)
 * Status: APPROVED & LOCKED
 * SRP: Fail-Fast Inspector using NavigationEvaluatorRegistry as SSOT for Typo Guarding
 */

import { NavigationEvaluatorRegistry } from './navigation.evaluator.registry.js';

export const NavigationValidator = (() => {
    function validateSurfacesExist(manifest) {
        if (!manifest || !manifest.surfaces || typeof manifest.surfaces !== 'object') {
            throw new Error('[NavigationValidator] Manifest missing mandatory "surfaces" object.');
        }
    }

    function validateEmptySurface(surfaceName, items) {
        if (!Array.isArray(items) || items.length === 0) {
            console.warn(`[NavigationValidator] Warning: Surface "${surfaceName}" is empty or not defined as an array.`);
        }
    }

    function validateIds(surfaceName, items) {
        const idSet = new Set();
        items.forEach((item, index) => {
            if (!item.id || typeof item.id !== 'string') {
                throw new Error(`[NavigationValidator] Surface "${surfaceName}" item at index ${index} is missing a valid "id".`);
            }
            if (idSet.has(item.id)) {
                throw new Error(`[NavigationValidator] Duplicate ID "${item.id}" detected in surface "${surfaceName}".`);
            }
            idSet.add(item.id);
        });
    }

    function validatePaths(surfaceName, items) {
        const pathSet = new Set();
        items.forEach((item) => {
            if (!item.path || typeof item.path !== 'string') {
                throw new Error(`[NavigationValidator] Item "${item.id}" in surface "${surfaceName}" is missing a valid "path".`);
            }
            if (!item.path.startsWith('/') && !item.path.startsWith('#') && !item.path.startsWith('http')) {
                throw new Error(`[NavigationValidator] Item "${item.id}" in surface "${surfaceName}" has malformed path "${item.path}".`);
            }
            if (pathSet.has(item.path)) {
                throw new Error(`[NavigationValidator] Duplicate Path "${item.path}" detected in surface "${surfaceName}".`);
            }
            pathSet.add(item.path);
        });
    }

    function validateOrder(surfaceName, items) {
        const orderSet = new Set();
        items.forEach((item) => {
            if (typeof item.order !== 'number') {
                throw new Error(`[NavigationValidator] Item "${item.id}" in surface "${surfaceName}" has invalid or missing "order" number.`);
            }
            if (orderSet.has(item.order)) {
                console.warn(`[NavigationValidator] Warning: Duplicate Order "${item.order}" detected in surface "${surfaceName}".`);
            }
            orderSet.add(item.order);
        });
    }

    function validateAccessKeys(surfaceName, item) {
        if (!item.access || typeof item.access !== 'object') {
            throw new Error(`[NavigationValidator] Item "${item.id}" in surface "${surfaceName}" missing mandatory "access" block.`);
        }

        // Strict Typo Guarding: Read valid keys dynamically from Evaluator Registry SSOT
        Object.keys(item.access).forEach((key) => {
            if (!NavigationEvaluatorRegistry.has(key)) {
                throw new Error(`[NavigationValidator] Unknown access rule key "${key}" in item "${item.id}" (Surface: "${surfaceName}"). Unregistered key in NavigationEvaluatorRegistry.`);
            }
        });
    }

    function validateSurface(surfaceName, items) {
        validateEmptySurface(surfaceName, items);
        if (!Array.isArray(items) || items.length === 0) return;

        validateIds(surfaceName, items);
        validatePaths(surfaceName, items);
        validateOrder(surfaceName, items);
        items.forEach(item => validateAccessKeys(surfaceName, item));
    }

    function validate(manifest) {
        validateSurfacesExist(manifest);
        Object.keys(manifest.surfaces).forEach((surfaceName) => {
            validateSurface(surfaceName, manifest.surfaces[surfaceName]);
        });
        return true;
    }

    return Object.freeze({
        validate,
        validateIds,
        validatePaths,
        validateOrder,
        validateAccessKeys,
        validateSurface
    });
})();

export default NavigationValidator;

/**
 * TOPCARE AI PLATFORM V2 — STATELESS NAVIGATION SERVICE
 * Path: assets/js/navigation/navigation.service.js
 * Version: 2.1.0 (BUILD 139.0 ENTERPRISE)
 * Status: APPROVED & LOCKED
 * SRP: Pure & Stateless DTO Transformer with Full Dependency Injection
 */

import { NavigationEvaluatorRegistry } from './navigation.evaluator.registry.js';
import { createNavigationItemDTO } from './navigation.dto.js';
import { deepFreeze } from '../utils/freeze.util.js';

export const NavigationService = (() => {
    /**
     * Normalisasi & Deep Freeze NavigationUserSnapshot contract.
     */
    function createDefaultSnapshot(override = {}) {
        const rawSnapshot = {
            authenticated: Boolean(override.authenticated),
            userId: override.userId || null,
            username: override.username || 'GUEST',
            roles: Array.isArray(override.roles) ? [...override.roles] : [],
            permissions: Array.isArray(override.permissions) ? [...override.permissions] : [],
            featureFlags: Array.isArray(override.featureFlags) ? [...override.featureFlags] : [],
            tenantId: override.tenantId || null,
            subscription: override.subscription || 'FREE'
        };

        return deepFreeze(rawSnapshot);
    }

    /**
     * Dynamic Evaluator Loop driven strictly by NavigationEvaluatorRegistry SSOT.
     */
    function evaluateAccess(accessRules, userSnapshot) {
        if (!accessRules || typeof accessRules !== 'object') return true;

        for (const [key, ruleValue] of Object.entries(accessRules)) {
            const evaluator = NavigationEvaluatorRegistry.get(key);
            if (!evaluator) continue; // Key disaring jika belum terdaftar di registry

            const passed = evaluator(ruleValue, userSnapshot);
            if (!passed) return false;
        }

        return true;
    }

    /**
     * Mengambil daftar DTO ter-filter untuk surface tertentu via Full Dependency Injection.
     * @param {string} surfaceName - Nama surface ('navbar', 'workspace_sidebar', dll)
     * @param {Object} rawSnapshot - User Snapshot object
     * @param {Object} manifest - Mandatory Manifest Dependency
     * @param {string} currentPath - Current route path
     * @returns {Array<Object>} List of NavigationItemDTO (Deep Frozen)
     */
    function getSurface(surfaceName, rawSnapshot = {}, manifest = null, currentPath = '') {
        if (!manifest || !manifest.surfaces) {
            console.warn(`[NavigationService] Cannot process surface "${surfaceName}": Manifest dependency missing.`);
            return deepFreeze([]);
        }

        const surfaceItems = manifest.surfaces[surfaceName];
        if (!surfaceItems || !Array.isArray(surfaceItems)) {
            console.warn(`[NavigationService] Surface "${surfaceName}" not found in provided manifest.`);
            return deepFreeze([]);
        }

        const snapshot = createDefaultSnapshot(rawSnapshot);

        // Safe Non-Mutative Copy Array before sort & filter
        const dtos = [...surfaceItems]
            .filter(item => evaluateAccess(item.access, snapshot))
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map(item => createNavigationItemDTO(item, currentPath, true));

        return deepFreeze(dtos);
    }

    return Object.freeze({
        getSurface,
        createDefaultSnapshot
    });
})();

export default NavigationService;

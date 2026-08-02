/**
 * TOPCARE AI PLATFORM V2 — NAVIGATION EVALUATOR REGISTRY (SSOT)
 * Path: assets/js/navigation/navigation.evaluator.registry.js
 * Version: 2.1.0 (BUILD 139.0 ENTERPRISE)
 * Status: APPROVED & LOCKED
 * SRP: Centralized SSOT Evaluator Registry shared seamlessly between Service and Validator
 */

class NavigationEvaluatorRegistryEngine {
    constructor() {
        this._evaluators = new Map();
        this._registerDefaultEvaluators();
        Object.seal(this);
    }

    _registerDefaultEvaluators() {
        this.register('guestOnly', (ruleValue, snapshot) => {
            if (ruleValue && snapshot.authenticated) return false;
            return true;
        });

        this.register('authenticated', (ruleValue, snapshot) => {
            if (ruleValue && !snapshot.authenticated) return false;
            return true;
        });

        this.register('permissions', (requiredPermissions, snapshot) => {
            if (!Array.isArray(requiredPermissions) || requiredPermissions.length === 0) return true;
            if (snapshot.permissions.includes('*')) return true;
            return requiredPermissions.some(p => snapshot.permissions.includes(p));
        });

        this.register('roles', (requiredRoles, snapshot) => {
            if (!Array.isArray(requiredRoles) || requiredRoles.length === 0) return true;
            if (snapshot.roles.includes('SUPER_ADMIN')) return true;
            return requiredRoles.some(r => snapshot.roles.includes(r));
        });

        this.register('subscriptions', (requiredSubs, snapshot) => {
            if (!Array.isArray(requiredSubs) || requiredSubs.length === 0) return true;
            return requiredSubs.includes(snapshot.subscription);
        });

        this.register('tenants', (requiredTenants, snapshot) => {
            if (!Array.isArray(requiredTenants) || requiredTenants.length === 0) return true;
            return requiredTenants.includes(snapshot.tenantId);
        });
    }

    register(name, evaluatorFn) {
        if (typeof name !== 'string' || typeof evaluatorFn !== 'function') {
            throw new Error('[NavigationEvaluatorRegistry] Invalid evaluator registration.');
        }
        this._evaluators.set(name, evaluatorFn);
    }

    get(name) {
        return this._evaluators.get(name);
    }

    has(name) {
        return this._evaluators.has(name);
    }

    getRegisteredKeys() {
        return Array.from(this._evaluators.keys());
    }
}

export const NavigationEvaluatorRegistry = new NavigationEvaluatorRegistryEngine();
export default NavigationEvaluatorRegistry;

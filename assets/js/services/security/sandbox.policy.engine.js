/**
 * TOPCARE AI PLATFORM V2 — SANDBOX POLICY ENGINE
 * Path: assets/js/services/security/sandbox.policy.engine.js
 * Status: ACTIVE (SPRINT J - LOCKED GOLDEN BASELINE)
 * Role: Manages Declarative Sandbox Rules for UI Widgets and Third-Party Extensions
 */

import { createSandboxPolicyDTO, SECURITY_EVENTS } from '../../core/security/security.dto.js';

export const SandboxPolicyEngine = Object.freeze({
    /**
     * Produces SandboxPolicyDTO based on requested permissions and environment rules.
     */
    evaluateSandboxPolicy(permissionsScope = [], eventBus = null) {
        const allowStorage = permissionsScope.includes('context.memory.history.read');
        const allowSameOrigin = false; // Strictly isolate third-party widget origin

        const policyDTO = createSandboxPolicyDTO({
            allowScripts: true,
            allowForms: true,
            allowSameOrigin,
            allowDownloads: false,
            allowPopups: false,
            allowStorage
        });

        if (eventBus && typeof eventBus.publish === 'function') {
            eventBus.publish({
                type: SECURITY_EVENTS.CSP_APPLIED,
                payload: { sandboxAttribute: policyDTO.sandboxAttributeValue }
            });
        }

        return policyDTO;
    }
});

export default SandboxPolicyEngine;

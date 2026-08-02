/**
 * TOPCARE AI PLATFORM V2 — SECURITY CATALOG & DTOS SSOT
 * Path: assets/js/core/security/security.catalog.js & security.dto.js
 * Status: ACTIVE (SPRINT J - LOCKED GOLDEN BASELINE)
 */

import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const SECURITY_SCHEMA_VERSION = '2.0.0';

export const SECURITY_PERMISSIONS = deepFreezeDTO({
    // Context Permissions
    CONTEXT_PROFILE_READ: 'context.profile.read',
    CONTEXT_PERSONALITY_READ: 'context.personality.read',
    CONTEXT_MEMORY_SUMMARY_READ: 'context.memory.summary.read',
    CONTEXT_MEMORY_HISTORY_READ: 'context.memory.history.read',

    // Conversation & Execution
    CONVERSATION_CURRENT_READ: 'conversation.current.read',
    CONVERSATION_HISTORY_READ: 'conversation.history.read',
    CAPABILITY_EXECUTE: 'capability.execute',

    // Extension & Workspace
    PLUGIN_INVOKE: 'plugin.invoke',
    TOOL_INVOKE: 'tool.invoke',
    WORKSPACE_SIDEBAR_RENDER: 'workspace.sidebar.render',
    TELEMETRY_METRICS_READ: 'telemetry.metrics.read'
});

export const SECURITY_EVENTS = deepFreezeDTO({
    AUTHORIZED: 'SECURITY.AUTHORIZED',
    PERMISSION_DENIED: 'SECURITY.PERMISSION_DENIED',
    RATE_LIMIT_EXCEEDED: 'SECURITY.RATE_LIMIT_EXCEEDED',
    NONCE_CREATED: 'SECURITY.NONCE_CREATED',
    CSP_APPLIED: 'SECURITY.CSP_APPLIED',
    SANDBOX_DENIED: 'SECURITY.SANDBOX_DENIED'
});

export function createAuthorizationResultDTO({
    subjectId,
    requestedPermission,
    isAuthorized = false,
    reason = 'DENIED_BY_DEFAULT',
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'AuthorizationResultDTO',
        schemaVersion: SECURITY_SCHEMA_VERSION,
        subjectId: String(subjectId),
        requestedPermission: String(requestedPermission),
        isAuthorized: Boolean(isAuthorized),
        reason: String(reason),
        evaluatedAt: timeProvider.iso()
    });
}

export function createNonceDTO({
    nonceValue,
    purpose = 'SCRIPT_EXECUTION',
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'NonceDTO',
        schemaVersion: SECURITY_SCHEMA_VERSION,
        nonceValue: String(nonceValue),
        purpose: String(purpose),
        createdAt: timeProvider.iso()
    });
}

export function createContentSecurityPolicyDTO({
    scriptSrc = ["'self'"],
    styleSrc = ["'self'"],
    objectSrc = ["'none'"],
    frameAncestors = ["'none'"],
    nonce = null
}) {
    const scripts = [...scriptSrc];
    if (nonce) scripts.push(`'nonce-${nonce}'`);

    const headerValue = `default-src 'self'; script-src ${scripts.join(' ')}; style-src ${styleSrc.join(' ')}; object-src ${objectSrc.join(' ')}; frame-ancestors ${frameAncestors.join(' ')};`;

    return deepFreezeDTO({
        schemaType: 'ContentSecurityPolicyDTO',
        schemaVersion: SECURITY_SCHEMA_VERSION,
        headerValue,
        nonce: nonce ? String(nonce) : null,
        directives: deepFreezeDTO({
            scriptSrc: Object.freeze(scripts),
            styleSrc: Object.freeze([...styleSrc]),
            objectSrc: Object.freeze([...objectSrc]),
            frameAncestors: Object.freeze([...frameAncestors])
        })
    });
}

export function createSandboxPolicyDTO({
    allowScripts = true,
    allowForms = true,
    allowSameOrigin = false,
    allowDownloads = false,
    allowPopups = false,
    allowStorage = false
}) {
    return deepFreezeDTO({
        schemaType: 'SandboxPolicyDTO',
        schemaVersion: SECURITY_SCHEMA_VERSION,
        allowScripts: Boolean(allowScripts),
        allowForms: Boolean(allowForms),
        allowSameOrigin: Boolean(allowSameOrigin),
        allowDownloads: Boolean(allowDownloads),
        allowPopups: Boolean(allowPopups),
        allowStorage: Boolean(allowStorage),
        sandboxAttributeValue: [
            allowScripts ? 'allow-scripts' : '',
            allowForms ? 'allow-forms' : '',
            allowSameOrigin ? 'allow-same-origin' : '',
            allowDownloads ? 'allow-downloads' : '',
            allowPopups ? 'allow-popups' : '',
            allowStorage ? 'allow-storage' : ''
        ].filter(Boolean).join(' ')
    });
}

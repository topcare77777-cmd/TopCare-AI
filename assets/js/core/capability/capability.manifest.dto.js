/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY MANIFEST DTO & RESULT DTO FACTORIES
 * Path: assets/js/core/capability/capability.manifest.dto.js
 * Status: ACTIVE (SPRINT A - LOCKED GOLDEN BASELINE)
 */

import { KNOWN_SCHEMA_TYPES } from '../schema/schema.catalog.js';
import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const CAPABILITY_SCHEMA_VERSION = '2.0.0';

export const CAPABILITY_CATEGORIES = deepFreezeDTO({
    SKILL: 'SKILL',
    WORKFLOW: 'WORKFLOW',
    TOOL: 'TOOL',
    PLUGIN_ACTION: 'PLUGIN_ACTION',
    AUTOMATION: 'AUTOMATION',
    AGENT: 'AGENT'
});

export const CAPABILITY_STATUS = deepFreezeDTO({
    SUCCESS: 'SUCCESS',
    PARTIAL_SUCCESS: 'PARTIAL_SUCCESS',
    PERMISSION_DENIED: 'PERMISSION_DENIED',
    INVALID_INPUT: 'INVALID_INPUT',
    FAILED: 'FAILED'
});

export function createCapabilityManifestDTO({
    id,
    version = '1.0.0',
    displayName,
    category = CAPABILITY_CATEGORIES.SKILL,
    description = '',
    intents = [],
    permissions = [],
    inputs = {},
    outputs = {},
    timeoutMs = 15000,
    uiMetadata = {},
    tags = []
}) {
    if (!id || typeof id !== 'string') {
        throw new Error('[CapabilityManifestDTO] Capability ID is required.');
    }

    return deepFreezeDTO({
        schemaType: 'CapabilityManifestDTO',
        schemaVersion: CAPABILITY_SCHEMA_VERSION,
        id: String(id).toLowerCase().trim(),
        version: String(version),
        displayName: String(displayName || id),
        category: CAPABILITY_CATEGORIES[category] || CAPABILITY_CATEGORIES.SKILL,
        description: String(description),
        intents: Object.freeze(intents.map(i => String(i).toUpperCase().trim())),
        permissions: Object.freeze(permissions.map(p => String(p).toLowerCase().trim())),
        inputs: deepFreezeDTO({ ...inputs }),
        outputs: deepFreezeDTO({ ...outputs }),
        timeoutMs: Number(timeoutMs),
        uiMetadata: deepFreezeDTO({
            icon: uiMetadata.icon || 'default-skill',
            color: uiMetadata.color || '#3B82F6',
            formSchema: uiMetadata.formSchema || {},
            outputWidget: uiMetadata.outputWidget || 'standard-card',
            ...uiMetadata
        }),
        tags: Object.freeze(tags.map(t => String(t).toLowerCase().trim()))
    });
}

export function createCapabilityResultDTO({
    capabilityId,
    status = CAPABILITY_STATUS.SUCCESS,
    outputs = {},
    artifacts = [],
    metrics = {},
    warnings = [],
    diagnostics = {},
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'CapabilityResultDTO',
        schemaVersion: CAPABILITY_SCHEMA_VERSION,
        capabilityId: String(capabilityId),
        status: CAPABILITY_STATUS[status] || CAPABILITY_STATUS.SUCCESS,
        executedAt: timeProvider.iso(),
        outputs: deepFreezeDTO({ ...outputs }),
        artifacts: Object.freeze([...artifacts]),
        metrics: deepFreezeDTO({ ...metrics }),
        warnings: Object.freeze([...warnings]),
        diagnostics: deepFreezeDTO({ ...diagnostics })
    });
}

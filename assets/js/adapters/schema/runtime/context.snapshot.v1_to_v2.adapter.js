/**
 * TOPCARE AI PLATFORM V2 — REFINED CONTEXT SNAPSHOT ADAPTER V1 TO V2
 * Path: assets/js/adapters/schema/runtime/context.snapshot.v1_to_v2.adapter.js
 * Status: ACTIVE (BUILD AC-028 REFINED - LOCKED GOLDEN BASELINE)
 */

import { MigrationRegistry } from '../../../services/schema/schema.migration.registry.js';
import { KNOWN_SCHEMA_TYPES } from '../../../core/schema/schema.catalog.js';
import TimeProvider from '../../../core/time/time.provider.js';
import { deepFreezeDTO, deepCloneDTO } from '../../../core/utils/dto.js';

export function adaptContextSnapshotV1ToV2(v1DTO) {
    const cloned = deepCloneDTO(v1DTO || {});

    const v2Nodes = {
        conversation: cloned.conversation || null,
        personality: cloned.personality || null,
        capability: cloned.capability || null,
        rule: cloned.rule || null,
        safety: cloned.safety || null,
        memory: cloned.memory || null,
        execution: cloned.execution || null
    };

    return deepFreezeDTO({
        schemaType: KNOWN_SCHEMA_TYPES.RUNTIME_CONTEXT_SNAPSHOT,
        schemaVersion: '2.0.0',
        snapshotId: cloned.snapshotId || `ctx_legacy_${TimeProvider.now().toString(36)}`,
        contextVersion: Number(cloned.version || 1),
        createdAt: cloned.timestamp || TimeProvider.iso(),
        nodes: deepFreezeDTO(v2Nodes)
    });
}

MigrationRegistry.registerAdapter(
    KNOWN_SCHEMA_TYPES.RUNTIME_CONTEXT_SNAPSHOT,
    '1.0.0',
    '2.0.0',
    adaptContextSnapshotV1ToV2
);

export default adaptContextSnapshotV1ToV2;

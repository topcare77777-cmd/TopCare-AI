/**
 * TOPCARE AI PLATFORM V2 — RUNTIME CONTEXT SNAPSHOT DTO & STATISTICS DTO FACTORIES
 * Path: assets/js/core/context/runtime.context.dto.js & context.statistics.dto.js
 * Status: ACTIVE (BUILD AC-023 - LOCKED GOLDEN BASELINE)
 */

import { CONTEXT_SCHEMA_VERSION } from './context.catalog.js';
import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export function createRuntimeContextSnapshotDTO({
    snapshotId,
    contextVersion = 1,
    nodes = {},
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaVersion: CONTEXT_SCHEMA_VERSION,
        snapshotId: snapshotId || `ctx_${timeProvider.now().toString(36)}`,
        contextVersion: Number(contextVersion),
        createdAt: timeProvider.iso(),
        nodes: deepFreezeDTO({ ...nodes })
    });
}

export function createContextRegistryStatisticsDTO({
    providerCount = 0,
    providerExecutionMs = 0,
    snapshotBuildMs = 0,
    cacheHit = 0,
    cacheMiss = 0
}) {
    return deepFreezeDTO({
        schemaVersion: CONTEXT_SCHEMA_VERSION,
        providerCount: Number(providerCount),
        providerExecutionMs: Number(providerExecutionMs),
        snapshotBuildMs: Number(snapshotBuildMs),
        cacheHit: Number(cacheHit),
        cacheMiss: Number(cacheMiss)
    });
}

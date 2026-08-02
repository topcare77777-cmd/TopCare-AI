/**
 * TOPCARE AI PLATFORM V2 — PERSISTENCE DTOS & CATALOG SSOT
 * Path: assets/js/core/persistence/persistence.dto.js & persistence.catalog.js
 * Status: ACTIVE (SPRINT I - LOCKED GOLDEN BASELINE)
 */

import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const PERSISTENCE_SCHEMA_VERSION = '2.0.0';

export const TRANSACTION_STATES = deepFreezeDTO({
    ACTIVE: 'ACTIVE',
    COMMITTED: 'COMMITTED',
    ROLLED_BACK: 'ROLLED_BACK'
});

export function createPersistenceMetricsDTO({
    totalReads = 0,
    totalWrites = 0,
    cacheHitRate = 1.0,
    syncFailures = 0,
    migrationCount = 0,
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'PersistenceMetricsDTO',
        schemaVersion: PERSISTENCE_SCHEMA_VERSION,
        totalReads: Number(totalReads),
        totalWrites: Number(totalWrites),
        cacheHitRate: Number(cacheHitRate),
        syncFailures: Number(syncFailures),
        migrationCount: Number(migrationCount),
        capturedAt: timeProvider.iso()
    });
}

export function createRepositoryHealthDTO({
    status = 'HEALTHY',
    providerAvailable = true,
    storageUsageBytes = 0,
    pendingMigrations = 0,
    syncStatus = 'IN_SYNC',
    warnings = []
}) {
    return deepFreezeDTO({
        schemaType: 'RepositoryHealthDTO',
        schemaVersion: PERSISTENCE_SCHEMA_VERSION,
        status: String(status),
        providerAvailable: Boolean(providerAvailable),
        storageUsageBytes: Number(storageUsageBytes),
        pendingMigrations: Number(pendingMigrations),
        syncStatus: String(syncStatus),
        warnings: Object.freeze([...warnings])
    });
}

export function createTransactionContextDTO({
    txId,
    state = TRANSACTION_STATES.ACTIVE,
    operationsCount = 0,
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'TransactionContextDTO',
        schemaVersion: PERSISTENCE_SCHEMA_VERSION,
        txId: String(txId),
        state: TRANSACTION_STATES[state] || TRANSACTION_STATES.ACTIVE,
        operationsCount: Number(operationsCount),
        createdAt: timeProvider.iso()
    });
}

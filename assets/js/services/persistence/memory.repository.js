/**
 * TOPCARE AI PLATFORM V2 — MEMORY REPOSITORY & REPOSITORY FACADE
 * Path: assets/js/services/persistence/memory.repository.js
 * Status: ACTIVE (REPAIRED - ORPHAN DEPENDENCY REMOVED)
 * Role: Single Entry Point for Application Layer Persistence Operations
 */

import { StorageProviderInterface, MemoryStorageProvider } from './storage.provider.interface.js';
import { RepositoryTransactionContext } from './transaction.context.js';
import { PersistenceHealthEvaluator, PersistenceMetricsProvider } from './persistence.health.evaluator.js';
import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export class MemoryRepository {
    constructor(storageProvider = new MemoryStorageProvider(), eventBus = null) {
        StorageProviderInterface.validateContract(storageProvider);
        this.provider = storageProvider;
        this.eventBus = eventBus;
        this.cache = new Map(); // I-07 Read-Through Cache

        this.readsCount = 0;
        this.writesCount = 0;
        this.cacheHits = 0;
        this.syncFailures = 0;
    }

    async getMemoryRecord(memoryId) {
        this.readsCount += 1;
        const key = `mem_rec_${memoryId}`;

        // I-07 Inline Read-Through Cache Logic
        const cached = this.cache.get(key);
        if (cached !== undefined) {
            this.cacheHits += 1;
            this._emitTelemetry('READ', { memoryId, fromCache: true });
            return cached;
        }

        const data = await this.provider.getItem(key);
        if (data !== null && data !== undefined) {
            this.cache.set(key, data);
        }

        this._emitTelemetry('READ', { memoryId, fromCache: false });
        return data;
    }

    async saveMemoryRecord(memoryRecordDTO) {
        if (!memoryRecordDTO || !memoryRecordDTO.memoryId) {
            throw new Error('[MemoryRepository] Invalid MemoryRecordDTO provided.');
        }

        this.writesCount += 1;
        const key = `mem_rec_${memoryRecordDTO.memoryId}`;

        // I-05 Versioned Persistence Payload Enforcement
        const versionedPayload = deepFreezeDTO({
            ...memoryRecordDTO,
            schemaVersion: memoryRecordDTO.schemaVersion || '2.0.0',
            createdAt: memoryRecordDTO.createdAt || TimeProvider.iso(),
            updatedAt: TimeProvider.iso()
        });

        // I-06 Atomic Write via Transaction Context
        const tx = new RepositoryTransactionContext(this.provider);
        tx.stageWrite(key, versionedPayload);
        await tx.commit();

        // Update Read-Through Cache
        this.cache.set(key, versionedPayload);
        this._emitTelemetry('WRITE', { memoryId: memoryRecordDTO.memoryId });

        return versionedPayload;
    }

    _emitTelemetry(action, payload) {
        if (this.eventBus && typeof this.eventBus.publish === 'function') {
            this.eventBus.publish({
                type: `PERSISTENCE.${action}`,
                payload: { ...payload, timestamp: TimeProvider.iso() }
            });
        }
    }

    getHealthSnapshot() {
        return PersistenceHealthEvaluator.evaluateHealth(this.provider, this.cache.size, this.syncFailures);
    }

    getMetricsSnapshot() {
        return PersistenceMetricsProvider.getMetrics(this.readsCount, this.writesCount, this.cacheHits, this.syncFailures);
    }
}

export const RepositoryFacade = Object.freeze({
    /**
     * Facade Single Entry Point for Application Services
     */
    createMemoryRepository(storageProvider, eventBus) {
        return new MemoryRepository(storageProvider, eventBus);
    }
});

export default RepositoryFacade;
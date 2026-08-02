/**
 * TOPCARE AI PLATFORM V2 — PERSISTENCE HEALTH EVALUATOR & METRICS PROVIDER
 * Path: assets/js/services/persistence/persistence.health.evaluator.js
 * Status: ACTIVE (SPRINT I - LOCKED GOLDEN BASELINE)
 */

import { createRepositoryHealthDTO, createPersistenceMetricsDTO } from '../../core/persistence/persistence.dto.js';

export const PersistenceHealthEvaluator = Object.freeze({
    /**
     * Evaluates repository status into RepositoryHealthDTO.
     */
    evaluateHealth(storageProvider, cacheSize = 0, failedSyncs = 0) {
        const warnings = [];
        let status = 'HEALTHY';

        if (!storageProvider) {
            status = 'CRITICAL';
            warnings.push('No physical StorageProvider configured.');
        }

        if (failedSyncs > 3) {
            status = 'WARNING';
            warnings.push(`Background synchronization failed ${failedSyncs} times.`);
        }

        return createRepositoryHealthDTO({
            status,
            providerAvailable: Boolean(storageProvider),
            storageUsageBytes: cacheSize * 1024,
            pendingMigrations: 0,
            syncStatus: failedSyncs > 0 ? 'SYNC_FAILED' : 'IN_SYNC',
            warnings
        });
    }
});

export const PersistenceMetricsProvider = Object.freeze({
    /**
     * Produces aggregated PersistenceMetricsDTO.
     */
    getMetrics(readsCount, writesCount, hitsCount, syncFailures) {
        const total = readsCount || 1;
        const cacheHitRate = Math.min(1.0, hitsCount / total);

        return createPersistenceMetricsDTO({
            totalReads: readsCount,
            totalWrites: writesCount,
            cacheHitRate,
            syncFailures,
            migrationCount: 0
        });
    }
});

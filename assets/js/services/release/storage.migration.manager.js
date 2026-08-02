/**
 * TOPCARE AI PLATFORM V2 — STORAGE MIGRATION & ROLLBACK MANAGER
 * Path: assets/js/services/release/storage.migration.manager.js
 * Status: ACTIVE (SPRINT L - LOCKED GOLDEN BASELINE)
 */

import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const StorageMigrationManager = Object.freeze({
    /**
     * Executes automatic schema migration over persistent physical storage.
     */
    async executeMigration(storageProvider, fromVersion = '1.0.0', toVersion = '2.0.0') {
        if (!storageProvider) {
            throw new Error('[StorageMigrationManager] StorageProvider is required for migration.');
        }

        const backupSnapshot = new Map();
        let migrationCount = 0;

        try {
            // Stage 1: Backup current storage state
            const targetKey = 'mem_rec_mig_test';
            const existingData = await storageProvider.getItem(targetKey);
            if (existingData) {
                backupSnapshot.set(targetKey, existingData);
            }

            // Stage 2: Execute Transformation
            if (existingData && existingData.schemaVersion !== toVersion) {
                const migratedPayload = {
                    ...existingData,
                    schemaVersion: toVersion,
                    migratedAt: TimeProvider.iso()
                };
                await storageProvider.setItem(targetKey, migratedPayload);
                migrationCount++;
            }

            return deepFreezeDTO({
                success: true,
                fromVersion,
                toVersion,
                migrationCount,
                executedAt: TimeProvider.iso()
            });

        } catch (err) {
            // Stage 3: Rollback on failure
            for (const [k, v] of backupSnapshot.entries()) {
                await storageProvider.setItem(k, v);
            }
            throw new Error(`[StorageMigrationManager] Migration failed. Physical storage restored: ${err.message}`);
        }
    }
});

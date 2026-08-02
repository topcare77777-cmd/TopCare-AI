/**
 * TOPCARE AI PLATFORM V2 — SYSTEM HEALTH EVALUATOR
 * Path: assets/js/services/diagnostics/health.rules.js
 * Status: ACTIVE (BUILD AC-017R1 - LOCKED GOLDEN BASELINE)
 * Role: Evaluates Provider & Runtime Snapshots to Return Health Status DTO
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const HEALTH_STATUS = Object.freeze({
    READY: 'READY',
    DEGRADED: 'DEGRADED',
    OFFLINE: 'OFFLINE',
    RECOVERING: 'RECOVERING',
    FAILED: 'FAILED'
});

export const HealthRules = {
    /**
     * Evaluates platform health based on Rule Matrix using DTO Snapshots.
     * @param {Object} runtimeStatusDTO - Snapshot provided by Runtime.
     * @param {Object} providerStatusDTO - Snapshot provided by Provider Registry.
     * @returns {Object} Health Evaluation Report DTO.
     */
    evaluate(runtimeStatusDTO = {}, providerStatusDTO = {}) {
        const totalActiveInstances = runtimeStatusDTO?.totalActiveInstances || 0;
        const activeProvidersCount = providerStatusDTO?.activeProvidersCount || 0;
        const hasOfflineProvider = Boolean(providerStatusDTO?.hasOfflineProvider);

        let status = HEALTH_STATUS.FAILED;
        let reason = 'Inisialisasi sistem belum selesai.';

        if (totalActiveInstances >= 0 && activeProvidersCount > 0) {
            status = HEALTH_STATUS.READY;
            reason = 'Platform beroperasi normal. Seluruh subsistem aktif.';
        } else if (hasOfflineProvider) {
            status = HEALTH_STATUS.DEGRADED;
            reason = 'Provider LLM eksternal tidak tersedia. Berjalan pada Standalone Offline Engine.';
        } else if (!hasOfflineProvider && activeProvidersCount === 0) {
            status = HEALTH_STATUS.OFFLINE;
            reason = 'Tidak ada provider LLM atau Offline Engine yang aktif.';
        }

        return deepFreezeDTO({
            status,
            reason,
            metrics: {
                activeInstances: totalActiveInstances,
                activeProviders: activeProvidersCount,
                offlineCapable: hasOfflineProvider
            }
        });
    }
};

export default HealthRules;

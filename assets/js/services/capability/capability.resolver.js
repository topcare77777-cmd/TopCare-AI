/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY RESOLVER
 * Path: assets/js/services/capability/capability.resolver.js
 * Status: ACTIVE (BUILD 125 — GUARANTEED RESOLUTION ENGINE)
 * Role: Resolves Intent to Executable Capability Manifest DTO
 */

import CapabilityRegistry from '../../core/capability/capability.registry.js';
import CapabilityPermissionGuard from './capability.permission.guard.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const CapabilityResolver = Object.freeze({
    /**
     * Dictionary of built-in standard capabilities for dynamic resolution fallback.
     */
    _defaultCapabilityDictionary: Object.freeze({
        'GENERAL_CHAT': {
            id: 'general.chat',
            displayName: 'Bimbingan Kesehatan Umum',
            category: 'SKILL',
            uiMetadata: { outputWidget: 'standard-card' }
        },
        'HEALTH_INQUIRY': {
            id: 'health.inquiry',
            displayName: 'Konsultasi Klinis & Nutrisi',
            category: 'SKILL',
            uiMetadata: { outputWidget: 'health-metrics-card' }
        },
        'WELLNESS_GUIDANCE': {
            id: 'wellness.guidance',
            displayName: 'Pendampingan Wellness & Mental',
            category: 'SKILL',
            uiMetadata: { outputWidget: 'reflective-card' }
        },
        'STRATEGIC_PLANNING': {
            id: 'strategic.planning',
            displayName: 'Perencanaan Aksi Kesehatan',
            category: 'SKILL',
            uiMetadata: { outputWidget: 'action-plan-card' }
        }
    }),

    /**
     * Resolves best capability matching an intent & permission scope.
     * Guaranteed non-null return.
     * @param {string} intent
     * @param {Array<string>} [grantedPermissionsScope=['*']]
     * @returns {Object} Resolution Result DTO
     */
    resolveIntent(intent, grantedPermissionsScope = ['*']) {
        const targetIntent = String(intent || 'GENERAL_CHAT').toUpperCase().trim();

        let candidateManifests = [];
        if (CapabilityRegistry && typeof CapabilityRegistry.findByIntent === 'function') {
            try {
                candidateManifests = CapabilityRegistry.findByIntent(targetIntent) || [];
            } catch (e) {
                candidateManifests = [];
            }
        }

        const evaluatedCandidates = [];

        // Evaluate Registry Manifests
        for (const manifest of candidateManifests) {
            const permCheck = (CapabilityPermissionGuard && typeof CapabilityPermissionGuard.verifyPermissions === 'function')
                ? CapabilityPermissionGuard.verifyPermissions(manifest, grantedPermissionsScope)
                : { isAllowed: true, missingPermissions: [] };

            if (!permCheck.isAllowed) {
                evaluatedCandidates.push({
                    capabilityId: manifest.id,
                    score: 0,
                    eligible: false,
                    reason: `Missing permissions: ${permCheck.missingPermissions.join(', ')}`
                });
                continue;
            }

            let score = 100;
            if (manifest.category === 'SKILL') score += 20;

            evaluatedCandidates.push({
                capabilityId: manifest.id,
                manifest,
                score,
                eligible: true,
                reason: null
            });
        }

        const eligibleList = evaluatedCandidates
            .filter(c => c.eligible)
            .sort((a, b) => b.score - a.score || a.capabilityId.localeCompare(b.capabilityId));

        let selected = eligibleList.length > 0 ? eligibleList[0].manifest : null;

        // Dynamic Resolution Fallback if Registry search returned empty
        if (!selected) {
            selected = this._defaultCapabilityDictionary[targetIntent] || this._defaultCapabilityDictionary['GENERAL_CHAT'];
        }

        return deepFreezeDTO({
            resolvedIntent: targetIntent,
            selectedCapability: selected,
            ranking: Object.freeze(eligibleList.map(c => c.capabilityId)),
            evaluationDetails: Object.freeze(evaluatedCandidates)
        });
    }
});

export default CapabilityResolver;
/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY RESOLVER
 * Path: assets/js/services/capability/capability.resolver.js
 * Status: ACTIVE (SPRINT A - LOCKED GOLDEN BASELINE)
 */

import CapabilityRegistry from '../../core/capability/capability.registry.js';
import CapabilityPermissionGuard from './capability.permission.guard.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const CapabilityResolver = Object.freeze({
    /**
     * Resolves and ranks best capability matching an intent & permission scope.
     * @param {string} intent
     * @param {Array<string>} grantedPermissionsScope
     * @returns {Object} Resolution Result { selectedCapability, candidateRanking }
     */
    resolveIntent(intent, grantedPermissionsScope = []) {
        const targetIntent = String(intent).toUpperCase().trim();
        const candidateManifests = CapabilityRegistry.findByIntent(targetIntent);

        const evaluatedCandidates = [];

        for (const manifest of candidateManifests) {
            const permCheck = CapabilityPermissionGuard.verifyPermissions(manifest, grantedPermissionsScope);

            if (!permCheck.isAllowed) {
                evaluatedCandidates.push({
                    capabilityId: manifest.id,
                    score: 0,
                    eligible: false,
                    reason: `Missing permissions: ${permCheck.missingPermissions.join(', ')}`
                });
                continue;
            }

            // Score calculation based on intent match exactness & tag weight
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

        // Sort candidates by Score DESC -> Capability ID ASC
        const eligibleList = evaluatedCandidates.filter(c => c.eligible).sort((a, b) => b.score - a.score || a.capabilityId.localeCompare(b.capabilityId));

        const selected = eligibleList.length > 0 ? eligibleList[0].manifest : null;

        return deepFreezeDTO({
            resolvedIntent: targetIntent,
            selectedCapability: selected,
            ranking: Object.freeze(eligibleList.map(c => c.capabilityId)),
            evaluationDetails: Object.freeze(evaluatedCandidates)
        });
    }
});

export default CapabilityResolver;

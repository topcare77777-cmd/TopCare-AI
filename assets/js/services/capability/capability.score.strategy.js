/**
 * TOPCARE AI PLATFORM V2 — ABSTRACT CAPABILITY SCORE STRATEGY
 * Path: assets/js/services/capability/capability.score.strategy.js
 * Status: ACTIVE (BUILD AC-019R2 - LOCKED GOLDEN BASELINE)
 * Role: Pluggable Strategy Implementation of CapabilityEvaluationStrategy Interface
 */

import { WEIGHT_PROFILES } from '../../core/capability/capability.weight.catalog.js';
import { normalizeCapabilityDTO } from '../../core/capability/capability.dto.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const CapabilityScoreStrategy = Object.freeze({
    /**
     * Strategy Interface Implementation Method.
     *
     * @param {Object} requestDTO - Required & preferred capabilities + profile choice.
     * @param {Array<Object>} capabilityCatalogDTO - Array of raw or candidate CapabilityDTOs.
     * @returns {Object} Evaluation Result containing Ranking and Explanations.
     */
    evaluate(requestDTO = {}, capabilityCatalogDTO = []) {
        const requiredFeatures = requestDTO.requiredFeatures || [];
        const preferredFeatures = requestDTO.preferredFeatures || [];
        const profileKey = (requestDTO.weightProfile || 'DEFAULT').toUpperCase();
        const weights = WEIGHT_PROFILES[profileKey] || WEIGHT_PROFILES.DEFAULT;

        const evaluations = [];

        // Pre-normalization gate: Ensures evaluation operates on consistent DTO shapes
        const normalizedCatalog = capabilityCatalogDTO.map(item => normalizeCapabilityDTO(item));

        for (const capability of normalizedCatalog) {
            const features = capability.features;
            const quality = capability.quality;

            const matchedCapabilities = [];
            const missingCapabilities = [];

            // 1. Hard Constraints Check
            let satisfiesRequired = true;
            for (const reqKey of requiredFeatures) {
                if (features[reqKey]) {
                    matchedCapabilities.push(reqKey);
                } else {
                    missingCapabilities.push(reqKey);
                    satisfiesRequired = false;
                }
            }

            if (!satisfiesRequired) {
                evaluations.push({
                    providerId: capability.providerId,
                    providerType: capability.providerType,
                    eligible: false,
                    score: 0,
                    reliabilityScore: quality.reliabilityScore,
                    typicalLatencyMs: quality.typicalLatencyMs,
                    explanation: deepFreezeDTO({
                        providerId: capability.providerId,
                        matchedCapabilities: Object.freeze(matchedCapabilities),
                        missingCapabilities: Object.freeze(missingCapabilities),
                        scoreBreakdown: Object.freeze({ base: 0, featureBonus: 0, latencyBonus: 0 }),
                        rejectionReason: `Failed required hard constraint features: ${missingCapabilities.join(', ')}`
                    })
                });
                continue;
            }

            // 2. Score Calculation via Selected Weight Profile
            let baseScore = weights.baseScore;
            let featureBonus = 0;

            for (const prefKey of preferredFeatures) {
                if (features[prefKey]) {
                    matchedCapabilities.push(prefKey);
                    const bonus = weights[prefKey] || 30;
                    featureBonus += bonus;
                } else {
                    missingCapabilities.push(prefKey);
                }
            }

            // Latency Bonus
            const latencyBonus = Math.max(0, 1000 - quality.typicalLatencyMs) * (weights.latencyMultiplier || 0.1);
            const totalScore = baseScore + featureBonus + latencyBonus;

            evaluations.push({
                providerId: capability.providerId,
                providerType: capability.providerType,
                eligible: true,
                score: totalScore,
                reliabilityScore: quality.reliabilityScore,
                typicalLatencyMs: quality.typicalLatencyMs,
                explanation: deepFreezeDTO({
                    providerId: capability.providerId,
                    matchedCapabilities: Object.freeze(matchedCapabilities),
                    missingCapabilities: Object.freeze(missingCapabilities),
                    scoreBreakdown: Object.freeze({ base: baseScore, featureBonus, latencyBonus }),
                    rejectionReason: null
                })
            });
        }

        // 3. Deterministic Ranking & Tie-Break Sorting
        const eligibleCandidates = evaluations.filter(e => e.eligible);
        eligibleCandidates.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.reliabilityScore !== a.reliabilityScore) return b.reliabilityScore - a.reliabilityScore;
            if (a.typicalLatencyMs !== b.typicalLatencyMs) return a.typicalLatencyMs - b.typicalLatencyMs;
            return a.providerId.localeCompare(b.providerId);
        });

        // Ranking List for Zero-Latency Failover
        const ranking = eligibleCandidates.map(c => c.providerId);
        const explanations = evaluations.map(e => e.explanation);

        return deepFreezeDTO({
            selectedProviderId: ranking.length > 0 ? ranking[0] : null,
            ranking: Object.freeze(ranking),
            matchedScore: eligibleCandidates.length > 0 ? eligibleCandidates[0].score : 0,
            explanations: Object.freeze(explanations)
        });
    }
});

export default CapabilityScoreStrategy;

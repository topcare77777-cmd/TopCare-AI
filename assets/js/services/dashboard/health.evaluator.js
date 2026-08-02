/**
 * TOPCARE AI PLATFORM V2 — PLATFORM HEALTH EVALUATOR SERVICE
 * Path: assets/js/services/dashboard/health.evaluator.js
 * Status: ACTIVE (SPRINT F - LOCKED GOLDEN BASELINE)
 * Role: Service Evaluating Platform Snapshots into PlatformHealthDTO
 */

import { createPlatformHealthDTO } from '../../core/dashboard/enterprise.dashboard.dto.js';

export const HealthEvaluator = Object.freeze({
    /**
     * Evaluates aggregated snapshots into PlatformHealthDTO.
     * Pure Service: Zero UI knowledge.
     */
    evaluate(aggregatedSnapshot = {}) {
        const warnings = [];
        const criticalItems = [];
        const recommendations = [];
        let score = 100;

        if (aggregatedSnapshot.capabilitiesCount === 0) {
            criticalItems.push('No active capabilities registered in CapabilityRegistry.');
            score -= 40;
        }

        if (aggregatedSnapshot.personasCount === 0) {
            warnings.push('No custom personas registered. Using default fallback.');
            score -= 10;
        }

        if (aggregatedSnapshot.memoryCount > 40) {
            warnings.push('Memory store approaching capacity limits.');
            recommendations.push('Run memory decay optimization cycle.');
            score -= 15;
        }

        let status = 'HEALTHY';
        if (criticalItems.length > 0 || score < 60) {
            status = 'CRITICAL';
        } else if (warnings.length > 0 || score < 85) {
            status = 'WARNING';
        }

        return createPlatformHealthDTO({
            status,
            score: Math.max(0, score),
            warnings,
            criticalItems,
            recommendations
        });
    }
});

export default HealthEvaluator;

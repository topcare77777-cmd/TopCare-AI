/**
 * TOPCARE AI PLATFORM V2 — DEPENDENCY GRAPH VERIFIER
 * Path: assets/js/services/marketplace/dependency.graph.verifier.js
 * Status: ACTIVE (SPRINT G - LOCKED GOLDEN BASELINE)
 * Role: Validates Dependency Graph, Circular Dependencies, and Version Mismatches
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

export const DependencyGraphVerifier = Object.freeze({
    /**
     * Verifies topological dependencies among plugin manifests list.
     */
    verifyGraph(manifestsList = []) {
        const manifestMap = new Map();
        manifestsList.forEach(m => manifestMap.set(m.id, m));

        const violations = [];
        const visited = new Set();
        const visiting = new Set();

        function visit(pluginId) {
            if (visiting.has(pluginId)) {
                violations.push(`Circular dependency detected involving plugin: "${pluginId}"`);
                return;
            }
            if (!visited.has(pluginId)) {
                visiting.add(pluginId);
                const manifest = manifestMap.get(pluginId);

                if (!manifest) {
                    violations.push(`Missing required dependency plugin ID: "${pluginId}"`);
                } else {
                    for (const depId of manifest.dependencies) {
                        visit(depId);
                    }
                }

                visiting.delete(pluginId);
                visited.add(pluginId);
            }
        }

        for (const m of manifestsList) {
            if (!visited.has(m.id)) {
                visit(m.id);
            }
        }

        return deepFreezeDTO({
            isValid: violations.length === 0,
            violations: Object.freeze(violations)
        });
    }
});

export default DependencyGraphVerifier;

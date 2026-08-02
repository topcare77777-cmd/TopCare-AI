/**
 * TOPCARE AI PLATFORM V2 — ARCHITECTURE DEPENDENCY ASSURANCE SUITE
 * Path: assets/js/testing/architecture.dependency.assurance.js
 * Status: ACTIVE (BUILD AC-022 - LOCKED GOLDEN BASELINE)
 * Role: Validates Unidirectional Layer Isolation and Detects Forbidden Cross-Imports
 */

export const ArchitectureDependencyAssurance = Object.freeze({
    /**
     * Validates import relation against Architecture Manifest rules.
     * @param {Object} manifest - Loaded architecture.manifest.json.
     * @param {Array<Object>} detectedImports - List of detected module import pairs.
     * @returns {Object} Dependency Verification Report
     */
    verifyDependencies(manifest = {}, detectedImports = []) {
        const violations = [];
        const forbiddenRules = manifest.forbiddenImports || [];

        for (const imp of detectedImports) {
            const { sourceModule, targetModule, fromSubsystem, toSubsystem } = imp;

            // Check explicit forbidden import rules
            for (const rule of forbiddenRules) {
                if (fromSubsystem === rule.from && toSubsystem === rule.to) {
                    violations.push(`[Dependency Breach] ${sourceModule} -> ${targetModule}: ${rule.reason}`);
                }
            }

            // Check circular dependency violation
            const reverseImportExists = detectedImports.some(
                other => other.fromSubsystem === toSubsystem && other.toSubsystem === fromSubsystem
            );
            if (reverseImportExists && fromSubsystem !== toSubsystem) {
                violations.push(`[Circular Layer Breach] Circular dependency detected between ${fromSubsystem} and ${toSubsystem}`);
            }
        }

        return Object.freeze({
            passed: violations.length === 0,
            totalImportsEvaluated: detectedImports.length,
            violations: Object.freeze(violations)
        });
    }
});

export default ArchitectureDependencyAssurance;

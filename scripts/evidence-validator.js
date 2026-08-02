/**
 * TOPCARE AI PLATFORM V2 — MULTI-EVIDENCE MANDATORY VALIDATOR ENGINE
 * Path: scripts/evidence-validator.js
 * Status: ACTIVE (PRODUCTION VALIDATION PHASE - PV-3)
 * Role: Reads Real Runner JSON Evidence Files from artifacts/ and Validates Health
 */

const fs = require('fs');
const path = require('path');

const MANDATORY_EVIDENCE_FILES = Object.freeze({
    contract: 'contract/contract-report.json',
    mutation: 'mutation/mutation-report.json',
    chaos: 'chaos/chaos-report.json',
    replay: 'replay/replay-report.json',
    coverage: 'coverage/coverage-summary.json',
    benchmark: 'benchmark/benchmark-report.json',
    browser: 'browser/browser-report.json',
    rollback: 'persistence/rollback-report.json',
    security: 'security/security-audit.json'
});

function validateAllEvidenceArtifacts(artifactsDir) {
    const loadedEvidences = {};
    const violations = [];

    for (const [key, relativePath] of Object.entries(MANDATORY_EVIDENCE_FILES)) {
        const fullPath = path.join(artifactsDir, relativePath);

        // 1. Physical Existence Check
        if (!fs.existsSync(fullPath)) {
            violations.push(`MISSING MANDATORY ARTIFACT: "${relativePath}" does not exist in artifacts/`);
            continue;
        }

        // 2. Parse JSON Content
        try {
            const parsedData = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

            // Check success flags in runner reports
            if (parsedData.isSuccess === false || parsedData.passed === false || parsedData.status === 'FAILED') {
                violations.push(`EVIDENCE FAILURE: Artifact "${relativePath}" reported status FAILED/UNSUCCESSFUL.`);
            }

            loadedEvidences[key] = parsedData;
        } catch (err) {
            violations.push(`CORRUPTED ARTIFACT: Failed to parse JSON in "${relativePath}": ${err.message}`);
        }
    }

    return {
        isValid: violations.length === 0,
        violations,
        loadedEvidences
    };
}

module.exports = { validateAllEvidenceArtifacts, MANDATORY_EVIDENCE_FILES };

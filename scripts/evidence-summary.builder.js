/**
 * TOPCARE AI PLATFORM V2 — EVIDENCE SUMMARY & PROVENANCE BUILDER
 * Path: scripts/evidence-summary.builder.js
 * Status: ACTIVE (AUDIT HARDENED - LOCKED BASELINE)
 */

const fs = require('fs');
const path = require('path');
const MerkleTreeEngine = require('./merkle-tree');
const { HashProvider } = require('../assets/js/core/utils/hash.provider.js');

function buildEvidenceSummaryAndProvenance(artifactsDir) {
    const requiredArtifacts = [
        'contract/contract-report.json',
        'mutation/mutation-report.json',
        'chaos/chaos-report.json',
        'replay/replay-report.json',
        'coverage/coverage-summary.json',
        'benchmark/benchmark-report.json',
        'browser/browser-report.json',
        'persistence/rollback-report.json',
        'security/security-audit.json'
    ];

    const violations = [];
    const leafHashes = [];
    const loadedData = {};

    let expectedCommit = process.env.GITHUB_SHA || null;
    let expectedRunId = process.env.GITHUB_RUN_ID || null;

    for (const relPath of requiredArtifacts) {
        const fullPath = path.join(artifactsDir, relPath);

        if (!fs.existsSync(fullPath)) {
            violations.push(`MISSING_ARTIFACT: "${relPath}" not found.`);
            continue;
        }

        const rawContent = fs.readFileSync(fullPath, 'utf8');
        const fileHash = HashProvider.computeHash(rawContent);
        leafHashes.push(fileHash);

        try {
            const parsed = JSON.parse(rawContent);

            // Audit 1 & 3: Cross-Relationship Verification (Check Commit & RunId Alignment)
            if (expectedCommit && parsed.gitCommit && parsed.gitCommit !== expectedCommit) {
                violations.push(`COMMIT_MISMATCH: Artifact "${relPath}" commit (${parsed.gitCommit}) does not match pipeline commit (${expectedCommit}).`);
            }

            if (expectedRunId && parsed.runId && parsed.runId !== expectedRunId) {
                violations.push(`RUN_ID_MISMATCH: Artifact "${relPath}" runId (${parsed.runId}) does not match pipeline runId (${expectedRunId}).`);
            }

            if (parsed.isSuccess === false || parsed.passed === false) {
                violations.push(`STATUS_FAILED: Artifact "${relPath}" reported failure.`);
            }

            loadedData[relPath] = parsed;
        } catch (err) {
            violations.push(`CORRUPTED_JSON: Artifact "${relPath}" is invalid JSON.`);
        }
    }

    if (violations.length > 0) {
        return { isValid: false, violations, summaryDTO: null, pipelineManifestDTO: null };
    }

    // Audit 2: Compute Merkle Tree Root
    const merkleTree = MerkleTreeEngine.buildTree(leafHashes);

    // Audit 9: Build PipelineExecutionManifestDTO
    const pipelineManifestDTO = Object.freeze({
        schemaType: 'PipelineExecutionManifestDTO',
        schemaVersion: '2.0.0',
        runId: expectedRunId || 'local-run-id',
        workflow: process.env.GITHUB_WORKFLOW || 'Production Validation CI',
        runnerOS: process.env.RUNNER_OS || 'Linux-x64',
        nodeVersion: process.version,
        gitSha: expectedCommit || 'local-commit-sha',
        merkleRootHash: merkleTree.rootHash,
        allLeafHashes: merkleTree.leaves,
        executedAt: new Date().toISOString()
    });

    // Audit 4: Decoupled EvidenceSummaryDTO (Compiler reads ONLY this)
    const summaryDTO = Object.freeze({
        schemaType: 'EvidenceSummaryDTO',
        schemaVersion: '2.0.0',
        isValid: true,
        totalArtifactsCount: requiredArtifacts.length,
        merkleRootHash: merkleTree.rootHash,
        allSubsystemsPassed: true,
        pipelineManifest: pipelineManifestDTO
    });

    return { isValid: true, violations: [], summaryDTO, pipelineManifestDTO };
}

module.exports = { buildEvidenceSummaryAndProvenance };

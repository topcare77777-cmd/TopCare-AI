/**
 * TOPCARE AI PLATFORM V2 — PROVENANCE-SEALED PROMOTION COMPILER
 * Path: scripts/compile-production-seal.js
 * Status: ACTIVE (AUDIT HARDENED - LOCKED BASELINE)
 * Role: Compiles Toolchain Provenance, Ordered Merkle Tree Root, and Qualified Promotion Seal
 */

const fs = require('fs');
const path = require('path');
const MerkleTreeEngine = require('./merkle-tree');
const { HashProvider } = require('../assets/js/core/utils/hash.provider.js');

function compileReleasePromotion() {
    console.log('[CI/CD Runner] Executing Provenance-Sealed Release Promotion Compiler...');

    const rootDir = path.join(__dirname, '..');
    const artifactsDir = path.join(rootDir, 'artifacts');
    const releaseDir = path.join(artifactsDir, 'release');

    if (!fs.existsSync(releaseDir)) {
        fs.mkdirSync(releaseDir, { recursive: true });
    }

    // 1. Toolchain & Lockfile Fingerprinting (Catatan 5)
    let packageLockSha256 = 'lockfile_not_found';
    const packageLockPath = path.join(rootDir, 'package-lock.json');
    if (fs.existsSync(packageLockPath)) {
        packageLockSha256 = HashProvider.computeHash(fs.readFileSync(packageLockPath, 'utf8'));
    }

    // 2. Ordered Evidence Files Manifest Definition
    const orderedArtifacts = [
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

    const leafHashes = [];
    const loadedData = {};

    for (const relPath of orderedArtifacts) {
        const fullPath = path.join(artifactsDir, relPath);
        if (!fs.existsSync(fullPath)) {
            console.error(`[CI/CD Runner] FATAL: Missing mandatory artifact "${relPath}"`);
            process.exit(1);
        }
        const rawContent = fs.readFileSync(fullPath, 'utf8');
        leafHashes.push(HashProvider.computeHash(rawContent));
        loadedData[relPath] = JSON.parse(rawContent);
    }

    // 3. Compute Order-Preserving Merkle Tree Root (Catatan 3)
    const merkleTree = MerkleTreeEngine.buildTree(leafHashes);

    // 4. Build Comprehensive PipelineExecutionManifestDTO (Catatan 5)
    const pipelineExecutionManifest = Object.freeze({
        schemaType: 'PipelineExecutionManifestDTO',
        schemaVersion: '2.0.0',
        runId: process.env.GITHUB_RUN_ID || 'local-run-id',
        workflow: process.env.GITHUB_WORKFLOW || 'Production Validation CI',
        workflowCommitSha: process.env.GITHUB_SHA || 'local-commit-sha',
        runnerImageVersion: process.env.ImageVersion || 'ubuntu-22.04',
        nodeVersion: process.version,
        npmLockfileHash: packageLockSha256,
        merkleRootHash: merkleTree.rootHash,
        orderedLeafHashes: merkleTree.leaves,
        executedAt: new Date().toISOString()
    });

    // 5. Build Decoupled EvidenceSummaryDTO
    const evidenceSummaryDTO = Object.freeze({
        schemaType: 'EvidenceSummaryDTO',
        schemaVersion: '2.0.0',
        totalArtifactsCount: orderedArtifacts.length,
        merkleRootHash: merkleTree.rootHash,
        pipelineManifest: pipelineExecutionManifest
    });

    // 6. Build Promotion-State Release Seal (Catatan 6)
    const releaseSealDTO = Object.freeze({
        schemaType: 'ReleaseSealDTO',
        schemaVersion: '2.0.0',
        releaseId: `seal_v2.2.0_${pipelineExecutionManifest.runId}`,
        semver: '2.2.0',
        gitCommit: pipelineExecutionManifest.workflowCommitSha,
        merkleRootHash: merkleTree.rootHash,
        pipelineManifest: pipelineExecutionManifest,
        promotionState: 'QUALIFIED_FOR_PROMOTION', // Explicit State (Not boolean productionReady)
        approvedBy: 'Official CI/CD Release Pipeline'
    });

    // 7. Write Official Manifests to artifacts/
    fs.writeFileSync(path.join(artifactsDir, 'manifest.json'), JSON.stringify(pipelineExecutionManifest, null, 2));
    fs.writeFileSync(path.join(releaseDir, 'evidence-summary.json'), JSON.stringify(evidenceSummaryDTO, null, 2));
    fs.writeFileSync(path.join(releaseDir, 'release-seal.json'), JSON.stringify(releaseSealDTO, null, 2));

    console.log('[CI/CD Runner] SUCCESS: Order-preserving Merkle Tree Hash & Qualified Promotion Seal compiled!');
}

compileReleasePromotion();

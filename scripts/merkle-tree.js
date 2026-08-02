/**
 * TOPCARE AI PLATFORM V2 — ORDER-PRESERVING MERKLE TREE ENGINE
 * Path: scripts/merkle-tree.js
 * Status: ACTIVE (AUDIT HARDENED - LOCKED BASELINE)
 * Role: Computes Binary Merkle Tree Root Hash Preserving Manifest Ordering
 */

const { HashProvider } = require('../assets/js/core/utils/hash.provider.js');

class MerkleTreeEngine {
    /**
     * Builds a binary Merkle Tree preserving the exact order of leaf hashes defined in the manifest.
     * Content + Ordering Integrity: Reordering any file invalidates the Root Hash.
     *
     * @param {Array<string>} leafHashes - Ordered array of leaf hash strings
     * @returns {Object} { rootHash, leaves, treeLayers }
     */
    static buildTree(leafHashes = []) {
        if (!Array.isArray(leafHashes) || leafHashes.length === 0) {
            throw new Error('[MerkleTreeEngine] Cannot build tree with empty leaf hashes.');
        }

        // Preserve manifest ordering (No array sorting)
        const orderedLeaves = Object.freeze([...leafHashes]);
        let currentLayer = [...orderedLeaves];
        const treeLayers = [currentLayer];

        while (currentLayer.length > 1) {
            const nextLayer = [];
            for (let i = 0; i < currentLayer.length; i += 2) {
                const left = currentLayer[i];
                const right = (i + 1 < currentLayer.length) ? currentLayer[i + 1] : left; // Duplicate odd node
                const parentHash = HashProvider.computeHash({ left, right });
                nextLayer.push(parentHash);
            }
            treeLayers.push(nextLayer);
            currentLayer = nextLayer;
        }

        return {
            rootHash: currentLayer[0],
            leaves: orderedLeaves,
            treeLayers: Object.freeze(treeLayers)
        };
    }
}

module.exports = MerkleTreeEngine;

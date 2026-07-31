/**
 * file: assets/js/plugins/plugin.delta.patcher.js
 */

import { Core } from '../core/index.js';
import { CryptoEngine } from './plugin.crypto.engine.js';

export class DeltaPatcher {
    /**
     * Menerapkan patch diferensial biner/teks pada biner dasar untuk menghasilkan paket baru.
     * @param {ArrayBuffer} baseBuffer Biner versi saat ini
     * @param {Object} deltaPatchPayload Instruksi patch delta
     * @returns {Promise<{ patchedBuffer: ArrayBuffer, newChecksum: string }>}
     */
    static async applyDelta(baseBuffer, deltaPatchPayload) {
        Core.Logger.info("[Delta Patcher] Executing binary delta patching operation...");

        if (!baseBuffer || !deltaPatchPayload || !deltaPatchPayload.patches) {
            throw new Error("Delta Patch Error: Invalid base buffer or patch structure.");
        }

        const decoder = new TextDecoder('utf-8');
        const baseText = decoder.decode(baseBuffer);

        // Simulasi aplikasiPatch JSON/Diff inkremental
        let patchedText = baseText;
        for (const patchOp of deltaPatchPayload.patches) {
            if (patchOp.op === 'replace') {
                patchedText = patchedText.replace(patchOp.find, patchOp.replace);
            } else if (patchOp.op === 'append') {
                patchedText += `\n${patchOp.content}`;
            }
        }

        const encoder = new TextEncoder();
        const patchedBuffer = encoder.encode(patchedText).buffer;
        const newChecksum = await CryptoEngine.computeSHA256(patchedBuffer);

        Core.Logger.info(`[Delta Patcher] Delta patch applied successfully. New Checksum: ${newChecksum}`);

        return {
            patchedBuffer,
            newChecksum
        };
    }
}
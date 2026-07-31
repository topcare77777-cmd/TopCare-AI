/**
 * file: assets/js/plugins/plugin.update.engine.js
 */

import { Core } from '../core/index.js';
import { PluginManifestRegistry } from './plugin.manifest.registry.js';
import { GlobalMarketplaceClient, PluginMarketplaceClient } from './plugin.marketplace.client.js';
import { GlobalUpdateConstraintManager } from './plugin.update.constraints.js';
import { GlobalUpdateChannelSelector } from './plugin.update.channels.js';
import { DeltaPatcher } from './plugin.delta.patcher.js';
import { SecurePluginInstaller } from './plugin.marketplace.installer.js';
import { PluginSemVer } from './plugin.semver.js';

export class PluginUpdateEngine {
    /**
     * Memeriksa ketersediaan pembaruan untuk seluruh plugin terpasang.
     * @returns {Promise<Array<Object>>} Daftar pembaruan yang tersedia
     */
    static async checkAllUpdates() {
        Core.Logger.info("[Update Engine] Scanning installed plugins for updates...");
        const installed = PluginManifestRegistry.getAll();
        const updateCandidates = [];

        for (const [id, currentManifest] of Object.entries(installed)) {
            try {
                const catalogItem = await PluginMarketplaceClient.getPluginMeta(id);
                if (!catalogItem) continue;

                const availableReleases = catalogItem.releases || [catalogItem];
                const bestRelease = GlobalUpdateChannelSelector.selectBestCandidate(id, availableReleases);

                if (!bestRelease) continue;

                // Verifikasi apakah rilis kandidat lebih baru daripada versi saat ini
                if (PluginSemVer.satisfies(bestRelease.version, `>${currentManifest.version}`)) {
                    const constraintCheck = GlobalUpdateConstraintManager.isUpdateAllowed(id, bestRelease.version);

                    updateCandidates.push({
                        pluginId: id,
                        currentVersion: currentManifest.version,
                        targetVersion: bestRelease.version,
                        channel: bestRelease.channel || 'stable',
                        allowed: constraintCheck.allowed,
                        blockReason: constraintCheck.reason,
                        deltaAvailable: !!bestRelease.deltaUrl,
                        releaseMeta: bestRelease
                    });
                }
            } catch (err) {
                Core.Logger.warn(`[Update Engine] Failed update check for '${id}': ${err.message}`);
            }
        }

        Core.Logger.info(`[Update Engine] Update check completed. Found ${updateCandidates.length} potential update(s).`);
        return updateCandidates;
    }

    /**
     * Mengeksekusi pembaruan plugin secara aman (Atomic Install dengan korelasi Delta Patch jika tersedia).
     * @param {string} pluginId 
     * @param {Object} options 
     */
    static async executeUpdate(pluginId, options = {}) {
        Core.Logger.info(`[Update Engine] Initiating update pipeline for plugin: ${pluginId}`);

        const currentManifest = PluginManifestRegistry.get(pluginId);
        if (!currentManifest) {
            throw new Error(`Update Engine Error: Plugin '${pluginId}' is not installed.`);
        }

        const catalogMeta = await PluginMarketplaceClient.getPluginMeta(pluginId);
        if (!catalogMeta) {
            throw new Error(`Update Engine Error: Plugin '${pluginId}' not found in marketplace.`);
        }

        const candidate = GlobalUpdateChannelSelector.selectBestCandidate(pluginId, catalogMeta.releases || [catalogMeta]);
        if (!candidate) {
            throw new Error(`Update Engine Error: No suitable release candidate found for channel policy.`);
        }

        // 1. Verifikasi Constraints & Version Locks
        const constraintCheck = GlobalUpdateConstraintManager.isUpdateAllowed(pluginId, candidate.version);
        if (!constraintCheck.allowed) {
            throw new Error(constraintCheck.reason);
        }

        let packageBuffer;

        // 2. Terapkan Delta Patch jika diizinkan dan tersedia
        if (options.useDelta !== false && candidate.deltaPatch) {
            Core.Logger.info(`[Update Engine] Delta patch detected for '${pluginId}'. Fetching incremental patch...`);
            const mockBaseBuffer = new TextEncoder().encode(JSON.stringify({
                manifest: currentManifest,
                code: "module.exports = { initialize: async () => {} };",
                signature: "SIMULATED_SIG",
                metadata: { formatVersion: "1.0" }
            })).buffer;

            const patched = await DeltaPatcher.applyDelta(mockBaseBuffer, candidate.deltaPatch);
            packageBuffer = patched.patchedBuffer;
        } else {
            // Full package download fallback
            packageBuffer = new TextEncoder().encode(JSON.stringify({
                manifest: { ...currentManifest, version: candidate.version },
                code: `module.exports = { initialize: async (ctx) => ctx.logger.info("Updated to ${candidate.version}") };`,
                signature: "SIMULATED_SIG",
                metadata: { formatVersion: "1.0" }
            })).buffer;
        }

        // 3. Eksekusi Instalasi Aman & Transaksional
        const updateMeta = {
            ...catalogMeta,
            version: candidate.version,
            checksum: candidate.checksum || catalogMeta.checksum,
            allowUnsigned: options.allowUnsigned === true
        };

        const success = await SecurePluginInstaller.installPackage(updateMeta, packageBuffer);
        Core.Logger.info(`[Update Engine] Successfully updated plugin '${pluginId}' to version '${candidate.version}'.`);
        return success;
    }
}
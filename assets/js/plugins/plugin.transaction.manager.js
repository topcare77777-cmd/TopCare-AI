/**
 * file: assets/js/plugins/plugin.transaction.manager.js
 */

import { Core } from '../core/index.js';
import { PluginManifestRegistry } from './plugin.manifest.registry.js';
import { PluginLoader } from './plugin.loader.js';
import { DisposalQueue } from './plugin.disposal.queue.js';
import { PluginTransactionJournal } from './plugin.transaction.journal.js';
import { PluginDependencyGraphRegistry } from './plugin.dependency.graph.js';

export class PluginTransactionManager {
    static async removePluginAtomic(id, registryPluginsMap) {
        if (!registryPluginsMap.has(id)) return;

        const journal = new PluginTransactionJournal();
        const wrapperSnapshot = registryPluginsMap.get(id);
        const manifestSnapshot = PluginManifestRegistry.get(id);

        let prepared = false;
        try {
            // Phase 1: Prepare & Record Journal Undo States
            journal.record('DELETE_WRAPPER', { id }, { wrapper: wrapperSnapshot });
            registryPluginsMap.delete(id);

            journal.record('DELETE_MANIFEST', { id }, { manifest: manifestSnapshot });
            PluginManifestRegistry.remove(id);

            journal.record('EVICT_CACHE', { id }, {});
            PluginLoader.evict(id);

            journal.commit();
        } catch (prepErr) {
            journal.rollback();
            Core.Logger.error(`Transaction prepare failed for '${id}', replaying journal undo: ${prepErr.message}`);

            const undoSteps = journal.getUndoActions();
            for (const step of undoSteps) {
                if (step.action === 'DELETE_MANIFEST' && step.undoPayload?.manifest) {
                    await PluginManifestRegistry.registerAsync(step.undoPayload.manifest).catch(() => {});
                }
                if (step.action === 'DELETE_WRAPPER' && step.undoPayload?.wrapper) {
                    registryPluginsMap.set(id, step.undoPayload.wrapper);
                }
            }
            PluginDependencyGraphRegistry.invalidate();
            throw prepErr;
        }

        // Phase 2: Commit & Deferred Side-Effects via Bounded Disposal Queue
        await DisposalQueue.enqueue(wrapperSnapshot);
    }
}
/**
 * TOPCARE AI PLATFORM V2 — ENHANCED CONTEXT REGISTRY (AC-023 REFINEMENTS)
 * Path: assets/js/core/context/context.registry.js
 * Status: ACTIVE (BUILD AC-023 REFINED - LOCKED GOLDEN BASELINE)
 */

import { DETERMINISTIC_PROVIDER_ORDER, CONTEXT_EVENT_TYPES, CONTEXT_SCHEMA_VERSION } from './context.catalog.js';
import ContextProviderInterface from './context.provider.interface.js';
import ContextSnapshotBuilder from './context.snapshot.builder.js';
import { createContextRegistryStatisticsDTO } from './runtime.context.dto.js';
import TimeProvider from '../time/time.provider.js';
import EventFactory from '../events/event.factory.js';
import EVENT_SOURCES from '../events/event.sources.js';
import { deepFreezeDTO } from '../utils/dto.js';

/**
 * Computes a deterministic string hash for snapshot payload deduplication & replay.
 * @param {Object} obj
 * @returns {string}
 */
function computeDeterministicHash(obj) {
    const str = JSON.stringify(obj || {});
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return `hash_${Math.abs(hash).toString(36)}`;
}

export const ContextRegistry = Object.freeze({
    create(options = {}) {
        const timeSource = options.timeProvider || TimeProvider;
        const bus = options.eventBus || null;

        const registeredProviders = new Map();
        const providerVersions = new Map(); // Version-aware cache tracking
        const nodeCache = new Map();
        const dirtyKeys = new Set();

        let currentContextVersion = 0;
        let latestSnapshot = null;

        if (Array.isArray(options.providers)) {
            for (const p of options.providers) {
                registerProvider(p);
            }
        }

        function registerProvider(provider) {
            ContextProviderInterface.validateContract(provider);
            const key = String(provider.key).toUpperCase().trim();

            // Validate declared provider dependencies
            if (Array.isArray(provider.dependencies)) {
                for (const depKey of provider.dependencies) {
                    const upperDep = String(depKey).toUpperCase().trim();
                    if (!registeredProviders.has(upperDep) && !DETERMINISTIC_PROVIDER_ORDER.includes(upperDep)) {
                        console.warn(`[ContextRegistry] Provider "${key}" declares dependency "${upperDep}" which is not yet registered.`);
                    }
                }
            }

            registeredProviders.set(key, provider);
            providerVersions.set(key, (providerVersions.get(key) || 0) + 1);
            dirtyKeys.add(key);
        }

        function markDirty(providerKey) {
            const key = String(providerKey).toUpperCase().trim();
            if (registeredProviders.has(key)) {
                dirtyKeys.add(key);
                providerVersions.set(key, (providerVersions.get(key) || 0) + 1);
            }
        }

        function assembleSnapshot() {
            const startTime = timeSource.now();
            let providerExecMs = 0;
            let cacheHitCount = 0;
            let cacheMissCount = 0;

            const assembledNodes = {};

            for (const key of DETERMINISTIC_PROVIDER_ORDER) {
                const provider = registeredProviders.get(key);

                if (!provider) {
                    assembledNodes[key.toLowerCase()] = null;
                    continue;
                }

                if (!dirtyKeys.has(key) && nodeCache.has(key)) {
                    assembledNodes[key.toLowerCase()] = nodeCache.get(key);
                    cacheHitCount += 1;
                } else {
                    const pStart = timeSource.now();
                    const nodeData = provider.provideContext(assembledNodes);
                    providerExecMs += (timeSource.now() - pStart);

                    const frozenNode = deepFreezeDTO(nodeData || {});
                    nodeCache.set(key, frozenNode);
                    assembledNodes[key.toLowerCase()] = frozenNode;

                    dirtyKeys.delete(key);
                    cacheMissCount += 1;
                }
            }

            currentContextVersion += 1;

            const baseSnapshot = ContextSnapshotBuilder.build({
                nodes: assembledNodes,
                contextVersion: currentContextVersion,
                timeProvider: timeSource
            });

            // Compute Snapshot Fingerprint Hash
            const snapshotHash = computeDeterministicHash(baseSnapshot.nodes);

            latestSnapshot = deepFreezeDTO({
                ...baseSnapshot,
                snapshotHash
            });

            const totalBuildMs = timeSource.now() - startTime;

            if (bus && typeof bus.publish === 'function') {
                const eventDTO = EventFactory.createCustom(
                    CONTEXT_EVENT_TYPES.SYSTEM.CONTEXT_SNAPSHOT_CREATED,
                    EVENT_SOURCES.COACH_RUNTIME,
                    {
                        snapshotId: latestSnapshot.snapshotId,
                        contextVersion: latestSnapshot.contextVersion,
                        snapshotHash
                    }
                );
                bus.publish(eventDTO);
            }

            return {
                snapshot: latestSnapshot,
                statistics: createContextRegistryStatisticsDTO({
                    providerCount: registeredProviders.size,
                    providerExecutionMs: providerExecMs,
                    snapshotBuildMs: totalBuildMs,
                    cacheHit: cacheHitCount,
                    cacheMiss: cacheMissCount
                })
            };
        }

        function getSnapshot() {
            if (!latestSnapshot || dirtyKeys.size > 0) {
                return assembleSnapshot().snapshot;
            }
            return latestSnapshot;
        }

        return Object.freeze({
            registerProvider,
            markDirty,
            assembleSnapshot,
            getSnapshot
        });
    }
});

export default ContextRegistry;

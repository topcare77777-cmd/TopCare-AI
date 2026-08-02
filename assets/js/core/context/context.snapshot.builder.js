/**
 * TOPCARE AI PLATFORM V2 — PURE SNAPSHOT BUILDER
 * Path: assets/js/core/context/context.snapshot.builder.js
 * Status: ACTIVE (BUILD AC-023 - LOCKED GOLDEN BASELINE)
 * Role: Pure Function Assembling Context Snapshot DTO from Nodes
 */

import { createRuntimeContextSnapshotDTO } from './runtime.context.dto.js';
import ContextValidator from './context.validator.js';
import TimeProvider from '../time/time.provider.js';

export const ContextSnapshotBuilder = Object.freeze({
    /**
     * Assembles and deep-freezes a new RuntimeContextSnapshotDTO.
     * Pure Function: Zero side-effects.
     *
     * @param {Object} params
     * @param {Object} params.nodes - Object containing node payloads per provider key.
     * @param {number} params.contextVersion - Incremental version integer.
     * @param {Object} [params.timeProvider] - Injectable TimeProvider.
     * @returns {Object} Deep-frozen RuntimeContextSnapshotDTO.
     */
    build({ nodes = {}, contextVersion = 1, timeProvider = TimeProvider }) {
        ContextValidator.validateNodes(nodes);

        const snapshot = createRuntimeContextSnapshotDTO({
            contextVersion,
            nodes,
            timeProvider
        });

        ContextValidator.validateSnapshot(snapshot);

        return snapshot;
    }
});

export default ContextSnapshotBuilder;

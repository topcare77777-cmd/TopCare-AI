/**
 * TOPCARE AI PLATFORM V2 — PIPELINE EXECUTION CONTEXT
 * Path: assets/js/core/pipeline/pipeline.execution.context.js
 * Status: ACTIVE (BUILD AC-024 - LOCKED GOLDEN BASELINE)
 * Role: Holds Immutable RuntimeContextSnapshotDTO & Isolated Working Workspace Data
 */

import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export class PipelineExecutionContext {
    /**
     * @param {Object} snapshotDTO - Immutable RuntimeContextSnapshotDTO
     * @param {string} userMessageText - Input message text
     */
    constructor(snapshotDTO, userMessageText = '') {
        if (!snapshotDTO || !snapshotDTO.snapshotId) {
            throw new Error('[PipelineExecutionContext] Valid RuntimeContextSnapshotDTO is required.');
        }

        this.schemaVersion = '2.0.0';
        this.executionId = `exec_${TimeProvider.now().toString(36)}`;
        this.snapshotDTO = snapshotDTO; // Immutable snapshot reference
        this.userMessageText = String(userMessageText);

        // Isolated Mutable Working Space for Steps
        this.workingData = {
            inputSafetyDecision: null,
            capabilityResolution: null,
            ruleDecisions: null,
            strategyResult: null,
            llmResponseText: null,
            outputSafetyDecision: null,
            memoryCommitStatus: null
        };

        this.stepResults = [];
        this.isTerminated = false;
        this.terminationReason = null;
        this.startedAt = TimeProvider.iso();
    }

    /**
     * Sets working data attribute safely.
     */
    setWorkingData(key, value) {
        if (this.isTerminated) return;
        this.workingData[key] = value;
    }

    /**
     * Terminate pipeline execution early (Short-Circuit).
     */
    terminate(reason = 'Short-circuit triggered.') {
        this.isTerminated = true;
        this.terminationReason = String(reason);
    }

    /**
     * Records an executed step result DTO.
     */
    recordStepResult(stepResultDTO) {
        this.stepResults.push(stepResultDTO);
    }

    /**
     * Creates immutable Execution Context Snapshot DTO.
     */
    toSnapshotDTO() {
        return deepFreezeDTO({
            schemaVersion: this.schemaVersion,
            executionId: this.executionId,
            snapshotId: this.snapshotDTO.snapshotId,
            snapshotHash: this.snapshotDTO.snapshotHash || 'N/A',
            userMessageText: this.userMessageText,
            isTerminated: this.isTerminated,
            terminationReason: this.terminationReason,
            workingData: deepFreezeDTO({ ...this.workingData }),
            stepResults: Object.freeze([...this.stepResults]),
            startedAt: this.startedAt,
            finishedAt: TimeProvider.iso()
        });
    }
}

export default PipelineExecutionContext;

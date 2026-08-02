/**
 * TOPCARE AI PLATFORM V2 — ENTERPRISE PIPELINE ORCHESTRATOR KERNEL
 * Path: assets/js/services/pipeline/pipeline.orchestrator.js
 * Status: ACTIVE (BUILD AC-024 - LOCKED GOLDEN BASELINE)
 * Role: Pure Async-Agnostic Kernel Orchestrator Executing Steps via Context & Manifest
 */

import PipelineExecutionContext from '../../core/pipeline/pipeline.execution.context.js';
import PipelineRegistry from '../../core/pipeline/pipeline.registry.js';
import { createPipelineStepResultDTO, STEP_STATUS } from '../../core/pipeline/pipeline.step.interface.js';
import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const PipelineOrchestrator = Object.freeze({
    /**
     * Executes pipeline sequentially over supplied RuntimeContextSnapshotDTO.
     * Pure Kernel Runner: 0 domain knowledge of Coach, LLM vendors, or Memory.
     *
     * @param {Object} contextSnapshotDTO - Immutable RuntimeContextSnapshotDTO from ContextRegistry
     * @param {string} userMessageText - User prompt input
     * @returns {Promise<Object>} Immutable Pipeline Execution Snapshot & Statistics
     */
    async execute(contextSnapshotDTO, userMessageText = '') {
        const startTime = TimeProvider.now();
        const execContext = new PipelineExecutionContext(contextSnapshotDTO, userMessageText);
        const steps = PipelineRegistry.getSteps();

        let executedCount = 0;
        let skippedCount = 0;
        let terminatedCount = 0;

        for (const step of steps) {
            // Short-circuit check: Stop execution if context is terminated
            if (execContext.isTerminated) {
                const skippedResult = createPipelineStepResultDTO({
                    stepId: step.stepId,
                    status: STEP_STATUS.SKIPPED,
                    durationMs: 0,
                    warnings: [`Skipped due to pipeline termination: ${execContext.terminationReason}`]
                });
                execContext.recordStepResult(skippedResult);
                skippedCount += 1;
                continue;
            }

            const stepStart = TimeProvider.now();
            try {
                // Async-Agnostic Execution Contract
                const stepOutput = await Promise.resolve(step.execute(execContext));
                const stepDuration = TimeProvider.now() - stepStart;

                let status = STEP_STATUS.SUCCESS;
                if (execContext.isTerminated) {
                    status = STEP_STATUS.TERMINATED;
                    terminatedCount += 1;
                }

                const resultDTO = createPipelineStepResultDTO({
                    stepId: step.stepId,
                    status,
                    durationMs: stepDuration,
                    output: stepOutput || {},
                    diagnostics: { executedAt: TimeProvider.iso() }
                });

                execContext.recordStepResult(resultDTO);
                executedCount += 1;

            } catch (err) {
                const stepDuration = TimeProvider.now() - stepStart;
                console.error(`[PipelineOrchestrator] Step "${step.stepId}" failed:`, err);

                const failedResult = createPipelineStepResultDTO({
                    stepId: step.stepId,
                    status: STEP_STATUS.FAILED,
                    durationMs: stepDuration,
                    warnings: [err.message]
                });

                execContext.recordStepResult(failedResult);
                execContext.terminate(`Fatal error in step "${step.stepId}": ${err.message}`);
                terminatedCount += 1;
            }
        }

        const totalDurationMs = TimeProvider.now() - startTime;
        const finalContextSnapshot = execContext.toSnapshotDTO();

        const statisticsDTO = deepFreezeDTO({
            schemaVersion: '2.0.0',
            totalSteps: steps.length,
            executedSteps: executedCount,
            skippedSteps: skippedCount,
            terminatedSteps: terminatedCount,
            totalDurationMs,
            snapshotHash: contextSnapshotDTO.snapshotHash || 'N/A'
        });

        return deepFreezeDTO({
            executionSnapshot: finalContextSnapshot,
            statistics: statisticsDTO
        });
    }
});

export default PipelineOrchestrator;

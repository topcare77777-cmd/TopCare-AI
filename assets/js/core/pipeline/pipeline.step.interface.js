/**
 * TOPCARE AI PLATFORM V2 — PIPELINE STEP INTERFACE CONTRACT & STEP RESULT DTO
 * Path: assets/js/core/pipeline/pipeline.step.interface.js & pipeline.step.result.dto.js
 * Status: ACTIVE (BUILD AC-024 - LOCKED GOLDEN BASELINE)
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const PIPELINE_SCHEMA_VERSION = '2.0.0';

export const STEP_STATUS = deepFreezeDTO({
    SUCCESS: 'SUCCESS',
    SKIPPED: 'SKIPPED',
    FAILED: 'FAILED',
    TERMINATED: 'TERMINATED'
});

export const PipelineStepInterface = Object.freeze({
    validateContract(stepInstance) {
        if (!stepInstance || typeof stepInstance !== 'object') {
            throw new Error('[PipelineStepInterface] Step instance must be an object.');
        }
        if (!stepInstance.stepId || typeof stepInstance.stepId !== 'string') {
            throw new Error('[PipelineStepInterface] Step instance must specify a non-empty string "stepId".');
        }
        if (typeof stepInstance.execute !== 'function') {
            throw new Error(`[PipelineStepInterface] Step "${stepInstance.stepId}" must implement execute(executionContext).`);
        }
        return true;
    }
});

export function createPipelineStepResultDTO({
    stepId,
    status = STEP_STATUS.SUCCESS,
    durationMs = 0,
    output = {},
    diagnostics = {},
    warnings = []
}) {
    return deepFreezeDTO({
        schemaVersion: PIPELINE_SCHEMA_VERSION,
        stepId: String(stepId),
        status: STEP_STATUS[status] || STEP_STATUS.SUCCESS,
        durationMs: Number(durationMs),
        output: deepFreezeDTO({ ...output }),
        diagnostics: deepFreezeDTO({ ...diagnostics }),
        warnings: Object.freeze([...warnings])
    });
}

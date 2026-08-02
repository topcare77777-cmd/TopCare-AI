/**
 * TOPCARE AI PLATFORM V2 — PURE CAPABILITY EXECUTOR & SDK INTERFACE
 * Path: assets/js/services/capability/capability.executor.js & capability.sdk.js
 * Status: ACTIVE (SPRINT A - LOCKED GOLDEN BASELINE)
 */

import { createCapabilityResultDTO, CAPABILITY_STATUS } from '../../core/capability/capability.manifest.dto.js';
import CapabilityPermissionGuard from './capability.permission.guard.js';
import PipelineOrchestrator from '../pipeline/pipeline.orchestrator.js';
import TimeProvider from '../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const CapabilitySDK = Object.freeze({
    /**
     * Interface for Capability Implementation Handlers.
     */
    validateHandlerContract(handler) {
        if (!handler || typeof handler.execute !== 'function') {
            throw new Error('[CapabilitySDK] Capability handler must implement execute(inputs, contextDTO).');
        }
        return true;
    }
});

export const CapabilityExecutor = Object.freeze({
    /**
     * Pure Execution Flow: Load -> Validate Permissions -> Validate Inputs -> Invoke Pipeline -> Collect Result -> Return DTO
     *
     * @param {Object} manifestDTO - Target CapabilityManifestDTO
     * @param {Object} inputs - Raw input parameter payload
     * @param {Object} contextSnapshotDTO - Immutable RuntimeContextSnapshotDTO
     * @param {Object} handlerInstance - Implementation handler conforming to CapabilitySDK
     * @param {Array<string>} grantedScope - Granted permission tokens
     * @returns {Promise<Object>} Immutable CapabilityResultDTO
     */
    async executeCapability(manifestDTO, inputs = {}, contextSnapshotDTO, handlerInstance, grantedScope = []) {
        const startTime = TimeProvider.now();

        // 1. Validate Permission
        const permCheck = CapabilityPermissionGuard.verifyPermissions(manifestDTO, grantedScope);
        if (!permCheck.isAllowed) {
            return createCapabilityResultDTO({
                capabilityId: manifestDTO.id,
                status: CAPABILITY_STATUS.PERMISSION_DENIED,
                warnings: [`Capability execution blocked: Missing permissions (${permCheck.missingPermissions.join(', ')})`]
            });
        }

        // 2. Validate Inputs Required Fields
        const missingInputs = [];
        for (const inputKey of Object.keys(manifestDTO.inputs || {})) {
            if (manifestDTO.inputs[inputKey].required && (inputs[inputKey] === undefined || inputs[inputKey] === null)) {
                missingInputs.push(inputKey);
            }
        }
        if (missingInputs.length > 0) {
            return createCapabilityResultDTO({
                capabilityId: manifestDTO.id,
                status: CAPABILITY_STATUS.INVALID_INPUT,
                warnings: [`Missing required input parameters: ${missingInputs.join(', ')}`]
            });
        }

        try {
            // 3. Execute Pipeline Kernel
            const pipelineExecution = await PipelineOrchestrator.execute(contextSnapshotDTO, inputs.userPrompt || '');

            // 4. Invoke Capability Handler
            CapabilitySDK.validateHandlerContract(handlerInstance);
            const handlerOutput = await Promise.resolve(handlerInstance.execute(inputs, contextSnapshotDTO, pipelineExecution));

            const durationMs = TimeProvider.now() - startTime;

            return createCapabilityResultDTO({
                capabilityId: manifestDTO.id,
                status: CAPABILITY_STATUS.SUCCESS,
                outputs: handlerOutput.outputs || {},
                artifacts: handlerOutput.artifacts || [],
                metrics: { durationMs, pipelineSteps: pipelineExecution.statistics.executedSteps },
                diagnostics: { snapshotHash: contextSnapshotDTO.snapshotHash }
            });

        } catch (err) {
            return createCapabilityResultDTO({
                capabilityId: manifestDTO.id,
                status: CAPABILITY_STATUS.FAILED,
                warnings: [err.message]
            });
        }
    }
});

export default CapabilityExecutor;

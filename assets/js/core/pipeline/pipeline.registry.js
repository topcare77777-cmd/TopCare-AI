/**
 * TOPCARE AI PLATFORM V2 — INSTANTIABLE PIPELINE REGISTRY FACTORY
 * Path: assets/js/core/pipeline/pipeline.registry.js
 * Status: ACTIVE (BUILD AC-024 REFINED / AC-025 - LOCKED GOLDEN BASELINE)
 * Role: Instantiable Pipeline Registry Supporting Multi-Runtime Isolation & Plugin Hooks
 */

import { PipelineStepInterface } from './pipeline.step.interface.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const PipelineRegistry = Object.freeze({
    /**
     * Creates an isolated PipelineRegistry instance for a specific runtime instance.
     * @param {Object} [options]
     * @param {Object} [options.manifest] - Loaded pipeline.manifest.json
     * @returns {Object} Isolated PipelineRegistry Instance API.
     */
    create(options = {}) {
        /** @type {Array<Object>} Registered Steps in Execution Order */
        const registeredSteps = [];

        function register(stepInstance) {
            PipelineStepInterface.validateContract(stepInstance);
            const existingIdx = registeredSteps.findIndex(s => s.stepId === stepInstance.stepId);
            if (existingIdx >= 0) {
                registeredSteps[existingIdx] = stepInstance;
            } else {
                registeredSteps.push(stepInstance);
            }
        }

        function insertAfter(targetStepId, stepInstance) {
            PipelineStepInterface.validateContract(stepInstance);
            const idx = registeredSteps.findIndex(s => s.stepId === targetStepId);
            if (idx >= 0) {
                registeredSteps.splice(idx + 1, 0, stepInstance);
            } else {
                registeredSteps.push(stepInstance);
            }
        }

        function insertBefore(targetStepId, stepInstance) {
            PipelineStepInterface.validateContract(stepInstance);
            const idx = registeredSteps.findIndex(s => s.stepId === targetStepId);
            if (idx >= 0) {
                registeredSteps.splice(idx, 0, stepInstance);
            } else {
                registeredSteps.unshift(stepInstance);
            }
        }

        function replace(targetStepId, stepInstance) {
            PipelineStepInterface.validateContract(stepInstance);
            const idx = registeredSteps.findIndex(s => s.stepId === targetStepId);
            if (idx >= 0) {
                registeredSteps[idx] = stepInstance;
            } else {
                registeredSteps.push(stepInstance);
            }
        }

        function getSteps() {
            return deepFreezeDTO([...registeredSteps]);
        }

        function clear() {
            registeredSteps.length = 0;
        }

        return Object.freeze({
            register,
            insertAfter,
            insertBefore,
            replace,
            getSteps,
            clear
        });
    }
});

export default PipelineRegistry;

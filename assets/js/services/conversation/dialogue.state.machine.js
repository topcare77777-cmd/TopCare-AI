/**
 * TOPCARE AI PLATFORM V2 — DIALOGUE STATE MACHINE
 * Path: assets/js/services/conversation/dialogue.state.machine.js
 * Status: ACTIVE (SPRINT B - LOCKED GOLDEN BASELINE)
 * Role: Manages Multi-Turn State Transitions & Missing Entity Clarification Loops
 */

import { createDialogueStateDTO, DIALOGUE_ACTIONS } from '../../core/conversation/dialogue.state.dto.js';

export const DialogueStateMachine = Object.freeze({
    /**
     * Transitions state based on incoming intent, extracted entities, and target capability manifest.
     * Pure Function: Zero side-effects.
     */
    transitionState({
        previousState = null,
        conversationId,
        recognizedIntent,
        extractedEntities = {},
        targetCapabilityManifest = null
    }) {
        const existingEntities = previousState ? previousState.collectedEntities : {};
        const mergedEntities = { ...existingEntities, ...extractedEntities };

        let missingEntities = [];
        let nextAction = DIALOGUE_ACTIONS.EXECUTE_CAPABILITY;
        let clarificationRequired = false;

        if (targetCapabilityManifest && targetCapabilityManifest.inputs) {
            const inputsSchema = targetCapabilityManifest.inputs;
            for (const inputKey of Object.keys(inputsSchema)) {
                if (inputsSchema[inputKey].required && (mergedEntities[inputKey] === undefined || mergedEntities[inputKey] === null)) {
                    missingEntities.push(inputKey);
                }
            }
        }

        if (missingEntities.length > 0) {
            clarificationRequired = true;
            nextAction = DIALOGUE_ACTIONS.CLARIFY;
        }

        return createDialogueStateDTO({
            conversationId: conversationId || `conv_${Date.now().toString(36)}`,
            activeIntent: recognizedIntent,
            currentCapabilityId: targetCapabilityManifest ? targetCapabilityManifest.id : null,
            clarificationRequired,
            missingEntities,
            collectedEntities: mergedEntities,
            nextAction
        });
    }
});

export default DialogueStateMachine;

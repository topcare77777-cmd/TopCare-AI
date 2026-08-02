/**
 * TOPCARE AI PLATFORM V2 — CONVERSATION ENGINE ORCHESTRATOR
 * Path: assets/js/services/conversation/conversation.orchestrator.js
 * Status: ACTIVE (SPRINT B - LOCKED GOLDEN BASELINE)
 * Role: Executes Full Conversation Pipeline (Intent -> Entities -> State -> Capability -> Composer)
 */

import { IntentRecognition } from './intent.recognition.js';
import { EntityExtraction } from './entity.extraction.js';
import DialogueStateMachine from './dialogue.state.machine.js';
import CapabilityResolver from '../capability/capability.resolver.js';
import CapabilityExecutor from '../capability/capability.executor.js';
import CapabilityRegistry from '../../core/capability/capability.registry.js';
import { createResponseModelDTO } from '../../core/conversation/response.model.dto.js';
import ResponseComposer from './response.composer.js';
import { DIALOGUE_ACTIONS } from '../../core/conversation/dialogue.state.dto.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

export const ConversationOrchestrator = Object.freeze({
    /**
     * Processes user conversation input end-to-end.
     */
    async processMessage({
        conversationId,
        userMessageText,
        contextSnapshotDTO,
        previousDialogueState = null,
        grantedScope = ['*'],
        capabilityHandlers = {}
    }) {
        // Node 1: Intent Recognition
        const intentResult = IntentRecognition.recognizeIntent(userMessageText);

        // Node 2: Entity Extraction
        const extractedEntities = EntityExtraction.extractEntities(userMessageText);

        // Node 3: Capability Resolution
        const resolution = CapabilityResolver.resolveIntent(intentResult.intent, grantedScope);
        const targetCapability = resolution.selectedCapability;

        // Node 4: Dialogue State Machine Transition
        const dialogueState = DialogueStateMachine.transitionState({
            previousState: previousDialogueState,
            conversationId,
            recognizedIntent: intentResult.intent,
            extractedEntities,
            targetCapabilityManifest: targetCapability
        });

        // Node 5 & 6: Clarification or Capability Execution
        let responseModel = null;

        if (dialogueState.nextAction === DIALOGUE_ACTIONS.CLARIFY) {
            responseModel = createResponseModelDTO({
                conversationId,
                rawContent: `To proceed with ${targetCapability.displayName}, please specify: ${dialogueState.missingEntities.join(', ')}.`,
                uiWidgetHint: 'clarification-prompt-widget'
            });
        } else if (targetCapability) {
            const handler = capabilityHandlers[targetCapability.id];
            const execResult = await CapabilityExecutor.executeCapability(
                targetCapability,
                dialogueState.collectedEntities,
                contextSnapshotDTO,
                handler,
                grantedScope
            );

            responseModel = createResponseModelDTO({
                conversationId,
                rawContent: JSON.stringify(execResult.outputs),
                uiWidgetHint: targetCapability.uiMetadata.outputWidget
            });
        } else {
            responseModel = createResponseModelDTO({
                conversationId,
                rawContent: "I'm here to assist you. Could you please specify your goal?",
                uiWidgetHint: 'standard-card'
            });
        }

        // Node 7: Response Composer
        const finalResponse = ResponseComposer.composeResponse(responseModel, contextSnapshotDTO);

        return deepFreezeDTO({
            dialogueState,
            resolution,
            finalResponse
        });
    }
});

export default ConversationOrchestrator;

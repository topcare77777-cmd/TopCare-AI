/**
 * TOPCARE AI PLATFORM V2 — CONVERSATION ENGINE ORCHESTRATOR
 * Path: assets/js/services/conversation/conversation.orchestrator.js
 * Status: ACTIVE (BUILD 125.2 — CONVERSATIONAL VS ACTION PLAN PIPELINE)
 * Role: Orchestrates full conversation flow with natural language coach persona & dynamic mode handling.
 */

import { IntentRecognition } from './intent.recognition.js';
import { EntityExtraction } from './entity.extraction.js';
import DialogueStateMachine from './dialogue.state.machine.js';
import CapabilityResolver from '../capability/capability.resolver.js';
import CapabilityExecutor from '../capability/capability.executor.js';
import CapabilityHandlerRegistry from '../../core/capability/capability.handler.registry.js';
import { createResponseModelDTO } from '../../core/conversation/response.model.dto.js';
import ResponseComposer from './response.composer.js';
import { DIALOGUE_ACTIONS } from '../../core/conversation/dialogue.state.dto.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';
import CoachContext from '../../runtime/coach.context.js';

export const ConversationOrchestrator = Object.freeze({

    _ensureDefaultHandlersRegistered() {
        if (typeof CapabilityHandlerRegistry.has === 'function' && !CapabilityHandlerRegistry.has('default-general-capability')) {
            const defaultHandler = Object.freeze({
                async execute(inputs, contextDTO, pipelineExecution) {
                    return {
                        outputs: {
                            message: "Halo! Saya siap mendampingi dan berdiskusi mengenai kesehatan serta target Anda.",
                            status: "SUCCESS"
                        }
                    };
                }
            });

            if (typeof CapabilityHandlerRegistry.register === 'function') {
                CapabilityHandlerRegistry.register('default-general-capability', defaultHandler);
                CapabilityHandlerRegistry.register('general.chat', defaultHandler);
                CapabilityHandlerRegistry.register('health.inquiry', defaultHandler);
                CapabilityHandlerRegistry.register('wellness.guidance', defaultHandler);
                CapabilityHandlerRegistry.register('strategic.planning', defaultHandler);
            }
        }
    },

    /**
     * Generates natural language responses according to coach persona and user intent.
     * @private
     */
    _generateConversationalResponse(query, coachProfile, intent) {
        const text = String(query || '').toLowerCase().trim();
        const isMaya = coachProfile.id === 'maya';

        // 1. Greeting & Small Talk
        if (text.match(/^(hi|hello|halo|hai|pagi|siang|malam|ping|test|tes|spada|oi)/i) || text.includes('siapa kamu')) {
            if (isMaya) {
                return `Halo! Saya Coach Maya. Saya di sini untuk mendengarkan, mendampingi emosional, dan membantu menjaga kesehatan mental serta tubuh Anda secara holistik. Apa yang sedang Anda rasakan atau butuhkan hari ini?`;
            } else {
                return `Halo! Saya Coach Alex. Saya siap membantu Anda menganalisis target kesehatan dan menyusun langkah klinis yang terstruktur. Apa fokus atau pertanyaan utama Anda hari ini?`;
            }
        }

        // 2. Expression of Thanks
        if (text.match(/(terima kasih|makasih|thanks|thank you|ok|oke|baik|siap)/i)) {
            if (isMaya) {
                return `Sama-sama! Selalu ingat untuk menjaga kesehatan dan beristirahat yang cukup. Ada hal lain yang ingin Anda ceritakan?`;
            } else {
                return `Sama-sama. Tetap konsisten dengan target Anda. Hubungi saya kapan saja jika Anda membutuhkan analisis atau penyesuaian strategi berikutnya.`;
            }
        }

        // 3. Conversational Guidance (Default)
        if (isMaya) {
            return `Saya memahami perhatian Anda mengenai "${query}". Pendekatan holistik sangat penting untuk menjaga keseimbangan tubuh dan pikiran. Bagaimana perasaan Anda atau kendala apa yang paling terasa saat ini?`;
        } else {
            return `Mengenai "${query}", mari kita lihat dari sudut pandang taktis dan klinis. Apakah Anda ingin kita bedah faktor utamanya atau menyusun jadwal aksi terstruktur?`;
        }
    },

    /**
     * Checks if user explicitly requests an Action Plan / Roadmap / Schedule.
     * @private
     */
    _isExplicitActionPlanRequest(query) {
        const text = String(query || '').toLowerCase();
        return Boolean(text.match(/(action plan|rencana aksi|roadmap|jadwal|checklist|sprint|planning|langkah-langkah|buatkan rencana|target mingguan)/i));
    },

    /**
     * Formats clean output string.
     * @private
     */
    _formatRawContent(rawOutputs, userQuery = '', coachProfile = {}, intent = 'GENERAL_CHAT') {
        if (!rawOutputs) {
            return this._generateConversationalResponse(userQuery, coachProfile, intent);
        }

        if (typeof rawOutputs === 'string') {
            const trimmed = rawOutputs.trim();
            if (trimmed && trimmed !== '{}' && trimmed !== '[object Object]') {
                return trimmed;
            }
        }

        if (typeof rawOutputs === 'object') {
            if (rawOutputs.message && String(rawOutputs.message).trim()) return String(rawOutputs.message);
            if (rawOutputs.text && String(rawOutputs.text).trim()) return String(rawOutputs.text);
            if (rawOutputs.content && String(rawOutputs.content).trim()) return String(rawOutputs.content);
            if (rawOutputs.summary && String(rawOutputs.summary).trim()) return String(rawOutputs.summary);

            if (rawOutputs.outputs && typeof rawOutputs.outputs === 'object') {
                return this._formatRawContent(rawOutputs.outputs, userQuery, coachProfile, intent);
            }
        }

        return this._generateConversationalResponse(userQuery, coachProfile, intent);
    },

    async processMessage({
        conversationId,
        userMessageText,
        contextSnapshotDTO = {},
        previousDialogueState = null,
        grantedScope = ['*']
    }) {
        this._ensureDefaultHandlersRegistered();

        // 1. Resolve Active Coach Profile Context
        const coachProfile = (CoachContext && typeof CoachContext.getCoachProfile === 'function')
            ? CoachContext.getCoachProfile()
            : { id: 'maya', displayName: 'AI Coach', personaId: 'coach-sarah', summaryStyle: 'reflective_narrative', emojiPolicy: 'expressive' };

        // Node 1: Intent Recognition
        const intentResult = (IntentRecognition && typeof IntentRecognition.recognizeIntent === 'function')
            ? IntentRecognition.recognizeIntent(userMessageText)
            : { intent: 'GENERAL_CHAT' };

        // Check if explicit Action Plan requested by user
        const isExplicitActionPlan = this._isExplicitActionPlanRequest(userMessageText);

        // Node 2: Entity Extraction
        const extractedEntities = (EntityExtraction && typeof EntityExtraction.extractEntities === 'function')
            ? EntityExtraction.extractEntities(userMessageText)
            : {};

        // Node 3: Capability Resolution
        const resolvedIntentName = isExplicitActionPlan ? 'STRATEGIC_PLANNING' : (intentResult ? intentResult.intent : 'GENERAL_CHAT');
        const resolution = CapabilityResolver.resolveIntent(resolvedIntentName, grantedScope);
        const targetCapability = resolution.selectedCapability;

        // Node 4: Dialogue State Machine Transition
        const dialogueState = (DialogueStateMachine && typeof DialogueStateMachine.transitionState === 'function')
            ? DialogueStateMachine.transitionState({
                previousState: previousDialogueState,
                conversationId,
                recognizedIntent: resolvedIntentName,
                extractedEntities,
                targetCapabilityManifest: targetCapability
            })
            : { nextAction: DIALOGUE_ACTIONS.EXECUTE_CAPABILITY, collectedEntities: extractedEntities };

        // Node 5 & 6: Execution
        let responseModel = null;

        if (dialogueState && dialogueState.nextAction === DIALOGUE_ACTIONS.CLARIFY) {
            const missingText = Array.isArray(dialogueState.missingEntities) ? dialogueState.missingEntities.join(', ') : 'informasi tambahan';
            responseModel = createResponseModelDTO({
                conversationId,
                rawContent: `Mohon lengkapi informasi berikut untuk melanjutkan: ${missingText}.`,
                uiWidgetHint: 'clarification-prompt-widget'
            });
        } else {
            let handler = (targetCapability && typeof CapabilityHandlerRegistry.get === 'function')
                ? CapabilityHandlerRegistry.get(targetCapability.id)
                : null;

            if (!handler && typeof CapabilityHandlerRegistry.get === 'function') {
                handler = CapabilityHandlerRegistry.get('general.chat') || CapabilityHandlerRegistry.get('default-general-capability');
            }

            let execOutputs = null;

            if (CapabilityExecutor && typeof CapabilityExecutor.executeCapability === 'function' && targetCapability) {
                try {
                    const execResult = await CapabilityExecutor.executeCapability(
                        targetCapability,
                        dialogueState ? dialogueState.collectedEntities : {},
                        contextSnapshotDTO,
                        handler,
                        grantedScope
                    );
                    execOutputs = execResult ? execResult.outputs : null;
                } catch (err) {
                    execOutputs = null;
                }
            } else if (
                handler &&
                typeof handler.execute === 'function'
            ) {
                const rawRes = await handler.execute(dialogueState ? dialogueState.collectedEntities : {}, contextSnapshotDTO);
                execOutputs = rawRes ? rawRes.outputs || rawRes : null;
            }

            const formattedText = this._formatRawContent(execOutputs, userMessageText, coachProfile, resolvedIntentName);

            responseModel = createResponseModelDTO({
                conversationId,
                rawContent: formattedText,
                uiWidgetHint: isExplicitActionPlan ? 'action-plan-card' : ((targetCapability && targetCapability.uiMetadata && targetCapability.uiMetadata.outputWidget) || 'standard-card')
            });
        }

        // Node 7: Response Composer (Apply Conversational or Action Plan Persona)
        const personaContextDTO = {
            personaId: coachProfile.personaId,
            summaryStyle: coachProfile.summaryStyle,
            emojiPolicy: coachProfile.emojiPolicy,
            isExplicitActionPlan
        };

        const finalResponse = (ResponseComposer && typeof ResponseComposer.composeResponse === 'function')
            ? ResponseComposer.composeResponse(responseModel, personaContextDTO)
            : responseModel;

        return deepFreezeDTO({
            dialogueState,
            resolution,
            finalResponse
        });
    }
});

export default ConversationOrchestrator;
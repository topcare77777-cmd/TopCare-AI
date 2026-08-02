/**
 * TOPCARE AI PLATFORM V2 — BIDIRECTIONAL SAFETY GUARDRAILS
 * Path: assets/js/services/safety/input.safety.guard.js & output.safety.guard.js
 * Status: ACTIVE (BUILD AC-021 Phase 2 - LOCKED GOLDEN BASELINE)
 */

import SafetyEngineFacade from './safety.engine.facade.js';
import EventBus from '../../core/events/event.bus.js';
import EventFactory from '../../core/events/event.factory.js';
import EVENT_SOURCES from '../../core/events/event.sources.js';

export const InputSafetyGuard = Object.freeze({
    /**
     * Evaluates raw user input message without mutating original text.
     */
    inspectInput(userMessageText = '', activePolicies = []) {
        const safetyResult = SafetyEngineFacade.evaluate(userMessageText, activePolicies);

        // Emit Passive Event if Blocked or Disclaimer Required
        if (safetyResult.decisionDTO.blocked || safetyResult.decisionDTO.requiresDisclaimer) {
            const eventDTO = EventFactory.createCustom(
                'SYSTEM.SAFETY_VIOLATION',
                EVENT_SOURCES.COACH_RUNTIME,
                { stage: 'INPUT', decision: safetyResult.decisionDTO }
            );
            EventBus.publish(eventDTO);
        }

        return safetyResult;
    }
});

export const OutputSafetyGuard = Object.freeze({
    /**
     * Inspects LLM response before saving to Memory SSOT or rendering to UI.
     */
    inspectOutput(llmResponseText = '', activePolicies = []) {
        const safetyResult = SafetyEngineFacade.evaluate(llmResponseText, activePolicies);

        if (safetyResult.decisionDTO.blocked) {
            const eventDTO = EventFactory.createCustom(
                'SYSTEM.SAFETY_VIOLATION',
                EVENT_SOURCES.LLM_GATEWAY,
                { stage: 'OUTPUT', decision: safetyResult.decisionDTO }
            );
            EventBus.publish(eventDTO);
        }

        return safetyResult;
    }
});

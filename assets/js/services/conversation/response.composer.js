/**
 * TOPCARE AI PLATFORM V2 — REFACTORED RESPONSE COMPOSER & SAMPLE PERSONAS
 * Path: assets/js/services/conversation/response.composer.js & assets/js/services/persona/implementations/
 * Status: ACTIVE (SPRINT C - LOCKED GOLDEN BASELINE)
 */

import PersonaRegistry from '../../../core/persona/persona.registry.js';
import { deepFreezeDTO } from '../../../core/utils/dto.js';

// 1. Sample Persona 1: Coach Kael (Executive & Career Mentor)
export const CoachKaelManifest = PersonaRegistry.register({
    id: 'coach-kael',
    version: '1.0.0',
    displayName: 'Coach Kael (Executive Mentor)',
    description: 'Direct, structured, and goal-oriented executive coach.',
    traits: ['choleric', 'executive', 'action-oriented'],
    communicationStyle: 'direct_structured',
    verbosity: 'concise',
    emojiPolicy: 'minimal',
    preferredCapabilityTags: ['resume', 'career', 'cv', 'leadership'],
    behaviorRules: {
        tone: 'direct',
        confidence: 'very_high',
        empathy: 'moderate',
        explanationDepth: 'moderate',
        summaryStyle: 'action_items',
        formattingStyle: 'markdown'
    }
});

// 2. Sample Persona 2: Coach Sarah (Mental Wellness Coach)
export const CoachSarahManifest = PersonaRegistry.register({
    id: 'coach-sarah',
    version: '1.0.0',
    displayName: 'Coach Sarah (Mental Wellness Mentor)',
    description: 'Warm, highly empathetic, and reflective wellness coach.',
    traits: ['phlegmatic', 'melancholic', 'wellness', 'empathetic'],
    communicationStyle: 'warm_reflective',
    verbosity: 'detailed',
    emojiPolicy: 'expressive',
    preferredCapabilityTags: ['wellness', 'stress', 'mindfulness', 'personality'],
    behaviorRules: {
        tone: 'warm_reflective',
        confidence: 'high',
        empathy: 'very_high',
        explanationDepth: 'deep',
        summaryStyle: 'reflective_narrative',
        formattingStyle: 'markdown'
    }
});

// Lock Persona Registry after sample registration
PersonaRegistry.lock();

// 3. Refactored Pure Response Composer
export const ResponseComposer = Object.freeze({
    /**
     * Formats final response text based on ResponseModelDTO and PersonaContextDTO.
     * Pure Presentation: Zero knowledge of specific Coach IDs or Business Logic.
     */
    composeResponse(responseModelDTO, personaContextDTO) {
        const rawText = responseModelDTO.rawContent;

        let styledText = rawText;

        // Presentation Formatting based purely on PersonaContextDTO
        if (personaContextDTO.summaryStyle === 'action_items') {
            styledText = `🎯 **Action Plan:**\n${rawText}`;
        } else if (personaContextDTO.summaryStyle === 'reflective_narrative') {
            styledText = `🌱 **Reflective Guidance:**\n${rawText}\n\n*Take all the time you need to digest this.*`;
        }

        if (personaContextDTO.emojiPolicy === 'expressive') {
            styledText = `✨ ${styledText} ✨`;
        }

        return deepFreezeDTO({
            conversationId: responseModelDTO.conversationId,
            composedText: styledText,
            uiWidgetHint: responseModelDTO.uiWidgetHint,
            suggestedActions: responseModelDTO.suggestedActions,
            personaApplied: personaContextDTO.personaId
        });
    }
});

export default ResponseComposer;

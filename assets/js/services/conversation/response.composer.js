/**
 * TOPCARE AI PLATFORM V2 — REFACTORED RESPONSE COMPOSER & SAMPLE PERSONAS
 * Path: assets/js/services/conversation/response.composer.js
 * Status: ACTIVE (BUILD 125.2 — CONVERSATIONAL VS ACTION PLAN MODE)
 * Role: Formats final user-facing response with persona styling & mode evaluation.
 */

import PersonaRegistry from '../../core/persona/persona.registry.js';
import { deepFreezeDTO } from '../../core/utils/dto.js';

// 1. Sample Persona 1: Coach Kael (Executive & Career Mentor - Alex)
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

// 2. Sample Persona 2: Coach Sarah (Mental Wellness Coach - Maya)
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

if (typeof PersonaRegistry.lock === 'function') {
    PersonaRegistry.lock();
}

export const ResponseComposer = Object.freeze({
    /**
     * Sanitizes raw content to strictly ensure clean natural language text.
     * @private
     */
    _sanitizeToNaturalLanguage(rawContent) {
        if (!rawContent) {
            return "Halo! Ada yang bisa saya bantu terkait kesehatan atau target Anda hari ini?";
        }

        let text = String(rawContent).trim();

        if (text === '{}' || text === 'null' || text === 'undefined' || text === '[object Object]') {
            return "Halo! Ada yang bisa saya bantu hari ini?";
        }

        if (text.startsWith('{') && text.endsWith('}')) {
            try {
                const parsed = JSON.parse(text);
                if (parsed.message) return String(parsed.message);
                if (parsed.text) return String(parsed.text);
                if (parsed.content) return String(parsed.content);
                if (parsed.summary) return String(parsed.summary);
                return "Tentu, saya siap membantu Anda.";
            } catch (e) {
                return text;
            }
        }

        return text;
    },

    /**
     * Formats final response text based on ResponseModelDTO and PersonaContextDTO.
     * Differentiates between Conversational Mode (Default) and Action Plan Mode (Explicit).
     */
    composeResponse(responseModelDTO, personaContextDTO) {
        const rawText = this._sanitizeToNaturalLanguage(responseModelDTO ? responseModelDTO.rawContent : null);
        const widgetHint = responseModelDTO ? responseModelDTO.uiWidgetHint : 'standard-card';

        let styledText = rawText;

        // Action Plan Mode: Only trigger when widgetHint or explicit flag dictates action-plan
        const isActionPlanMode = widgetHint === 'action-plan-card' ||
            (personaContextDTO && personaContextDTO.isExplicitActionPlan);

        if (isActionPlanMode) {
            styledText = `🎯 **Rencana Aksi:**\n${rawText}`;
        } else if (personaContextDTO && personaContextDTO.summaryStyle === 'reflective_narrative' && widgetHint === 'reflective-card') {
            styledText = `🌱 **Panduan Reflektif:**\n${rawText}\n\n*Ambil waktu sejenak untuk memahami langkah ini.*`;
        }

        if (personaContextDTO && personaContextDTO.emojiPolicy === 'expressive' && !styledText.startsWith('✨')) {
            styledText = `✨ ${styledText} ✨`;
        }

        return deepFreezeDTO({
            conversationId: responseModelDTO ? responseModelDTO.conversationId : `conv_${Date.now()}`,
            composedText: styledText,
            uiWidgetHint: widgetHint,
            suggestedActions: responseModelDTO ? responseModelDTO.suggestedActions : [],
            personaApplied: personaContextDTO ? personaContextDTO.personaId : null
        });
    }
});

export default ResponseComposer;
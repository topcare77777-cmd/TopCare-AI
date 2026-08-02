/**
 * TOPCARE AI PLATFORM V2 — PERSONA MODIFIER ENGINE
 * Path: assets/js/services/persona/persona.modifier.engine.js
 * Status: ACTIVE (SPRINT C - LOCKED GOLDEN BASELINE)
 * Role: Translates Persona Manifest + Dialogue Context into Multi-Dimensional PersonaContextDTO
 */

import { createPersonaContextDTO } from '../../core/persona/persona.context.dto.js';

export const PersonaModifierEngine = Object.freeze({
    /**
     * Generates immutable PersonaContextDTO for ResponseComposer consumption.
     * Pure Function: Zero side-effects.
     */
    generatePersonaContext({ personaManifest, responseModelDTO = null, contextSnapshotDTO = null }) {
        if (!personaManifest) {
            throw new Error('[PersonaModifierEngine] Valid PersonaManifestDTO is required.');
        }

        const rules = personaManifest.behaviorRules || {};
        const userTemperament = contextSnapshotDTO?.nodes?.personality?.primaryType || 'Melancholic';

        // Translate manifest attributes to multi-dimensional execution modifiers
        let tone = rules.tone || 'empathetic_professional';
        let verbosity = personaManifest.verbosity || 'normal';
        let confidence = rules.confidence || 'high';
        let empathy = rules.empathy || 'moderate';
        let explanationDepth = rules.explanationDepth || 'moderate';
        let summaryStyle = rules.summaryStyle || 'structured';

        // Dynamic Modifier Adaptations based on User Temperament
        if (userTemperament.toUpperCase() === 'CHOLERIC') {
            verbosity = 'concise';
            summaryStyle = 'bulleted_summary';
        } else if (userTemperament.toUpperCase() === 'MELANCHOLIC') {
            explanationDepth = 'deep';
            summaryStyle = 'structured_detailed';
        }

        return createPersonaContextDTO({
            personaId: personaManifest.id,
            tone,
            verbosity,
            confidence,
            empathy,
            explanationDepth,
            questionFrequency: rules.questionFrequency || 'balanced',
            summaryStyle,
            formattingStyle: rules.formattingStyle || 'markdown',
            emojiPolicy: personaManifest.emojiPolicy,
            riskTolerance: rules.riskTolerance || 'low'
        });
    }
});

export default PersonaModifierEngine;

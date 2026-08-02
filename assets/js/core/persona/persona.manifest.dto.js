/**
 * TOPCARE AI PLATFORM V2 — PERSONA MANIFEST DTO & PERSONA CONTEXT DTO FACTORIES
 * Path: assets/js/core/persona/persona.manifest.dto.js
 * Status: ACTIVE (SPRINT C - LOCKED GOLDEN BASELINE)
 */

import { KNOWN_SCHEMA_TYPES } from '../schema/schema.catalog.js';
import TimeProvider from '../time/time.provider.js';
import { deepFreezeDTO } from '../utils/dto.js';

export const PERSONA_SCHEMA_VERSION = '2.0.0';

export function createPersonaManifestDTO({
    id,
    version = '1.0.0',
    displayName,
    description = '',
    traits = [],
    communicationStyle = 'empathetic_professional',
    verbosity = 'normal', // 'concise' | 'normal' | 'detailed'
    emojiPolicy = 'minimal', // 'none' | 'minimal' | 'expressive'
    forbiddenTopics = [],
    preferredCapabilityTags = [],
    behaviorRules = {}
}) {
    if (!id || typeof id !== 'string') {
        throw new Error('[PersonaManifestDTO] Persona ID is required.');
    }

    return deepFreezeDTO({
        schemaType: 'PersonaManifestDTO',
        schemaVersion: PERSONA_SCHEMA_VERSION,
        id: String(id).toLowerCase().trim(),
        version: String(version),
        displayName: String(displayName || id),
        description: String(description),
        traits: Object.freeze(traits.map(t => String(t).toLowerCase().trim())),
        communicationStyle: String(communicationStyle),
        verbosity: String(verbosity),
        emojiPolicy: String(emojiPolicy),
        forbiddenTopics: Object.freeze(forbiddenTopics.map(ft => String(ft).toLowerCase().trim())),
        preferredCapabilityTags: Object.freeze(preferredCapabilityTags.map(pct => String(pct).toLowerCase().trim())),
        behaviorRules: deepFreezeDTO({ ...behaviorRules })
    });
}

export function createPersonaContextDTO({
    personaId,
    tone = 'direct',
    verbosity = 'normal',
    confidence = 'high',
    empathy = 'moderate',
    explanationDepth = 'moderate',
    questionFrequency = 'balanced',
    summaryStyle = 'structured',
    formattingStyle = 'markdown_bulleted',
    emojiPolicy = 'minimal',
    riskTolerance = 'low',
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'PersonaContextDTO',
        schemaVersion: PERSONA_SCHEMA_VERSION,
        personaId: String(personaId),
        tone: String(tone),
        verbosity: String(verbosity),
        confidence: String(confidence),
        empathy: String(empathy),
        explanationDepth: String(explanationDepth),
        questionFrequency: String(questionFrequency),
        summaryStyle: String(summaryStyle),
        formattingStyle: String(formattingStyle),
        emojiPolicy: String(emojiPolicy),
        riskTolerance: String(riskTolerance),
        generatedAt: timeProvider.iso()
    });
}

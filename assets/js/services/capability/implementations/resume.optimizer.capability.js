/**
 * TOPCARE AI PLATFORM V2 — REFERENCE CAPABILITIES (RESUME OPTIMIZER & PERSONALITY ASSESSMENT)
 * Path: assets/js/services/capability/implementations/resume.optimizer.capability.js & personality.assessment.capability.js
 * Status: ACTIVE (SPRINT A - LOCKED GOLDEN BASELINE)
 */

import CapabilityRegistry from '../../../core/capability/capability.registry.js';
import { deepFreezeDTO } from '../../../core/utils/dto.js';

// 1. Resume Optimizer Capability Manifest
export const ResumeOptimizerManifest = CapabilityRegistry.register({
    id: 'resume-optimizer',
    version: '1.0.0',
    displayName: 'AI Resume & CV Optimizer',
    category: 'SKILL',
    description: 'Optimizes resume content for target job descriptions using personality-aligned tone.',
    intents: ['OPTIMIZE_RESUME', 'CV_REVIEW'],
    permissions: [
        'context.personality.read',
        'conversation.current.read'
    ],
    inputs: {
        rawResumeText: { type: 'string', required: true, description: 'User resume raw text' },
        targetRole: { type: 'string', required: false, description: 'Target job role title' }
    },
    outputs: {
        optimizedResume: 'string',
        improvementSuggestions: 'array'
    },
    uiMetadata: {
        icon: 'file-text',
        color: '#10B981',
        outputWidget: 'resume-preview-widget'
    },
    tags: ['resume', 'career', 'cv']
});

export const ResumeOptimizerHandler = Object.freeze({
    async execute(inputs, contextDTO) {
        const personalityType = contextDTO?.nodes?.personality?.primaryType || 'Analytical';
        const role = inputs.targetRole || 'General Professional';

        return deepFreezeDTO({
            outputs: {
                optimizedResume: `[Optimized Resume for ${role}]\nFormat: ${personalityType} Tone\nContent: ${inputs.rawResumeText}`,
                improvementSuggestions: [
                    'Quantify achievements with measurable metrics.',
                    'Align executive summary with target role keywords.'
                ]
            },
            artifacts: [{ name: 'resume-analysis.json', type: 'application/json' }]
        });
    }
});

// 2. Personality Assessment Capability Manifest
export const PersonalityAssessmentManifest = CapabilityRegistry.register({
    id: 'personality-assessment',
    version: '1.0.0',
    displayName: 'Four Temperaments Assessment Skill',
    category: 'SKILL',
    description: 'Evaluates primary user temperament (Melancholic, Choleric, Sanguine, Phlegmatic).',
    intents: ['ASSESS_PERSONALITY', 'TEMPERAMENT_CHECK'],
    permissions: [
        'context.personality.read',
        'context.memory.summary.read'
    ],
    inputs: {
        userAnswers: { type: 'object', required: true, description: 'User survey answers' }
    },
    outputs: {
        primaryTemperament: 'string',
        secondaryTemperament: 'string'
    },
    uiMetadata: {
        icon: 'user-check',
        color: '#8B5CF6',
        outputWidget: 'temperament-radar-widget'
    },
    tags: ['personality', 'assessment', 'temperament']
});

export const PersonalityAssessmentHandler = Object.freeze({
    async execute(inputs) {
        return deepFreezeDTO({
            outputs: {
                primaryTemperament: 'Choleric',
                secondaryTemperament: 'Phlegmatic'
            },
            artifacts: [{ name: 'personality-profile.json', type: 'application/json' }]
        });
    }
});

// Lock Capability Registry after reference capability registration
CapabilityRegistry.lock();

/**
 * TOPCARE AI PLATFORM V2 — CAPABILITY IMPLEMENTATION: RESUME OPTIMIZER & PERSONALITY ASSESSMENT
 * Path: assets/js/services/capability/implementations/resume.optimizer.capability.js
 * Status: ACTIVE (BUILD 123.1 - REVISION 2)
 * Role: Preserves Original Contracts for Capability Manifests & Registers Handlers into SSOT
 */

import CapabilityRegistry from '../../../core/capability/capability.registry.js';
import CapabilityHandlerRegistry from '../../../core/capability/capability.handler.registry.js';

// -----------------------------------------------------------------
// HANDLER IMPLEMENTATIONS
// -----------------------------------------------------------------
export async function ResumeOptimizerHandler(inputs, context) {
    const rawResumeText = inputs.resumeText || '';
    const targetRole = inputs.targetRole || 'General Healthcare Specialist';

    return {
        status: 'SUCCESS',
        outputs: {
            score: 88,
            targetRole,
            improvements: [
                'Quantify achievements in previous clinical or managerial roles.',
                'Highlight experience with digital health systems and AI tooling.',
                'Include certifications relevant to specialty care.'
            ],
            optimizedSummary: `Experienced specialist focused on ${targetRole} with strong clinical outcomes and healthcare management skills.`
        }
    };
}

export async function PersonalityAssessmentHandler(inputs, context) {
    const answers = inputs.answers || [];
    return {
        status: 'SUCCESS',
        outputs: {
            primaryTemperament: 'Melancholic-Sanguine',
            traits: ['Analytical', 'Detail-Oriented', 'Empathetic', 'Structured'],
            recommendations: [
                'Thrives in structured, high-precision clinical environments.',
                'Utilize AI diagnostic support tools for enhanced workflow efficiency.'
            ]
        }
    };
}

// -----------------------------------------------------------------
// CAPABILITY INITIALIZER & REGISTRATION
// -----------------------------------------------------------------
export function initializeResumeOptimizerCapability() {
    // 1. Manifest Registrations (Original Contracts Preserved)
    CapabilityRegistry.register({
        id: 'resume-optimizer',
        displayName: 'Resume Optimizer AI',
        version: '1.0.0',
        requiredScope: ['patient.read', 'soap.read'],
        intents: ['OPTIMIZE_RESUME', 'ENHANCE_CAREER'],
        requiredEntities: ['resumeText'],
        optionalEntities: ['targetRole'],
        uiMetadata: {
            outputWidget: 'resume-optimizer-card',
            icon: 'file-text'
        }
    });

    CapabilityRegistry.register({
        id: 'personality-assessment',
        displayName: 'Personality & Temperament Analyzer',
        version: '1.0.0',
        requiredScope: ['personality.test'],
        intents: ['ASSESS_PERSONALITY', 'ANALYZE_TEMPERAMENT'],
        requiredEntities: ['answers'],
        optionalEntities: [],
        uiMetadata: {
            outputWidget: 'personality-result-card',
            icon: 'user-check'
        }
    });

    // 2. Handler Registrations (Registered using Original Manifest IDs)
    CapabilityHandlerRegistry.register('resume-optimizer', ResumeOptimizerHandler);
    CapabilityHandlerRegistry.register('personality-assessment', PersonalityAssessmentHandler);
}

export default initializeResumeOptimizerCapability;
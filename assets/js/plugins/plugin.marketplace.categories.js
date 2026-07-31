/**
 * file: assets/js/plugins/plugin.marketplace.categories.js
 */

export const MARKETPLACE_CATEGORIES = Object.freeze({
    CLINICAL_ANALYTICS: 'clinical_analytics',
    DIAGNOSTICS: 'diagnostics',
    AI_ASSISTANT: 'ai_assistant',
    UI_EXTENSION: 'ui_extension',
    INTEGRATION: 'integration',
    SECURITY_AUDIT: 'security_audit'
});

export const CATEGORY_METADATA = Object.freeze({
    [MARKETPLACE_CATEGORIES.CLINICAL_ANALYTICS]: {
        displayName: 'Clinical Analytics',
        description: 'Tools for telemetry, patient outcomes tracking, and clinical reporting.'
    },
    [MARKETPLACE_CATEGORIES.DIAGNOSTICS]: {
        displayName: 'Diagnostics & Imaging',
        description: 'Extensions supporting diagnostic workflows and medical imaging integrations.'
    },
    [MARKETPLACE_CATEGORIES.AI_ASSISTANT]: {
        displayName: 'AI & Decision Support',
        description: 'Contextual AI models and clinical decision support systems.'
    },
    [MARKETPLACE_CATEGORIES.UI_EXTENSION]: {
        displayName: 'UI & Workflow Extensions',
        description: 'Custom dashboards, widgets, and user interface enhancements.'
    },
    [MARKETPLACE_CATEGORIES.INTEGRATION]: {
        displayName: 'EHR & API Integrations',
        description: 'Connectors for HL7, FHIR, and third-party healthcare systems.'
    },
    [MARKETPLACE_CATEGORIES.SECURITY_AUDIT]: {
        displayName: 'Security & Compliance',
        description: 'Audit logging, encryption, and HIPAA compliance extensions.'
    }
});
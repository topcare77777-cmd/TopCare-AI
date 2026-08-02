/**
 * TOPCARE AI PLATFORM V2 — RISK & SAFETY ACTIONS CATALOG
 * Path: assets/js/core/safety/risk.catalog.js
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const SAFETY_SCHEMA_VERSION = '2.0.0';

export const RISK_LEVELS = deepFreezeDTO({
    NONE: 0,
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4
});

export const SAFETY_CATEGORIES = deepFreezeDTO({
    GENERAL: 'GENERAL',
    SELF_HARM: 'SELF_HARM',
    MEDICAL: 'MEDICAL',
    LEGAL: 'LEGAL',
    FINANCIAL: 'FINANCIAL',
    SEXUAL: 'SEXUAL',
    VIOLENCE: 'VIOLENCE',
    PRIVACY: 'PRIVACY',
    HARASSMENT: 'HARASSMENT',
    MISINFORMATION: 'MISINFORMATION'
});

export const SAFETY_ACTIONS = deepFreezeDTO({
    ALLOW: 'ALLOW',
    DISCLAIMER: 'DISCLAIMER',
    BLOCK: 'BLOCK'
});

export const SAFETY_POLICY_PRIORITIES = deepFreezeDTO({
    CRITICAL: 1000,
    HIGH: 700,
    NORMAL: 500,
    LOW: 100
});

/**
 * Path: assets/js/core/safety/disclaimer.catalog.js
 */
export const DISCLAIMER_IDS = deepFreezeDTO({
    MEDICAL_01: 'DISCLAIMER_MEDICAL_01',
    FINANCIAL_01: 'DISCLAIMER_FINANCIAL_01',
    LEGAL_01: 'DISCLAIMER_LEGAL_01',
    GENERAL_01: 'DISCLAIMER_GENERAL_01'
});

export const DISCLAIMER_CATALOG = deepFreezeDTO({
    [DISCLAIMER_IDS.MEDICAL_01]: {
        id: DISCLAIMER_IDS.MEDICAL_01,
        category: SAFETY_CATEGORIES.MEDICAL,
        text: 'TopCare AI adalah platform bimbingan kepribadian. Informasi ini bukan merupakan saran medis profesional.'
    },
    [DISCLAIMER_IDS.FINANCIAL_01]: {
        id: DISCLAIMER_IDS.FINANCIAL_01,
        category: SAFETY_CATEGORIES.FINANCIAL,
        text: 'Saran bimbingan berfokus pada pengembangan diri, bukan panduan konsultasi finansial resmi.'
    },
    [DISCLAIMER_IDS.LEGAL_01]: {
        id: DISCLAIMER_IDS.LEGAL_01,
        category: SAFETY_CATEGORIES.LEGAL,
        text: 'TopCare AI tidak memberikan layanan konsultasi hukum resmi.'
    },
    [DISCLAIMER_IDS.GENERAL_01]: {
        id: DISCLAIMER_IDS.GENERAL_01,
        category: SAFETY_CATEGORIES.GENERAL,
        text: 'Sesi ini berlangsung di bawah panduan keamanan etika TopCare AI Platform.'
    }
});

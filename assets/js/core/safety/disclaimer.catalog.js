/**
 * TOPCARE AI PLATFORM V2 — DISCLAIMER CATALOG
 * Path: assets/js/core/safety/disclaimer.catalog.js
 * Status: ACTIVE (BUILD AC-021 Phase 1 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for Standard Safety Disclaimers
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const DISCLAIMER_CATALOG = deepFreezeDTO({
    MEDICAL_ADVICE_NOTICE: {
        id: 'DISCLAIMER_MEDICAL_01',
        category: 'MEDICAL',
        text: 'TopCare AI adalah platform pengembangan diri dan coaching kepribadian. Informasi yang diberikan bukan merupakan diagnosis, tindakan medis, atau saran kesehatan profesional.'
    },
    FINANCIAL_ADVICE_NOTICE: {
        id: 'DISCLAIMER_FINANCIAL_01',
        category: 'FINANCIAL',
        text: 'Saran bimbingan berfokus pada perspektif pengembangan diri. Keputusan finansial sepenuhnya menjadi tanggung jawab dan pertimbangan pribadi Anda.'
    },
    LEGAL_NOTICE: {
        id: 'DISCLAIMER_LEGAL_01',
        category: 'LEGAL',
        text: 'TopCare AI tidak memberikan konsultasi atau bantuan hukum resmi.'
    },
    GENERAL_SAFETY_NOTICE: {
        id: 'DISCLAIMER_GENERAL_01',
        category: 'GENERAL',
        text: 'Sesi ini berlangsung di bawah panduan batasan etika dan keamanan TopCare AI Platform.'
    }
});

export default DISCLAIMER_CATALOG;

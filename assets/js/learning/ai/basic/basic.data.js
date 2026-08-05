/**
 * TOPCARE AI PLATFORM V2 — BASIC LEVEL METADATA
 * Path: assets/js/learning/ai/basic/basic.data.js
 * Status: APPROVED & LOCKED (BUILD 127.3)
 * SRP: Metadata definitions for Level 1 Basic AI domain.
 */

import { deepFreezeDTO } from '../../../../core/utils/dto.js';

export const BASIC_METADATA = deepFreezeDTO({
    id: 'basic',
    title: 'AI Learning Level Dasar',
    subtitle: 'Mulai perjalanan literasi kecerdasan buatan Anda dengan menguasai konsep dasar, cara kerja Machine Learning, serta prinsip keselamatan data.',
    heroBadge: 'Level 1 — Dasar'
});

export default BASIC_METADATA;
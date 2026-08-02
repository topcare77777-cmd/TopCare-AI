/**
 * TOPCARE AI PLATFORM V2 — UI ACTION DTO & THEME DTO
 * Path: assets/js/ui/workspace/contracts/ui.action.dto.js & theme.dto.js
 * Status: ACTIVE (SPRINT E - LOCKED GOLDEN BASELINE)
 */

import TimeProvider from '../../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../../core/utils/dto.js';

export const UI_ACTION_TYPES = deepFreezeDTO({
    SUBMIT_USER_MESSAGE: 'SUBMIT_USER_MESSAGE',
    SELECT_CAPABILITY: 'SELECT_CAPABILITY',
    SUBMIT_CLARIFICATION: 'SUBMIT_CLARIFICATION',
    TOGGLE_WIDGET: 'TOGGLE_WIDGET',
    CHANGE_THEME: 'CHANGE_THEME'
});

export function createUIActionDTO({
    type,
    payload = {},
    sourceComponent = 'workspace',
    timeProvider = TimeProvider
}) {
    if (!type || !UI_ACTION_TYPES[type]) {
        throw new Error(`[UIActionDTO] Invalid or uncataloged UI action type: "${type}"`);
    }

    return deepFreezeDTO({
        schemaType: 'UIActionDTO',
        schemaVersion: '2.0.0',
        actionId: `act_${timeProvider.now().toString(36)}`,
        type: UI_ACTION_TYPES[type],
        sourceComponent: String(sourceComponent),
        timestamp: timeProvider.iso(),
        payload: deepFreezeDTO({ ...payload })
    });
}

export function createThemeDTO({
    themeId = 'topcare-dark-enterprise',
    mode = 'dark',
    colors = {},
    spacing = {},
    typography = {},
    density = 'compact'
}) {
    return deepFreezeDTO({
        schemaType: 'ThemeDTO',
        schemaVersion: '2.0.0',
        themeId: String(themeId),
        mode: String(mode),
        colors: deepFreezeDTO({
            primary: '#3B82F6',
            background: '#0F172A',
            surface: '#1E293B',
            text: '#F8FAFC',
            border: '#334155',
            ...colors
        }),
        spacing: deepFreezeDTO({
            base: '8px',
            padding: '16px',
            ...spacing
        }),
        typography: deepFreezeDTO({
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSizeBase: '14px',
            ...typography
        }),
        density: String(density)
    });
}

export function createPresentationHintsDTO({
    tone = 'empathetic_professional',
    emojiPolicy = 'minimal',
    verbosity = 'normal'
}) {
    return deepFreezeDTO({
        schemaType: 'PresentationHintsDTO',
        schemaVersion: '2.0.0',
        tone: String(tone),
        emojiPolicy: String(emojiPolicy),
        verbosity: String(verbosity)
    });
}

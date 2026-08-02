/**
 * TOPCARE AI PLATFORM V2 — WORKSPACE RENDER DTO & WIDGET DEFINITION DTO
 * Path: assets/js/ui/workspace/contracts/workspace.render.dto.js & widget.definition.dto.js
 * Status: ACTIVE (SPRINT E - LOCKED GOLDEN BASELINE)
 */

import { KNOWN_SCHEMA_TYPES } from '../../../core/schema/schema.catalog.js';
import TimeProvider from '../../../core/time/time.provider.js';
import { deepFreezeDTO } from '../../../core/utils/dto.js';

export const UI_SCHEMA_VERSION = '2.0.0';

export function createWidgetDefinitionDTO({
    widgetId,
    widgetType = 'standard-card',
    version = '1.0.0',
    propsSchema = {},
    layoutHints = {},
    actions = []
}) {
    if (!widgetId || typeof widgetId !== 'string') {
        throw new Error('[WidgetDefinitionDTO] widgetId is required.');
    }

    return deepFreezeDTO({
        schemaType: 'WidgetDefinitionDTO',
        schemaVersion: UI_SCHEMA_VERSION,
        widgetId: String(widgetId),
        widgetType: String(widgetType),
        version: String(version),
        propsSchema: deepFreezeDTO({ ...propsSchema }),
        layoutHints: deepFreezeDTO({
            width: 'full',
            collapsible: true,
            ...layoutHints
        }),
        actions: Object.freeze([...actions])
    });
}

export function createWorkspaceRenderDTO({
    renderId,
    conversation = {},
    messages = [],
    activeWidgets = [],
    layout = {},
    theme = {},
    presentation = {},
    diagnostics = {},
    timeProvider = TimeProvider
}) {
    return deepFreezeDTO({
        schemaType: 'WorkspaceRenderDTO',
        schemaVersion: UI_SCHEMA_VERSION,
        renderId: renderId || `rnd_${timeProvider.now().toString(36)}`,
        renderedAt: timeProvider.iso(),
        conversation: deepFreezeDTO({ ...conversation }),
        messages: Object.freeze([...messages]),
        activeWidgets: Object.freeze([...activeWidgets]),
        layout: deepFreezeDTO({ ...layout }),
        theme: deepFreezeDTO({ ...theme }),
        presentation: deepFreezeDTO({ ...presentation }),
        diagnostics: deepFreezeDTO({ ...diagnostics })
    });
}

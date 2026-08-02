/**
 * TOPCARE AI PLATFORM V2 — EVENT SOURCE CATALOG
 * Path: assets/js/core/events/event.sources.js
 * Status: ACTIVE (BUILD AC-018R2 - LOCKED GOLDEN BASELINE)
 * Role: Single Source of Truth for System Event Source Identifiers
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const EVENT_SOURCES = deepFreezeDTO({
    COACH_RUNTIME: 'COACH_RUNTIME',
    LLM_GATEWAY: 'LLM_GATEWAY',
    MEMORY_MANAGER: 'MEMORY_MANAGER',
    PROVIDER_REGISTRY: 'PROVIDER_REGISTRY',
    PLUGIN_LOADER: 'PLUGIN_LOADER',
    DIAGNOSTICS_OBSERVER: 'DIAGNOSTICS_OBSERVER',
    SYSTEM_BOOTSTRAP: 'SYSTEM_BOOTSTRAP'
});

export default EVENT_SOURCES;

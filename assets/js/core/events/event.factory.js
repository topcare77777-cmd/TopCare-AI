/**
 * TOPCARE AI PLATFORM V2 — TYPED EVENT FACTORY
 * Path: assets/js/core/events/event.factory.js
 * Status: ACTIVE (BUILD AC-018R1 - LOCKED GOLDEN BASELINE)
 * Role: Factory for Creating Pure, Immutable, and Governed EventDTO Packets
 */

import EVENT_TYPES from './event.catalog.js';
import EventValidator from './event.validator.js';
import { deepFreezeDTO, deepCloneDTO } from '../utils/dto.js';

let eventCounter = 0;

/**
 * Default ID Provider for Production.
 * @returns {string}
 */
function defaultIdGenerator() {
    eventCounter += 1;
    return `evt_${Date.now().toString(36)}_${eventCounter.toString(36)}`;
}

/**
 * Creates a minimal, immutable, and governed EventDTO.
 *
 * @param {string} type - Event Type from EVENT_TYPES.
 * @param {string} source - Originating Domain.
 * @param {Object} [payload] - Pure Data Payload.
 * @param {Function} [idGenerator] - Optional custom ID Provider (for Testing/Replay).
 * @returns {Object} Deep-frozen Pure EventDTO.
 */
function createEventDTO(type, source, payload = {}, idGenerator = defaultIdGenerator) {
    // 1. Mandatory Event Governance Validation
    EventValidator.validate(type, source, payload);

    // 2. Generate Deterministic or Production ID
    const eventId = typeof idGenerator === 'function' ? idGenerator() : defaultIdGenerator();

    // 3. Clone Payload Safety
    const safePayload = deepCloneDTO(payload);

    // 4. Return Pure Domain EventDTO (No Version Attribute)
    return deepFreezeDTO({
        id: eventId,
        type,
        source,
        payload: safePayload
    });
}

export const EventFactory = Object.freeze({
    // Coach Events
    createCoachRequestStarted(source, payload, idGen) {
        return createEventDTO(EVENT_TYPES.COACH.REQUEST_STARTED, source, payload, idGen);
    },
    createCoachRequestCompleted(source, payload, idGen) {
        return createEventDTO(EVENT_TYPES.COACH.REQUEST_COMPLETED, source, payload, idGen);
    },
    createCoachStreamStarted(source, payload, idGen) {
        return createEventDTO(EVENT_TYPES.COACH.RESPONSE_STREAM_STARTED, source, payload, idGen);
    },
    createCoachStreamFinished(source, payload, idGen) {
        return createEventDTO(EVENT_TYPES.COACH.RESPONSE_STREAM_FINISHED, source, payload, idGen);
    },

    // Memory Events
    createMemoryCreated(source, payload, idGen) {
        return createEventDTO(EVENT_TYPES.MEMORY.CREATED, source, payload, idGen);
    },
    createMemoryUpdated(source, payload, idGen) {
        return createEventDTO(EVENT_TYPES.MEMORY.UPDATED, source, payload, idGen);
    },
    createMemoryCleared(source, payload, idGen) {
        return createEventDTO(EVENT_TYPES.MEMORY.CLEARED, source, payload, idGen);
    },

    // Provider Events
    createProviderSelected(source, payload, idGen) {
        return createEventDTO(EVENT_TYPES.LLM.PROVIDER_SELECTED, source, payload, idGen);
    },
    createProviderFailed(source, payload, idGen) {
        return createEventDTO(EVENT_TYPES.LLM.PROVIDER_FAILED, source, payload, idGen);
    },

    // Custom Catalog-Bound Event Creator
    createCustom(type, source, payload, idGen) {
        return createEventDTO(type, source, payload, idGen);
    }
});

export default EventFactory;

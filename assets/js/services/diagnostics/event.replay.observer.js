/**
 * TOPCARE AI PLATFORM V2 — ISOLATED EVENT REPLAY OBSERVER
 * Path: assets/js/services/diagnostics/event.replay.observer.js
 * Status: ACTIVE (BUILD AC-018R1 - LOCKED GOLDEN BASELINE)
 * Role: Side-Car Subscriber Maintaining Replay Envelope Buffer for Debugging
 */

import { deepFreezeDTO } from '../../core/utils/dto.js';

const MAX_REPLAY_BUFFER = 50;

export const EventReplayObserver = (() => {
    /** @type {Array<Object>} Internal Replay Buffer */
    const replayBuffer = [];
    let unsubscribeFn = null;

    function record(eventDTO) {
        replayBuffer.push(eventDTO);
        if (replayBuffer.length > MAX_REPLAY_BUFFER) {
            replayBuffer.shift();
        }
    }

    /**
     * Attaches observer as a standard subscriber to EventBus.
     * @param {Object} eventBus
     */
    function attach(eventBus) {
        if (eventBus && typeof eventBus.subscribe === 'function') {
            if (unsubscribeFn) unsubscribeFn();
            unsubscribeFn = eventBus.subscribe((eventDTO) => {
                record(eventDTO);
            });
        }
    }

    /**
     * Exports Replay Transport Envelope with schema versioning.
     * @returns {Object} Immutable Replay Transport Envelope.
     */
    function exportReplayEnvelope() {
        return deepFreezeDTO({
            schemaVersion: '2.0.0',
            exportedAt: new Date().toISOString(),
            totalEvents: replayBuffer.length,
            events: [...replayBuffer]
        });
    }

    function replay(inspectorCallback) {
        if (typeof inspectorCallback !== 'function') return;
        console.log(`[EventReplayObserver] Replaying ${replayBuffer.length} events...`);
        for (const eventDTO of replayBuffer) {
            try {
                inspectorCallback(eventDTO);
            } catch (err) {
                console.error('[EventReplayObserver] Error during replay:', err);
            }
        }
    }

    function detach() {
        if (typeof unsubscribeFn === 'function') {
            unsubscribeFn();
            unsubscribeFn = null;
        }
        replayBuffer.length = 0;
    }

    return Object.freeze({
        attach,
        exportReplayEnvelope,
        replay,
        detach
    });
})();

export default EventReplayObserver;

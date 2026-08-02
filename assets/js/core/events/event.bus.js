/**
 * TOPCARE AI PLATFORM V2 — PURE DUMB PIPE EVENT BUS WITH DELIVERY METRICS
 * Path: assets/js/core/events/event.bus.js
 * Status: ACTIVE (BUILD AC-018R2 - LOCKED GOLDEN BASELINE)
 * Role: Dumb-Pipe Broadcast Channel with Passive Delivery Statistics
 */

import { deepFreezeDTO } from '../utils/dto.js';

export const EventBus = (() => {
    const subscribers = new Set();

    /**
     * Publishes EventDTO and returns delivery statistics DTO.
     * @param {Object} eventDTO
     * @returns {Object} Delivery Statistics DTO.
     */
    function publish(eventDTO) {
        if (!eventDTO || typeof eventDTO !== 'object' || !eventDTO.type) {
            return deepFreezeDTO({ subscriberCount: subscribers.size, deliveryCount: 0, failedSubscribers: 0 });
        }

        let deliveryCount = 0;
        let failedSubscribers = 0;

        for (const callback of subscribers) {
            try {
                callback(eventDTO);
                deliveryCount += 1;
            } catch (err) {
                failedSubscribers += 1;
                console.error('[EventBus] Error in subscriber execution:', err);
            }
        }

        return deepFreezeDTO({
            subscriberCount: subscribers.size,
            deliveryCount,
            failedSubscribers
        });
    }

    function subscribe(callback) {
        if (typeof callback === 'function') subscribers.add(callback);
        return () => unsubscribe(callback);
    }

    function unsubscribe(callback) {
        if (typeof callback === 'function') subscribers.delete(callback);
    }

    function clear() {
        subscribers.clear();
    }

    return Object.freeze({
        publish,
        subscribe,
        unsubscribe,
        clear
    });
})();

export default EventBus;

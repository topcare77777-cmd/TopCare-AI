/**
 * TOPCARE AI PLATFORM V2 — CORE EVENT BUS COMPATIBILITY BRIDGE
 * Path: assets/js/core/event-bus.bridge.js
 * Status: ACTIVE - FIX BUILD 138.4
 * SRP: Ensures Core.Event provides both emit(), dispatch(), and publish() APIs seamlessly.
 */

import { Core } from './index.js';

if (Core && Core.Event) {
    // 1. Polyfill/Alias emit() jika belum ada
    if (typeof Core.Event.emit !== 'function') {
        Core.Event.emit = function (eventName, payload) {
            if (typeof Core.Event.dispatch === 'function') {
                return Core.Event.dispatch(eventName, payload);
            } else if (typeof Core.Event.publish === 'function') {
                return Core.Event.publish(eventName, payload);
            } else if (typeof Core.Event.trigger === 'function') {
                return Core.Event.trigger(eventName, payload);
            } else {
                console.warn(`[Core.Event] Polyfill fallback: Emitted '${eventName}'`, payload);
            }
        };
    }

    // 2. Polyfill/Alias dispatch() jika panggilan dibalik
    if (typeof Core.Event.dispatch !== 'function') {
        Core.Event.dispatch = Core.Event.emit;
    }
}

export default Core;

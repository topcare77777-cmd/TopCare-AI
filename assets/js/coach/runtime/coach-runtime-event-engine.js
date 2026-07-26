// assets/js/coach/runtime/coach-runtime-event-engine.js
/**
 * @file coach-runtime-event-engine.js
 * @description Handles dynamic event detection, runtime state synchronization triggers, and reactive event dispatching for AI Coach.
 * @module Coach/Runtime/RuntimeEventEngine
 */

import { CoachRuntimeStateManager } from './coach-runtime-state-manager.js';

let eventListeners = [];

export const CoachRuntimeEventEngine = {
    triggerEvent(eventType, eventPayload = {}) {
        const type = eventType || "SESSION_REFRESH";
        const eventId = "evt_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

        let actionName = "REFRESH_VIEW";
        let priority = "normal";

        switch (type) {
            case "DEVICE_CHANGED":
            case "ORIENTATION_CHANGED":
                actionName = "RECOMPUTE_LAYOUT";
                priority = "high";
                CoachRuntimeStateManager.updateState({ deviceMode: eventPayload.deviceMode || eventPayload.orientation || "desktop" });
                break;
            case "PERSONALITY_UPDATED":
                actionName = "APPLY_PERSONALITY_THEME";
                priority = "high";
                CoachRuntimeStateManager.updateState({ theme: eventPayload.theme || "balanced" });
                break;
            case "LAYOUT_UPDATED":
                actionName = "REDRAW_COMPONENTS";
                priority = "normal";
                CoachRuntimeStateManager.updateState({ layout: eventPayload.layout || "dashboard" });
                break;
            case "BEHAVIOR_UPDATED":
                actionName = "ADJUST_INTERACTION_MODE";
                priority = "normal";
                CoachRuntimeStateManager.updateState({ interactionMode: eventPayload.interactionMode || "adaptive" });
                break;
            case "SESSION_REFRESH":
            default:
                actionName = "SYNC_RUNTIME_STATE";
                priority = "low";
                CoachRuntimeStateManager.initializeState();
                break;
        }

        const eventContract = {
            eventId: eventId,
            eventType: type,
            payload: eventPayload,
            runtimeAction: {
                action: actionName,
                priority: priority
            },
            generatedAt: new Date().toISOString()
        };

        // Notify local subscribers safely
        eventListeners.forEach(listener => {
            try {
                if (typeof listener === 'function') {
                    listener(eventContract);
                }
            } catch (e) {
                // Suppress listener errors to protect the engine
            }
        });

        return eventContract;
    },

    subscribe(callback) {
        if (typeof callback === 'function') {
            eventListeners.push(callback);
        }
        return {
            unsubscribe: () => {
                eventListeners = eventListeners.filter(cb => cb !== callback);
            }
        };
    }
};
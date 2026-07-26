// assets/js/coach/runtime/coach-live-synchronizer.js
/**
 * @file coach-live-synchronizer.js
 * @description Coordinates real-time synchronization between runtime events, state snapshots, and adaptive UI profiles.
 * @module Coach/Runtime/LiveSynchronizer
 */

import { CoachRuntimeEventEngine } from './coach-runtime-event-engine.js';
import { CoachRuntimeStateManager } from './coach-runtime-state-manager.js';
import { CoachAdaptiveUIIntegration } from '../adaptive-ui/coach-adaptive-ui-integration.js';

export const CoachLiveSynchronizer = {
    syncLiveEnvironment(eventType = "SESSION_REFRESH", eventPayload = {}, userPersonality = null, deviceProfile = null) {
        let eventResult = null;
        try {
            eventResult = CoachRuntimeEventEngine.triggerEvent(eventType, eventPayload);
        } catch (e) {
            eventResult = { eventType: eventType, runtimeAction: { action: "FALLBACK_SYNC" } };
        }

        let snapshot = null;
        try {
            snapshot = CoachRuntimeStateManager.getStateSnapshot();
        } catch (e) {
            snapshot = CoachRuntimeStateManager.initializeState(userPersonality, deviceProfile);
        }

        let adaptiveProfile = null;
        try {
            adaptiveProfile = CoachAdaptiveUIIntegration.getAdaptiveExperience(userPersonality, deviceProfile);
        } catch (e) {
            adaptiveProfile = { adaptiveMode: "balanced" };
        }

        return {
            syncId: "sync_" + Date.now(),
            triggerEvent: eventResult.eventType || eventType,
            currentSnapshot: {
                state: snapshot,
                adaptiveExperience: adaptiveProfile,
                lastAction: eventResult.runtimeAction || { action: "NONE" }
            },
            syncStatus: "synchronized",
            generatedAt: new Date().toISOString()
        };
    },

    initializeLiveLoop(callback) {
        return CoachRuntimeEventEngine.subscribe((eventContract) => {
            const livePackage = this.syncLiveEnvironment(eventContract.eventType, eventContract.payload);
            if (typeof callback === 'function') {
                try {
                    callback(livePackage);
                } catch (e) {
                    // Suppress external subscriber errors
                }
            }
        });
    }
};
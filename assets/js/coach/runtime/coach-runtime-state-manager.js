// assets/js/coach/runtime/coach-runtime-state-manager.js
/**
 * @file coach-runtime-state-manager.js
 * @description Manages volatile runtime state snapshots, caching active layout, theme, and device modes for live UI synchronization.
 * @module Coach/Runtime/RuntimeStateManager
 */

import { CoachRuntimeUIController } from './coach-runtime-ui-controller.js';

let volatileStateStore = {
    stateId: "runtime_" + Date.now(),
    activeState: {
        layout: "dashboard",
        theme: "balanced",
        deviceMode: "desktop",
        interactionMode: "pointer"
    },
    sessionContext: {
        lastUpdate: new Date().toISOString(),
        source: "adaptive-runtime"
    }
};

export const CoachRuntimeStateManager = {
    initializeState(userPersonality = null, deviceProfile = null) {
        try {
            const controllerState = CoachRuntimeUIController.syncRuntimeState(userPersonality, deviceProfile);
            volatileStateStore.activeState = {
                layout: controllerState.runtimeState.activeLayout || "dashboard",
                theme: controllerState.runtimeState.activeTheme || "balanced",
                deviceMode: deviceProfile?.experienceMode || deviceProfile?.deviceType || "desktop",
                interactionMode: controllerState.runtimeState.pacing ? "adaptive" : "standard"
            };
            volatileStateStore.sessionContext.lastUpdate = new Date().toISOString();
        } catch (e) {
            // Keep default fallback state
        }
        return this.getStateSnapshot();
    },

    getStateSnapshot() {
        return {
            stateId: volatileStateStore.stateId,
            activeState: { ...volatileStateStore.activeState },
            sessionContext: { ...volatileStateStore.sessionContext },
            generatedAt: new Date().toISOString()
        };
    },

    updateState(newStatePatch = {}) {
        if (newStatePatch && typeof newStatePatch === 'object') {
            volatileStateStore.activeState = {
                ...volatileStateStore.activeState,
                ...newStatePatch
            };
            volatileStateStore.sessionContext.lastUpdate = new Date().toISOString();
        }
        return this.getStateSnapshot();
    }
};
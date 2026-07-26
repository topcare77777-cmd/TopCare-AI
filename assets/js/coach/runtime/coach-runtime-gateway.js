// assets/js/coach/runtime/coach-runtime-gateway.js
/**
 * @file coach-runtime-gateway.js
 * @description Master gateway facade combining memory, reasoning, adaptive UI, runtime state, and live synchronization into a single frontend entry point.
 * @module Coach/Runtime/RuntimeGateway
 */

import { CoachLiveSynchronizer } from './coach-live-synchronizer.js';
import { CoachRuntimeStateManager } from './coach-runtime-state-manager.js';
import { CoachAdaptiveUIIntegration } from '../adaptive-ui/coach-adaptive-ui-integration.js';

export const CoachRuntimeGateway = {
    getFrontendExperience(userPersonality = null, deviceProfile = null, activeEvent = null) {
        let liveSync = null;
        try {
            const eventType = activeEvent?.type || "SESSION_REFRESH";
            const eventPayload = activeEvent?.payload || {};
            liveSync = CoachLiveSynchronizer.syncLiveEnvironment(eventType, eventPayload, userPersonality, deviceProfile);
        } catch (e) {
            liveSync = {
                syncId: "sync_fallback",
                triggerEvent: "SESSION_REFRESH",
                currentSnapshot: {
                    state: CoachRuntimeStateManager.getStateSnapshot(),
                    adaptiveExperience: CoachAdaptiveUIIntegration.getAdaptiveExperience(userPersonality, deviceProfile),
                    lastAction: { action: "FALLBACK_SYNC" }
                },
                syncStatus: "fallback"
            };
        }

        const snapshot = liveSync.currentSnapshot?.state || CoachRuntimeStateManager.getStateSnapshot();
        const adaptiveExp = liveSync.currentSnapshot?.adaptiveExperience || CoachAdaptiveUIIntegration.getAdaptiveExperience(userPersonality, deviceProfile);

        return {
            gatewayId: "gw_" + Date.now(),
            sessionState: snapshot,
            adaptiveExperience: adaptiveExp,
            runtimeDirectives: {
                activeLayout: snapshot.activeState?.layout || "dashboard",
                activeTheme: snapshot.activeState?.theme || "balanced",
                deviceMode: snapshot.activeState?.deviceMode || "desktop",
                interactionMode: snapshot.activeState?.interactionMode || "adaptive",
                lastSyncAction: liveSync.currentSnapshot?.lastAction?.action || "NONE"
            },
            gatewayStatus: "active",
            generatedAt: new Date().toISOString()
        };
    }
};
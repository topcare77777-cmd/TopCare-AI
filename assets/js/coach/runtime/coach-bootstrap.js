/**
 * @file coach-bootstrap.js
 * @description Initializes AI Coach runtime when frontend application loads.
 * @module Coach/Runtime/Bootstrap
 */

import { CoachRuntimeGateway } from './coach-runtime-gateway.js';

export const CoachBootstrap = {

    initialize(userPersonality = null, deviceProfile = null) {

        let experiencePackage = null;

        try {

            experiencePackage =
                CoachRuntimeGateway.getFrontendExperience(
                    userPersonality,
                    deviceProfile
                );

        } catch (error) {

            experiencePackage = {
                gatewayStatus: "fallback",
                runtimeDirectives: {
                    activeLayout: "dashboard",
                    activeTheme: "balanced",
                    deviceMode: "desktop",
                    interactionMode: "standard"
                },
                generatedAt: new Date().toISOString()
            };

        }


        return {
            initialized: true,

            coachStatus: "active",

            experience:
                experiencePackage,

            initializedAt:
                new Date().toISOString()
        };
    }
};


// Auto initialize when browser available

if (typeof window !== "undefined") {

    window.TopCareCoach =
        CoachBootstrap.initialize();

}
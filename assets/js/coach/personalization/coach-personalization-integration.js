// assets/js/coach/personalization/coach-personalization-integration.js
/**
 * @file coach-personalization-integration.js
 * @description Integration facade safely exposing the normalized personalization configuration to external system layers.
 * @module Coach/Personalization/Integration
 */

import { CoachPersonalizationAdapter } from './coach-personalization-adapter.js';

export const CoachPersonalizationIntegration = {
    getProfile() {
        let config = null;
        try {
            config = CoachPersonalizationAdapter.getConfiguration();
        } catch (e) {
            config = null;
        }

        return {
            personalization: config || CoachPersonalizationAdapter.getConfiguration(),
            ready: true,
            generatedAt: new Date().toISOString()
        };
    }
};
/**
 * TopCare AI Platform V2.0.0
 * Personality Service
 * Path: assets/js/services/personality.service.js
 */

import PersonalityRepository from '../repository/personality.repository.js';

const PersonalityService = {
    async load() {
        console.log('[Personality Service] Connected');
        const data = await PersonalityRepository.get();
        console.log("[PersonalityService] Data received");
        return data;
    }
};

export default PersonalityService;
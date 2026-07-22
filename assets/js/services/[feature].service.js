/**
 * TopCare AI Platform V2.0.0
 * Feature Service Template
 */

import FeatureRepository from '../repository/[feature].repository.js';

const FeatureService = {
    async load() {
        console.log('[FeatureService] Connected');
        const data = await FeatureRepository.get();
        console.log("[FeatureService] Data received");
        return data;
    }
};

export default FeatureService;
/**
 * TopCare AI Platform V2.0.0
 * Features Service
 * Path: assets/js/services/features.service.js
 */

import FeaturesRepository from '../repository/features.repository.js';
import Logger from '../core/logger.js';

const FeaturesService = {
    async load() {
        Logger.info('[FeaturesService] Connected');
        const data = await FeaturesRepository.get();
        Logger.info("[FeaturesService] Data received");
        return data;
    }
};

export default FeaturesService;
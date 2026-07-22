/**
 * TopCare AI Platform V2.0.0
 * Statistics Service
 * Path: assets/js/services/statistics.service.js
 */

import StatisticsRepository from '../repository/statistics.repository.js';

const StatisticsService = {
    async load() {
        console.log('[Statistics Service] Connected');
        const data = await StatisticsRepository.get();
        console.log("[StatisticsService] Data received");
        return data;
    }
};

export default StatisticsService;
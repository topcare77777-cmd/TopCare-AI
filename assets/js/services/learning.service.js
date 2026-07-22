/**
 * TopCare AI Platform V2.0.0
 * Learning Service
 * Path: assets/js/services/learning.service.js
 */

import LearningRepository from '../repository/learning.repository.js';

const LearningService = {
    async load() {
        console.log("[Learning Service] Connected");
        const data = await LearningRepository.get();
        console.log("[LearningService] Data received");
        return data;
    }
};

export default LearningService;
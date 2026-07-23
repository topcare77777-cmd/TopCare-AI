/**
 * TopCare AI Platform V2.0.0
 * Showcase Service
 * Path: assets/js/services/showcase.service.js
 */
import Logger from '../core/logger.js';

const ShowcaseService = {
    async getData() {
        Logger.info("[ShowcaseService] Fetching showcase data");
        return { title: "Enterprise Showcase & Solutions" };
    }
};

export default ShowcaseService;
/**
 * TopCare AI Platform V2.0.0
 * Features Repository
 * Path: assets/js/repository/features.repository.js
 */

import DataEngine from "../data/data.engine.js";
import Logger from "../core/logger.js";

const FeaturesRepository = {
    async get() {
        try {
            Logger.info("[FeaturesRepository] Loading features data");
            const data = await DataEngine.get("features");
            Logger.info("[FeaturesRepository] Data fetched successfully");
            return data;
        } catch (error) {
            Logger.error('[FeaturesRepository] Error fetching features data:', error);
            return { tag: "Core Features", title: "Engineered for High-Performance Workflows", features: [] };
        }
    }
};

export default FeaturesRepository;
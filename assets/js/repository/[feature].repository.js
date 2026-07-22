/**
 * TopCare AI Platform V2.0.0
 * Feature Repository Template
 */

const FeatureRepository = {
    async get() {
        try {
            console.log("[FeatureRepository] Loading feature data...");
            const response = await fetch('assets/json/homepage/[feature].json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("[FeatureRepository] Data fetched");
            return data;
        } catch (error) {
            console.error('[FeatureRepository] Error fetching data:', error);
            return null;
        }
    }
};

export default FeatureRepository;
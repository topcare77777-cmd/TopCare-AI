/**
 * TopCare AI Platform V2.0.0
 * Learning Repository
 * Path: assets/js/repository/learning.repository.js
 */

const LearningRepository = {
    async get() {
        try {
            console.log("[LearningRepository] Loading learning.json");
            const response = await fetch("assets/json/homepage/learning.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("[LearningRepository] Data fetched");
            return data;
        } catch (error) {
            console.error('[Learning Repository] Error fetching learning data:', error);
            return null;
        }
    }
};

export default LearningRepository;
/**
 * TopCare AI Platform V2.0.0
 * Statistics Repository
 * Path: assets/js/repository/statistics.repository.js
 */

const StatisticsRepository = {
    async get() {
        try {
            console.log("[StatisticsRepository] Loading statistics.json");
            const response = await fetch('assets/json/homepage/statistics.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("[StatisticsRepository] Data fetched");
            return data;
        } catch (error) {
            console.error('[StatisticsRepository] Error fetching statistics data:', error);
            return null;
        }
    }
};

export default StatisticsRepository;
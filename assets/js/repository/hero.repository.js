/**
 * TopCare AI Platform V2.0.0
 * Hero Repository
 * Path: assets/js/repository/hero.repository.js
 */

const HeroRepository = {
    async get() {
        try {
            console.log("[HeroRepository] Loading hero.json");
            const response = await fetch('assets/json/homepage/hero.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("[HeroRepository] Data fetched");
            return data;
        } catch (error) {
            console.error('[Hero Repository] Error fetching hero data:', error);
            return null;
        }
    }
};

export default HeroRepository;
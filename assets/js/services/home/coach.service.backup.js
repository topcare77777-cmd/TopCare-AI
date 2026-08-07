/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service
 * Status       : ACTIVE
 * Pattern      : Pure Data Provider
 * Version      : 2.4.0
 * Architecture : Development Constitution v1.1
 * Owner        : Coach Service
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.9
 *
 * API :
 *   getData()
 *   refresh()
 *   clearCache()
 * -----------------------------------------------------------------
 */

const CoachService = {
    cache: null, // runtime cache

    getData() {
        if (this.cache) {
            return this.cache;
        }

        this.cache = {
            sectionTitle: "Meet Your AI Coach",
            sectionDescription: "Personalized guidance tailored to your temperament, goals, and daily rhythm.",
            coaches: [
                {
                    id: 1,
                    name: "Dr. Aria",
                    specialty: "Physical Medicine & Well-being",
                    temperament: "Koleris",
                    rating: 4.9,
                    avatar: "assets/images/coaches/coach-aria.webp",
                    bio: "Specialist in physical medicine, rehabilitation, and optimal daily routines."
                },
                {
                    id: 2,
                    name: "Coach Kael",
                    specialty: "Behavioral & Habit Optimization",
                    temperament: "Sanguinis",
                    rating: 4.8,
                    avatar: "assets/images/coaches/coach-kael.webp",
                    bio: "Expert in structured habit tracking and sustainable behavioral change."
                }
            ],
            badge: "Expert AI Guidance"
        };

        return this.cache;
    },

    async refresh() {
        this.clearCache();
        return await this.getData();
    },

    clearCache() {
        this.cache = null;
    }
};

export default CoachService;
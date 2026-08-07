/**
 * TOPCARE AI PLATFORM
 * Coach Service
 * BUILD 137 — Asset V3 Migration
 */

const COACH_AVATAR =
    "assets/images/optimized-v3/coaches/coach-placeholder.webp";


const CoachService = {

    cache: null,

    getData() {

        if (this.cache) {
            return this.cache;
        }


        this.cache = {

            sectionTitle:
                "Meet Your AI Coach",

            sectionDescription:
                "Personalized guidance tailored to your temperament, goals, and daily rhythm.",


            coaches: [

                {
                    id: 1,
                    name: "Dr. Aria",
                    specialty:
                        "Physical Medicine & Well-being",
                    temperament:
                        "Koleris",
                    rating: 4.9,
                    avatar: COACH_AVATAR,
                    bio:
                        "Specialist in physical medicine, rehabilitation, and optimal daily routines."
                },


                {
                    id: 2,
                    name: "Coach Kael",
                    specialty:
                        "Behavioral & Habit Optimization",
                    temperament:
                        "Sanguinis",
                    rating: 4.8,
                    avatar: COACH_AVATAR,
                    bio:
                        "Expert in structured habit tracking and sustainable behavioral change."
                }

            ],

            badge:
                "Expert AI Guidance"
        };


        return this.cache;
    },


    async refresh() {

        this.clearCache();

        return this.getData();

    },


    clearCache() {

        this.cache = null;

    }

};


export default CoachService;
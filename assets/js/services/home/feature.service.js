/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service
 * Status       : ACTIVE
 * Pattern      : Pure Data Provider
 * Version      : 2.4.0
 * Architecture : Development Constitution v1.1
 * Owner        : Feature Service
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.9
 *
 * API :
 *   getData()
 *   refresh()
 *   clearCache()
 * -----------------------------------------------------------------
 */

const FeatureService = {
    cache: null, // runtime cache

    getData() {
        if (this.cache) {
            return this.cache;
        }

        this.cache = {
            sectionTitle: "Core Platform Features",
            sectionDescription: "Designed for seamless scaling, absolute runtime performance, and deep insights.",
            features: [
                {
                    id: 1,
                    icon: "assets/icons/runtime.svg",
                    title: "Smart Runtime V2",
                    description: "Lightning-fast view transitions and structured lifecycle management without memory leaks."
                },
                {
                    id: 2,
                    icon: "assets/icons/temperament.svg",
                    title: "Temperament Analytics",
                    description: "Deep psychological mapping based on classical temperament classifications and literature."
                },
                {
                    id: 3,
                    icon: "assets/icons/security.svg",
                    title: "Enterprise Isolation",
                    description: "Absolute boundary controls, strict data protection, and read-only legacy archives."
                }
            ]
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

export default FeatureService;
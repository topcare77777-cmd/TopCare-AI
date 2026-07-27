/**
 * -----------------------------------------------------------------
 * TOPCARE AI PLATFORM - ARCHITECTURE METADATA
 * -----------------------------------------------------------------
 * Layer        : Layer 5 - Service
 * Status       : ACTIVE
 * Pattern      : Orchestrator Facade Service
 * Version      : 2.4.0
 * Architecture : Development Constitution v1.1
 * Owner        : Home Orchestrator Service
 * Created      : Sprint 46A
 * Last Updated : Sprint 46A.9
 *
 * API :
 *   getData()
 *   refresh()
 *   clearCache()
 * -----------------------------------------------------------------
 */

import HeroService from './hero.service.js';
import CoachService from './coach.service.js';
import FeatureService from './feature.service.js';
import AboutService from './about.service.js';
import CTAService from './cta.service.js';
import FooterService from './footer.service.js';

const HomeService = {
    cache: null, // runtime cache

    getData() {
        if (this.cache) {
            return this.cache;
        }

        this.cache = {
            hero: HeroService.getData(),
            coach: CoachService.getData(),
            feature: FeatureService.getData(),
            about: AboutService.getData(),
            cta: CTAService.getData(),
            footer: FooterService.getData()
        };

        return this.cache;
    },

    async refresh() {
        this.clearCache();
        HeroService.clearCache();
        CoachService.clearCache();
        FeatureService.clearCache();
        AboutService.clearCache();
        CTAService.clearCache();
        FooterService.clearCache();

        return await this.getData();
    },

    clearCache() {
        this.cache = null;
    }
};

export default HomeService;
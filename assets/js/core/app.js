import kernel from "../kernel/kernel.js";

import { initHero } from "../modules/hero.js";
import { initTrusted } from "../modules/trusted.js";
import { initStatistics } from "../modules/statistics.js";
import { initLearning } from "../modules/learning.js";
import { initAssistant } from "../modules/assistant.js";
import { initPersonality } from "../modules/personality.js";
import { initCommunity } from "../modules/community.js";
import { initCreator } from "../modules/creator.js";
import { initFAQ } from "../modules/faq.js";
import { initTestimonial } from "../modules/testimonial.js";

export function bootstrap(){

    console.log("Bootstrapping TopCare AI");

    kernel.register(initHero);
    kernel.register(initTrusted);
    kernel.register(initStatistics);
    kernel.register(initLearning);
    kernel.register(initAssistant);
    kernel.register(initPersonality);
    kernel.register(initCommunity);
    kernel.register(initCreator);
    kernel.register(initFAQ);
    kernel.register(initTestimonial);

    kernel.start();

}
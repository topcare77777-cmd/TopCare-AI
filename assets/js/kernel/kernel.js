import { register } from "../framework/application.js";

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

export function loadKernel(){

    register(initHero);

    register(initTrusted);

    register(initStatistics);

    register(initLearning);

    register(initAssistant);

    register(initPersonality);

    register(initCommunity);

    register(initCreator);

    register(initFAQ);

    register(initTestimonial);

}
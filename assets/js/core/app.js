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
import { initNavbar } from "../modules/navbar.js";



export function bootstrap(){


    console.log(
        "================================"
    );


    console.log(
        "TopCare AI Platform v2.0.0 Alpha"
    );


    console.log(
        "Application Starting..."
    );


    console.log(
        "================================"
    );



    initNavbar();


    initHero();


    initTrusted();


    initStatistics();


    initLearning();


    initAssistant();


    initPersonality();


    initCommunity();


    initCreator();


    initFAQ();


    initTestimonial();



    console.log(
        "All Modules Loaded Successfully"
    );


}
import { revealOnScroll } from "../framework/animation.js";
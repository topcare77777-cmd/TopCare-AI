import { initNavbar } from "../modules/navbar.js";
import { initHero } from "../modules/hero.js";

export function initApp() {

    console.log("==================================");
    console.log("TopCare AI v2.0.0 Alpha");
    console.log("Application Started");
    console.log("==================================");

    initNavbar();

    initHero();

}
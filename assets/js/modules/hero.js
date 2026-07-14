import heroData from "../../json/hero.json" assert { type: "json" };

import { renderHero } from "../renderers/hero.renderer.js";

export function initHero() {

    renderHero(heroData);

}
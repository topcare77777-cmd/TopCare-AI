import { renderSection } from "./renderer.js";
import { heroComponent } from "../components/hero.component.js";

export function renderHero() {

    renderSection({

        selector: "#hero",

        template: "templates/components/hero.html",

        data: "assets/json/hero.json",

        component: heroComponent

    });

}
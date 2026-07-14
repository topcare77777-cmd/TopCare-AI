import { renderSection } from "./renderer.js";
import { personalityComponent } from "../components/personality.component.js";

export function renderPersonality(){

    renderSection({

        selector:"#personality",

        template:"templates/components/personality.html",

        data:"assets/json/personality.json",

        component:personalityComponent

    });

}
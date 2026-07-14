import { renderSection } from "./renderer.js";
import { learningComponent } from "../components/learning.component.js";

export function renderLearning() {

    renderSection({

        selector: "#learning",

        template: "templates/components/learning.html",

        data: "assets/json/learning.json",

        component: learningComponent

    });

}
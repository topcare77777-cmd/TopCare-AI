import { renderSection } from "./renderer.js";
import { statisticsComponent } from "../components/statistics.component.js";

export function renderStatistics() {

    renderSection({

        selector: "#statistics",

        template: "templates/components/statistics.html",

        data: "assets/json/statistics.json",

        component: statisticsComponent

    });

}
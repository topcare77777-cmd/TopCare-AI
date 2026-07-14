import { renderSection } from "./renderer.js";
import { trustedComponent } from "../components/trusted.component.js";

export function renderTrusted(){

    renderSection({

        selector:"#trusted",

        template:"templates/components/trusted.html",

        data:"assets/json/trusted.json",

        component:trustedComponent

    });

}
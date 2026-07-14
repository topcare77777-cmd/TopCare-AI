import { renderSection } from "./renderer.js";
import { creatorComponent } from "../components/creator.component.js";

export function renderCreator(){

    renderSection({

        selector:"#creator",

        template:"templates/components/creator.html",

        data:"assets/json/creator.json",

        component:creatorComponent

    });

}
import { renderSection } from "./renderer.js";
import { assistantComponent } from "../components/assistant.component.js";

export function renderAssistant(){

    renderSection({

        selector:"#assistant",

        template:"templates/components/assistant.html",

        data:"assets/json/assistant.json",

        component:assistantComponent

    });

}
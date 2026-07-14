import { renderSection } from "./renderer.js";
import { communityComponent } from "../components/community.component.js";

export function renderCommunity(){

    renderSection({

        selector:"#community",

        template:"templates/components/community.html",

        data:"assets/json/community.json",

        component:communityComponent

    });

}
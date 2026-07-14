import { render } from "../renderers/renderer.js";
import { trustedComponent } from "../components/trusted.component.js";


export function initTrusted(){

    render({

        selector:"#trusted",

        template:"trusted",

        data:"trusted",

        component:trustedComponent

    });

}
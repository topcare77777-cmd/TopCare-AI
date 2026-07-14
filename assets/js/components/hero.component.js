import { Button } from "../design/button.js";
import { Badge } from "../design/badge.js";

export function heroComponent(template,data){

    return template

        .replace("{{badge}}",

            Badge(data.badge)
        )

        .replaceAll("{{title}}",

            data.title
        )

        .replaceAll("{{subtitle}}",

            data.subtitle
        )

        .replace("{{button}}",

            Button({

                text:data.button,

                href:"#learning",

                type:"primary"

            })

        );

}
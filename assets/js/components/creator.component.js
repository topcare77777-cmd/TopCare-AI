import { Card } from "../design/card.js";

export function creatorComponent(template,data){

    const products = data.products.map(product=>Card(`

        <h3>${product.name}</h3>

        <p>${product.price}</p>

    `)).join("");

    return template

        .replace("{{badge}}",data.badge)

        .replace("{{title}}",data.title)

        .replace("{{subtitle}}",data.subtitle)

        .replace("{{products}}",products);

}
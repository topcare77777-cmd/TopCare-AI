import { Card } from "../design/card.js";

export function learningComponent(template, data) {

    const cards = data.courses.map(course =>

        Card(`

            <h3>${course.title}</h3>

            <p>${course.lesson}</p>

        `)

    ).join("");

    return template

        .replace("{{badge}}", data.badge)
        .replace("{{title}}", data.title)
        .replace("{{subtitle}}", data.subtitle)
        .replace("{{cards}}", cards);

}
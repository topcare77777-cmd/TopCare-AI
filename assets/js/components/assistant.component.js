export function assistantComponent(template,data){

    const chips=data.chips.map(chip=>`

        <button class="chip">

            ${chip}

        </button>

    `).join("");

    return template

    .replace("{{badge}}",data.badge)

    .replace("{{title}}",data.title)

    .replace("{{subtitle}}",data.subtitle)

    .replace("{{chips}}",chips)

    .replace("{{answer}}",data.answer);

}
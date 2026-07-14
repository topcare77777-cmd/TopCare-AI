export function personalityComponent(template,data){

    const cards = data.types.map(type=>`

        <div class="personality-card">

            <div class="personality-color"

                 style="background:${type.color};">

            </div>

            <h3>${type.name}</h3>

            <p>${type.role}</p>

        </div>

    `).join("");

    return template

        .replace("{{badge}}",data.badge)

        .replace("{{title}}",data.title)

        .replace("{{subtitle}}",data.subtitle)

        .replace("{{cards}}",cards);

}
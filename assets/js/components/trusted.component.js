export function trustedComponent(template,data){

    const cards=data.items.map(item=>`

        <div class="card">

            <h3>${item.title}</h3>

            <p>${item.description}</p>

        </div>

    `).join("");

    return template

        .replace("{{badge}}",data.badge)

        .replace("{{title}}",data.title)

        .replace("{{subtitle}}",data.subtitle)

        .replace("{{items}}",cards);

}
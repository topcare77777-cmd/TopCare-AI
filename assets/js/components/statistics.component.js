export function statisticsComponent(template, data) {

    const cards = data.items.map(item => `

        <div class="statistics-card">

            <h2>${item.number}</h2>

            <p>${item.title}</p>

        </div>

    `).join("");

    return template.replace("{{cards}}", cards);

}
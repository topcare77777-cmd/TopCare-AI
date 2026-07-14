export function statisticsRenderer(template, data) {

    let cards = "";

    data.items.forEach(item => {

        cards += `
        <div class="stat-card">

            <div class="stat-icon">

                ${item.icon}

            </div>

            <div
                class="stat-value"
                data-value="${item.value}"
                data-suffix="${item.suffix}">

                0

            </div>

            <div class="stat-label">

                ${item.label}

            </div>

        </div>
        `;

    });

    let html = template;

    html = html.replace("{{title}}", data.title);

    html = html.replace("{{subtitle}}", data.subtitle);

    html = html.replace("{{cards}}", cards);

    return html;

}
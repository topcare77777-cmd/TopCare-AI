export function statisticsComponent(data = {}) {

    return `
        <div class="statistics-card">

            <h2>
                ${data.value ?? "0"}
            </h2>

            <span>
                ${data.label ?? ""}
            </span>

        </div>
    `;

}
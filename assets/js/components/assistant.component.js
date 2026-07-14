export function assistantComponent(data = {}) {

    return `
        <section class="assistant-card">

            <h2>
                ${data.title ?? ""}
            </h2>

            <p>
                ${data.description ?? ""}
            </p>

        </section>
    `;

}
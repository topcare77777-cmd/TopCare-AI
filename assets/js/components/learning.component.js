export function learningComponent(data = {}) {

    return `
        <section class="learning-card">

            <h2>
                ${data.title ?? ""}
            </h2>

            <p>
                ${data.description ?? ""}
            </p>

        </section>
    `;

}
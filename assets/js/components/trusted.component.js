export function trustedComponent(data = {}) {

    return `
        <section class="trusted-section">

            <h2>
                ${data.title ?? ""}
            </h2>

            <p>
                ${data.description ?? ""}
            </p>

        </section>
    `;

}
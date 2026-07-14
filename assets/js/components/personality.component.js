export function personalityComponent(data = {}) {

    return `
        <section class="personality-card">

            <h2>${data.title ?? ""}</h2>

            <p>${data.description ?? ""}</p>

        </section>
    `;

}
export function creatorComponent(data = {}) {

    return `
        <section class="creator-card">

            <h2>${data.title ?? ""}</h2>

            <p>${data.description ?? ""}</p>

        </section>
    `;

}
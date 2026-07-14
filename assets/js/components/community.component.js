export function communityComponent(data = {}) {

    return `
        <section class="community-card">

            <h2>${data.title ?? ""}</h2>

            <p>${data.description ?? ""}</p>

        </section>
    `;

}
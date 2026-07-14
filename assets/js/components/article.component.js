export function articleComponent(data = {}) {

    return `
        <article class="article-card">

            <h2>${data.title ?? ""}</h2>

            <p>${data.description ?? ""}</p>

        </article>
    `;

}
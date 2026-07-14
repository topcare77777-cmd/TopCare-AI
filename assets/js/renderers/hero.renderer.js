import { render } from "./renderer.js";

export function renderHero(data) {

    const html = `

        <section class="hero">

            <div class="container">

                <h1>${data.title}</h1>

                <p>${data.subtitle}</p>

                <a class="btn btn-primary">

                    ${data.buttonPrimary}

                </a>

            </div>

        </section>

    `;

    render("#hero", html);

}
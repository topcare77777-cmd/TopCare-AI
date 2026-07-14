export function heroComponent(data = {}) {

    return `
        <section class="hero-content">

            <div class="hero-text">

                <span class="hero-badge">
                    TopCare AI Platform
                </span>

                <h1>
                    ${data.title ?? ""}
                </h1>

                <p>
                    ${data.subtitle ?? ""}
                </p>

                <a href="${data.buttonLink ?? "#"}"
                   class="btn btn-primary">

                    ${data.buttonText ?? "Mulai"}

                </a>

            </div>

        </section>
    `;

}
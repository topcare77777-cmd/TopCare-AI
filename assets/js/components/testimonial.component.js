export function testimonialComponent(data = {}) {

    return `
        <section class="testimonial-card">

            <h3>${data.name ?? ""}</h3>

            <p>${data.message ?? ""}</p>

        </section>
    `;

}
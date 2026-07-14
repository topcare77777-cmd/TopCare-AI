export function faqComponent(data = {}) {

    return `
        <section class="faq-item">

            <h3>${data.question ?? ""}</h3>

            <p>${data.answer ?? ""}</p>

        </section>
    `;

}
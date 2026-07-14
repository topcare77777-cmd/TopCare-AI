export function footerComponent(data = {}) {

    return `
        <footer class="footer">

            <h3>${data.title ?? "TopCare AI"}</h3>

            <p>${data.description ?? ""}</p>

            <small>${data.copyright ?? ""}</small>

        </footer>
    `;

}
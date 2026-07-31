/**
 * file: assets/js/pages/premium.page.js
 */
export const premiumPage = {
    async mount(container) {
        container.innerHTML = `
            <div style="padding: 60px 20px; text-align: center;">
                <h2>TopCare Premium</h2>
                <p>Fitur dalam tahap pengembangan.</p>
                <a href="#/home">Kembali ke Beranda</a>
            </div>
        `;
    },
    async destroy() { }
};
export default premiumPage;
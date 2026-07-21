import { getAbout } from "../services/about.service.js";

export async function renderAbout() {
    const section = document.getElementById("about");
    if (!section) return;

    try {
        const data = await getAbout();

        section.innerHTML = `
        <div class="tc-container">

            <span class="badge">${data.badge}</span>

            <h1>${data.title}</h1>

            <p>${data.description}</p>

            <a class="btn btn-primary" href="${data.buttonLink || "#learning"}">
                ${data.button}
            </a>

            <div class="about-details">
                <h2>${data.vision.title}</h2>
                <p>${data.vision.content}</p>
                <ul>
                    ${data.missions.map((mission) => `<li>${mission}</li>`).join("")}
                </ul>
            </div>

        </div>
    `;
    } catch (error) {
        console.error("About Module Error:", error);
        section.innerHTML = "<p>Konten tentang TopCare AI belum dapat dimuat.</p>";
    }
}

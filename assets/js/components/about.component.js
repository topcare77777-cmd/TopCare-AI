import { getAboutData } from "../services/about.service.js";
import { renderAbout } from "../renderers/about.renderer.js";

export async function AboutComponent() {

    const data = await getAboutData();

    const target = document.querySelector("#about");

    if (!target) return;

    target.innerHTML = renderAbout(data);

}
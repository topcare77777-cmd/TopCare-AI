import { getHeroData } from "../services/hero.service.js";
import { heroRenderer } from "../renderers/hero.renderer.js";

export async function initHero() {

    try {

        const section = document.querySelector("#hero");

        if (!section) {

            console.warn("Hero section tidak ditemukan.");

            return;

        }

        const [templateResponse, data] = await Promise.all([

            fetch("templates/components/hero.html"),

            getHeroData()

        ]);

        if (!templateResponse.ok) {

            throw new Error("Template hero.html tidak ditemukan.");

        }

        if (!data) {

            throw new Error("Data hero.json gagal dimuat.");

        }

        const template = await templateResponse.text();

        section.innerHTML = heroRenderer(template, data);

        console.log("✅ Hero Premium Loaded");

    } catch (error) {

        console.error("Hero Module Error :", error);

    }

}
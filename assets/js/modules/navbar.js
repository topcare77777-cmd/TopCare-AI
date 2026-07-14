import { getNavbarData } from "../services/navbar.service.js";
import { navbarRenderer } from "../renderers/navbar.renderer.js";

export async function initNavbar() {

    try {

        const target = document.querySelector("#navbar");

        if (!target) {

            console.warn("Navbar container tidak ditemukan.");

            return;

        }

        const [templateResponse, data] = await Promise.all([

            fetch("templates/components/navbar.html"),

            getNavbarData()

        ]);

        if (!templateResponse.ok) {

            throw new Error("Template navbar.html tidak ditemukan.");

        }

        if (!data) {

            throw new Error("navbar.json gagal dimuat.");

        }

        const template = await templateResponse.text();

        target.innerHTML = navbarRenderer(template, data);

        const navbar = target.querySelector(".navbar");

        window.addEventListener("scroll", () => {

            if (window.scrollY > 30) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        });

        console.log("✅ Navbar Premium Loaded");

    } catch (error) {

        console.error("Navbar Module :", error);

    }

}
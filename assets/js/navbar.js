// ==========================
// Professional Navbar
// ==========================

const nav = document.querySelector("nav");

if (nav) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 80) {

            nav.classList.add("scrolled");

        } else {

            nav.classList.remove("scrolled");

        }

    });

}

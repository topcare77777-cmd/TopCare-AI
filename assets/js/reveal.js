// ==========================
// Scroll Reveal Animation
// ==========================

const reveals = document.querySelectorAll(".reveal");

function revealFunction() {

    reveals.forEach((item) => {

        const windowHeight = window.innerHeight;

        const top = item.getBoundingClientRect().top;

        if (top < windowHeight - 120) {

            item.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealFunction);

revealFunction();
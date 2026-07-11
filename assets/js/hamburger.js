// ==========================
// Hamburger Menu
// ==========================

const hamburger = document.getElementById("hamburger");
const menu = document.querySelector(".menu");

if (hamburger && menu) {

    hamburger.addEventListener("click", () => {

        menu.classList.toggle("active");

        // Mengubah ikon ☰ menjadi ✖
        if (menu.classList.contains("active")) {

            hamburger.innerHTML = "✖";

        } else {

            hamburger.innerHTML = "☰";

        }

    });

}

// Menutup menu setelah link dipilih
const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");
        hamburger.innerHTML = "☰";

    });

});
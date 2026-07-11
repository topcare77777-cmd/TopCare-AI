// ==========================
// Mouse Glow
// ==========================

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    if (glow) {

        glow.style.left = e.clientX + "px";

        glow.style.top = e.clientY + "px";

    }

});
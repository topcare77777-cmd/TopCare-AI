// ==========================
// Dark Mode
// ==========================

const darkBtn = document.getElementById("darkMode");

if (darkBtn) {

    // Cek tema yang tersimpan
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");
        darkBtn.textContent = "☀️";

    } else {

        darkBtn.textContent = "🌙";

    }

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {

            darkBtn.textContent = "☀️";
            localStorage.setItem("theme", "dark");

        } else {

            darkBtn.textContent = "🌙";
            localStorage.setItem("theme", "light");

        }

    });

}
class Theme {

    load() {

        const theme =
            localStorage.getItem("theme") || "light";

        document.documentElement.dataset.theme = theme;

    }

    toggle() {

        const current =
            document.documentElement.dataset.theme;

        const next =
            current === "light"
                ? "dark"
                : "light";

        document.documentElement.dataset.theme = next;

        localStorage.setItem("theme", next);

    }

}

export default new Theme();
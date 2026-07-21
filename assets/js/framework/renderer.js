class Renderer {

    html(selector, html) {

        const el = document.querySelector(selector);

        if (el)

            el.innerHTML = html;

    }

    append(selector, html) {

        const el = document.querySelector(selector);

        if (el)

            el.insertAdjacentHTML("beforeend", html);

    }

    clear(selector) {

        const el = document.querySelector(selector);

        if (el)

            el.innerHTML = "";

    }

}

export default new Renderer();
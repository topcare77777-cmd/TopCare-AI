class Router {

    constructor() {

        this.routes = {};

    }

    add(path, callback) {

        this.routes[path] = callback;

    }

    start() {

        const page = location.pathname.split("/").pop() || "index.html";

        if (this.routes[page]) {

            this.routes[page]();

        }

    }

}

export default new Router();
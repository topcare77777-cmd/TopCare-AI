import "./event.js";
import "./router.js";
import "./animation.js";

class Application {

    constructor(){

        this.version = "2.0.0-alpha";

        this.name = "TopCare AI";

    }

    start(){

        console.log(`${this.name} ${this.version}`);

    }

}

export default new Application();
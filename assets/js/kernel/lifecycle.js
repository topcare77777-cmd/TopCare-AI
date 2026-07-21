import Events from "./events.js";

class Lifecycle{

    boot(){

        Events.emit("boot");

    }

    ready(){

        Events.emit("ready");

    }

    destroy(){

        Events.emit("destroy");

    }

}

export default new Lifecycle();
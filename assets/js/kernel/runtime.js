class Runtime{

    constructor(){

        this.version="3.0";

        this.environment="production";

        this.started=false;

    }

    start(){

        this.started=true;

    }

}

export default new Runtime();
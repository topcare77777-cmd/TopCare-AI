class Kernel {

    constructor(){

        this.modules=[];

    }

    register(module){

        this.modules.push(module);

    }

    start(){

        console.log("TopCare Kernel Started");

        this.modules.forEach(module=>{

            module();

        });

    }

}

export default new Kernel();
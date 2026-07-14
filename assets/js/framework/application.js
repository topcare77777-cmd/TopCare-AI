const modules = [];

export function register(module){

    modules.push(module);

}

export function start(){

    console.log("================================");
    console.log("TopCare AI Platform");
    console.log("Starting Application...");
    console.log("================================");

    modules.forEach(module=>{

        module();

    });

}
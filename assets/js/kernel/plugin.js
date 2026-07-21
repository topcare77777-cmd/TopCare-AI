/**
 * TopCare AI
 * Plugin Manager
 */


class PluginManager {


constructor(){

    this.plugins = new Map();

}




register(
name,
plugin
){


    this.plugins.set(
        name,
        plugin
    );


    console.log(
        "Plugin registered:",
        name
    );


}





async enable(name){


    const plugin =
    this.plugins.get(name);



    if(!plugin){

        console.warn(
            "Plugin missing:",
            name
        );

        return;

    }




    if(
    typeof plugin.init==="function"
    ){

        await plugin.init();

    }



    console.log(
        "Plugin enabled:",
        name
    );



}





disable(name){


    const plugin =
    this.plugins.get(name);



    if(
    plugin &&
    typeof plugin.destroy==="function"
    ){

        plugin.destroy();

    }



}




list(){

return [
...this.plugins.keys()
];

}



}



export default new PluginManager();
/**
 * TopCare AI
 * Base Renderer
 */


class BaseRenderer {


constructor(){

    this.components = {};

}





register(
name,
component
){

    this.components[name]=component;

}





render(
name,
data
){


    const component =
    this.components[name];


    if(!component){

        console.warn(
            "Renderer not found:",
            name
        );

        return;

    }



    return component(data);



}





}


export default BaseRenderer;
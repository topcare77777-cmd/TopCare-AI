/**
 * TopCare AI
 * Universal Renderer Engine
 */


import BaseRenderer
from "./base.renderer.js";



class RendererEngine
extends BaseRenderer{


constructor(){

super();

this.init();

}





init(){


console.log(
"Renderer Engine Ready"
);


}



}



export default new RendererEngine();
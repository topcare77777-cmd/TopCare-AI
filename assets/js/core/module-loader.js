/**
 * TopCare AI
 * Module Loader
 */


class ModuleLoader{


constructor(){

this.loaded=[];

}




async load(
name,
module
){


if(
this.loaded.includes(name)
){

return;

}



if(
module &&
typeof module.init==="function"
){

await module.init();

}



this.loaded.push(name);



console.log(
"Module loaded:",
name
);



}





}


export default new ModuleLoader();
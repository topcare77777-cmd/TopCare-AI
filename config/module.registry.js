/**
 * TopCare AI
 * Module Registry
 */


const ModuleRegistry = {


modules:{}




};



ModuleRegistry.register =
function(
name,
module
){


this.modules[name]=module;


};





ModuleRegistry.get =
function(name){


return this.modules[name];


};





ModuleRegistry.all =
function(){


return this.modules;


};





window.ModuleRegistry =
ModuleRegistry;
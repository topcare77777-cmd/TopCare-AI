import SecurityConfig
from "../../config/security.config.js";

class Security{

freeze(){

if(SecurityConfig.freezeObject){

Object.freeze(window);

}

}

sanitize(text){

return text

.replace(/</g,"&lt;")

.replace(/>/g,"&gt;");

}

}

export default new Security();
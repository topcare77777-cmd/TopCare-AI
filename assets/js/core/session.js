import MemberConfig
from "../../config/member.config.js";

class Session{

save(user){

localStorage.setItem(

MemberConfig.sessionKey,

JSON.stringify(user)

);

}

load(){

const raw=

localStorage.getItem(

MemberConfig.sessionKey

);

if(!raw)return null;

return JSON.parse(raw);

}

clear(){

localStorage.removeItem(

MemberConfig.sessionKey

);

}

}

export default new Session();
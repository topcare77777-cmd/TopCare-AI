import state from "./state.js";

class Persist{

save(){

localStorage.setItem(

"topcare-store",

JSON.stringify(state)

);

}

load(){

const raw=

localStorage.getItem("topcare-store");

if(!raw)return;

Object.assign(

state,

JSON.parse(raw)

);

}

clear(){

localStorage.removeItem(

"topcare-store"

);

}

}

export default new Persist();
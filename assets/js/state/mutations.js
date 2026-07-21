import state from "./state.js";

const mutations={

set(key,value){

state[key]=value;

},

merge(key,value){

state[key]={

...state[key],

...value

};

},

push(key,value){

if(Array.isArray(state[key])){

state[key].push(value);

}

}

};

export default mutations;
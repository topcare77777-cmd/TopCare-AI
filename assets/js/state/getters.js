import state from "./state.js";

const getters={

get(key){

return state[key];

},

user(){

return state.user;

},

articles(){

return state.articles;

},

hero(){

return state.hero;

}

};

export default getters;
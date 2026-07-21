import Session from "./session.js";

class Auth{

constructor(){

this.user=

Session.load();

}

login(user){

this.user=user;

Session.save(user);

return true;

}

logout(){

this.user=null;

Session.clear();

}

check(){

return this.user!==null;

}

user(){

return this.user;

}

role(){

if(!this.user)

return "guest";

return this.user.role;

}

}

export default new Auth();
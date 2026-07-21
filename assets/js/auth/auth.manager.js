import Session
from "./user.session.js";


import Permission
from "../security/permission.js";


class AuthManager {



login(user){



Session.save(user);



Permission.setRole(
user.role
);



return true;


}



logout(){



Session.remove();



Permission.setRole(
"guest"
);



}



user(){


return Session.get();


}



check(){


return Session.isLogin();


}



}



export default new AuthManager();
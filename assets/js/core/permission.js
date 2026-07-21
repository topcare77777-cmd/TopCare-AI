import Auth from "./auth.js";

class Permission{

allow(...roles){

return roles.includes(

Auth.role()

);

}

guest(){

return Auth.role()==="guest";

}

member(){

return Auth.role()==="member";

}

creator(){

return Auth.role()==="creator";

}

admin(){

return Auth.role()==="admin";

}

finance(){

return Auth.role()==="finance";

}

superAdmin(){

return Auth.role()==="superadmin";

}

}

export default new Permission();
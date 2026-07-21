import Session
from "../auth/user.session.js";


import Policy
from "./access.policy.js";



class RouteGuard {



check(path){



const rule=
Policy[path];



if(!rule)

return true;



const user=
Session.get();



if(!user)

return false;



return rule.role
.includes(
user.role
);



}



redirect(){


window.location.href="/index.html";


}



}



export default new RouteGuard();
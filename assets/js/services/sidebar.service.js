import Auth from "../core/auth.js";

class SidebarService{

menu(){

const role=Auth.role();

switch(role){

case "admin":

return [

"Dashboard",

"Member",

"Creator",

"Finance",

"Settings"

];

case "creator":

return [

"Dashboard",

"My Product",

"Earning",

"Statistics"

];

case "finance":

return [

"Invoice",

"Transaction",

"Revenue"

];

default:

return [

"Dashboard"

];

}

}

}

export default new SidebarService();
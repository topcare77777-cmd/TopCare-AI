import Session
from "../auth/user.session.js";


class DashboardLoader {



load(){


const user=
Session.get();



if(!user){

return "/index.html";

}



switch(user.role){



case "admin":

return "/dashboard/admin";



case "creator":

return "/creator/dashboard";



case "member":

return "/dashboard/member";



default:

return "/index.html";


}



}



go(){


window.location.href=
this.load();



}



}



export default new DashboardLoader();
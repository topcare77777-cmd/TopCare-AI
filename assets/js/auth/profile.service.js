import Session
from "./user.session.js";


class ProfileService {



getProfile(){


return Session.get();


}



update(data){


const user =
Session.get();



if(!user)

return false;



const updated={

...user,

...data

};



Session.save(
updated
);



return updated;



}



}



export default new ProfileService();
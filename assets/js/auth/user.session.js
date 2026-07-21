import Storage 
from "../security/secure.storage.js";


class UserSession {


constructor(){

this.key="current_user";

}



save(user){


Storage.set(
this.key,
user
);


}



get(){


return Storage.get(
this.key
);


}



remove(){


Storage.remove(
this.key
);


}



isLogin(){


return this.get() !== null;


}



role(){


const user =
this.get();



return user?.role || "guest";


}



}



export default new UserSession();
import Storage
from "../security/secure.storage.js";


class RegisterService {



register(data){


let users =
Storage.get(
"users"
);



if(!users){

users=[];

}



const user={


id:
Date.now(),


name:data.name,


email:data.email,


password:data.password,


role:"member",


created:
new Date()
.toISOString()


};



users.push(user);



Storage.set(
"users",
users
);



return user;



}



}



export default new RegisterService();
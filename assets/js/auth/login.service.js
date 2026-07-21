import Storage
from "../security/secure.storage.js";


class LoginService {



login(email,password){



const users =
Storage.get(
"users"
)
|| [];



const user =
users.find(

item=>

item.email===email
&&
item.password===password

);



return user || null;



}



}



export default new LoginService();
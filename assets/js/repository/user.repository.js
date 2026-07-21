import BaseRepository
from "./base.repository.js";



class UserRepository
extends BaseRepository{


constructor(){

super(
"users"
);

}





async findEmail(email){


const users =
await this.all();



return users.find(

user =>
user.email===email

);


}





}



export default new UserRepository();
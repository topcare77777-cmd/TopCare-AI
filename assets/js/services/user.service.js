import JsonDatabase
from "../core/json.database.js";

class UserService{

async login(

email,
password

){

const users=

await JsonDatabase.load(

"users"

);

const user=

users.find(

u=>

u.email===email &&
u.password===password

);

return user??null;

}

}

export default new UserService();
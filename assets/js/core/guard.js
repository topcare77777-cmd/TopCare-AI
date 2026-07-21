import Permission
from "./permission.js";

class Guard{

admin(){

return Permission.admin();

}

creator(){

return Permission.creator();

}

finance(){

return Permission.finance();

}

member(){

return Permission.member();

}

guest(){

return Permission.guest();

}

}

export default new Guard();
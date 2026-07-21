class Permission {


constructor(){

this.role="guest";

}



setRole(role){

this.role=role || "guest";

}



getRole(){

return this.role;

}



allow(permission){


const rules={


guest:[

"read"

],


member:[

"read",
"profile",
"comment",
"course"

],


creator:[

"read",
"profile",
"comment",
"course",
"publish",
"product",
"earning"

],


admin:[

"read",
"profile",
"comment",
"course",
"publish",
"product",
"earning",
"manage",
"user",
"setting"

]


};



return rules[this.role]
?.includes(permission)
||
false;



}



}



export default new Permission();
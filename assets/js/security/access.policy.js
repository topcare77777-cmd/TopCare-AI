const AccessPolicy={


"/dashboard/admin":{

role:[
"admin"
]

},



"/dashboard/member":{

role:[
"member",
"creator",
"admin"
]

},



"/creator/dashboard":{

role:[
"creator",
"admin"
]

},



"/creator/store":{

role:[
"creator",
"admin"
]

},



"/premium":{

role:[
"member",
"creator",
"admin"
]

}



};



export default AccessPolicy;
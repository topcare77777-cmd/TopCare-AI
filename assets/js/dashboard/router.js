class DashboardRouter{

routes=new Map();

register(path,module){

this.routes.set(path,module);

}

async open(path){

const module=this.routes.get(path);

if(!module){

console.error("Module not found");

return;

}

await module.mount();

}

}

export default new DashboardRouter();
import Container from "./container.js";

class ServiceManager{

    register(name,service){

        Container.singleton(name,()=>new service());

    }

    get(name){

        return Container.resolve(name);

    }

}

export default new ServiceManager();
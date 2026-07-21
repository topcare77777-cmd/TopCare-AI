class Registry {

    constructor(){
        this.items=new Map();
    }

    add(name,value){
        this.items.set(name,value);
    }

    get(name){
        return this.items.get(name);
    }

    remove(name){
        this.items.delete(name);
    }

    has(name){
        return this.items.has(name);
    }

    all(){

        return [...this.items.values()];

    }

}

export default new Registry();
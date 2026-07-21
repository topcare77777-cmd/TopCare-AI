class Events{

    constructor(){

        this.events={};

    }

    on(event,callback){

        if(!this.events[event])
            this.events[event]=[];

        this.events[event].push(callback);

    }

    off(event,callback){

        if(!this.events[event]) return;

        this.events[event]=this.events[event]
        .filter(c=>c!==callback);

    }

    emit(event,data={}){

        if(!this.events[event]) return;

        this.events[event]
            .forEach(cb=>cb(data));

    }

}

export default new Events();
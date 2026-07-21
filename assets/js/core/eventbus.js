class EventBus {

    constructor() {

        this.events = {};

    }

    on(event, callback) {

        if (!this.events[event])

            this.events[event] = [];

        this.events[event].push(callback);

    }

    emit(event, payload) {

        (this.events[event] || []).forEach(fn => fn(payload));

    }

}

export default new EventBus();
class Store {

    constructor(initialState = {}) {

        this.state = structuredClone(initialState);
        this.listeners = [];

    }

    get(key) {

        return key ? this.state[key] : this.state;

    }

    set(key, value) {

        this.state[key] = value;

        this.notify();

    }

    update(data = {}) {

        Object.assign(this.state, data);

        this.notify();

    }

    subscribe(callback) {

        this.listeners.push(callback);

        return () => {

            this.listeners =
                this.listeners.filter(fn => fn !== callback);

        };

    }

    notify() {

        this.listeners.forEach(fn => fn(this.state));

    }

}

export default Store;
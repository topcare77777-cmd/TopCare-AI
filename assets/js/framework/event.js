class EventSystem {

    on(selector, event, callback) {

        document.addEventListener(event, e => {

            if (e.target.matches(selector))

                callback(e);

        });

    }

}

export default new EventSystem();
class Animation {

    fadeIn(element) {

        element.animate([

            { opacity: 0 },

            { opacity: 1 }

        ], {

            duration: 300,

            fill: "forwards"

        });

    }

    fadeOut(element) {

        element.animate([

            { opacity: 1 },

            { opacity: 0 }

        ], {

            duration: 300,

            fill: "forwards"

        });

    }

}

export default new Animation();
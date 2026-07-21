/**
 * ==========================================================
 * TopCare AI
 * CMS Form Builder Engine
 * ==========================================================
 *
 * File    : form.js
 * Module  : CMS Core
 * Version : 1.0.0
 *
 * Dependency:
 * - cms.js
 * - validator.js
 *
 * ==========================================================
 */

"use strict";


import CMS from "./cms.js";

import Validator from "./validator.js";



class FormBuilder {


    /**
     * Private state
     */
    #config = {};

    #fields = new Map();

    #element = null;

    #submitHandler = null;

    #errors = {};

    #mounted = false;

    #loading = false;



    /**
     * Constructor
     */
    constructor(config = {}) {


        this.#config = {

            id:

                config.id ??

                "cms-form-" +

                Date.now(),


            fields:

                config.fields ??

                [],


            className:

                config.className ??

                "",


            submitText:

                config.submitText ??

                "Submit"


        };



        this.registerFields(

            this.#config.fields

        );



    }




    /**
     * Register field list
     */
    registerFields(fields = []) {


        for (

            const field

            of fields

        ) {


            this.addField(field);


        }


        return this;


    }





    /**
     * Add field
     */
    addField(field = {}) {


        if (

            !field.name

        ) {


            throw new Error(

                "Field wajib memiliki name."

            );


        }



        this.#fields.set(

            field.name,

            {


                type:

                    field.type ??

                    "text",


                label:

                    field.label ??

                    field.name,


                value:

                    field.value ??

                    "",


                rules:

                    field.rules ??

                    [],


                placeholder:

                    field.placeholder ??

                    ""


            }

        );



        return this;


    }





    /**
     * Remove field
     */
    removeField(name) {


        return this.#fields.delete(

            name

        );


    }





    /**
     * Get field
     */
    field(name) {


        return this.#fields.get(

            name

        ) ?? null;


    }





    /**
     * Generate HTML
     */
    render() {


        const wrapper =

            document.createElement(

                "form"

            );



        wrapper.id =

            this.#config.id;



        wrapper.className =

            this.#config.className;



        wrapper.noValidate = true;



        for (

            const field

            of this.#fields.values()

        ) {


            wrapper.appendChild(

                this.createField(

                    field

                )

            );


        }




        const button =

            document.createElement(

                "button"

            );



        button.type =

            "submit";



        button.textContent =

            this.#config.submitText;



        wrapper.appendChild(

            button

        );



        wrapper.addEventListener(

            "submit",

            event => {


                event.preventDefault();



                this.handleSubmit();


            }

        );



        return wrapper;


    }





    /**
     * Create field element
     */
    createField(field) {


        const group =

            document.createElement(

                "div"

            );



        group.className =

            "cms-form-group";



        const label =

            document.createElement(

                "label"

            );



        label.textContent =

            field.label;



        const input =

            document.createElement(

                "input"

            );



        input.name =

            field.name;



        input.type =

            field.type;



        input.value =

            field.value;



        input.placeholder =

            field.placeholder;



        group.appendChild(

            label

        );


        group.appendChild(

            input

        );



        return group;


    }
    




    /**
     * Mount form to DOM
     */
    mount(container) {


        if (typeof container === "string") {


            container =

                document.querySelector(container);


        }



        if (!container) {


            throw new Error(

                "Form container tidak ditemukan."

            );


        }




        this.#element =

            this.render();



        container.appendChild(

            this.#element

        );



        this.#mounted = true;



        CMS.emit(

            "form.mounted",

            {

                id:

                    this.#config.id

            }

        );



        return this;


    }





    /**
     * Get form element
     */
    element() {


        return this.#element;


    }





    /**
     * Collect form data
     */
    getData() {


        const data = {};



        if (!this.#element) {


            return data;


        }



        const inputs =

            this.#element.querySelectorAll(

                "[name]"

            );



        inputs.forEach(input => {


            data[input.name] =

                input.value;


        });



        return data;


    }





    /**
     * Set form data
     */
    setData(data = {}) {


        if (!this.#element) {


            return this;


        }




        Object.entries(data)

            .forEach(([key,value]) => {


                const input =

                    this.#element.querySelector(

                        `[name="${key}"]`

                    );



                if (input) {


                    input.value = value;


                }


            });



        return this;


    }





    /**
     * Validate form
     */
    async validate() {


        const rules = {};



        for (

            const [

                name,

                field

            ]

            of this.#fields

        ) {



            rules[name] =

                field.rules;


        }




        const result =

            await Validator.make(

                this.getData(),

                rules

            );



        this.#errors =

            result.errors;



        this.renderErrors();



        CMS.emit(

            "form.validation",

            result

        );



        return result;


    }





    /**
     * Render validation errors
     */
    renderErrors() {


        if (!this.#element) {


            return;


        }



        const old =

            this.#element.querySelectorAll(

                ".cms-error"

            );



        old.forEach(node => {


            node.remove();


        });




        Object.entries(this.#errors)

            .forEach(([field,messages]) => {



                const input =

                    this.#element.querySelector(

                        `[name="${field}"]`

                    );



                if (!input) {


                    return;


                }



                const error =

                    document.createElement(

                        "small"

                    );



                error.className =

                    "cms-error";



                error.textContent =

                    messages[0];



                input.parentNode.appendChild(

                    error

                );



            });


    }





    /**
     * Submit handler
     */
    submit(callback) {


        this.#submitHandler =

            callback;



        return this;


    }





    /**
     * Internal submit process
     */
    async handleSubmit() {


        if (this.#loading) {


            return;


        }




        const validation =

            await this.validate();



        if (!validation.valid) {


            CMS.emit(

                "form.failed",

                validation.errors

            );


            return;


        }



        this.setLoading(true);



        try {


            const data =

                this.getData();



            if (

                typeof this.#submitHandler ===

                "function"

            ) {


                await this.#submitHandler(

                    data,

                    this

                );


            }



            CMS.emit(

                "form.success",

                data

            );



        } catch(error) {


            CMS.emit(

                "form.error",

                error

            );


            throw error;


        } finally {


            this.setLoading(false);


        }



    }





    /**
     * Loading state
     */
    setLoading(status = false) {


        this.#loading = status;



        if (!this.#element) {


            return this;


        }




        const button =

            this.#element.querySelector(

                "button[type='submit']"

            );



        if (button) {


            button.disabled = status;



            button.dataset.loading =

                status

                    ? "true"

                    : "false";


        }



        CMS.emit(

            "form.loading",

            status

        );



        return this;


    }





    /**
     * Destroy form
     */
    destroy() {


        if (this.#element) {


            this.#element.remove();


        }




        this.#fields.clear();



        this.#errors = {};



        this.#element = null;



        this.#mounted = false;



        CMS.emit(

            "form.destroyed",

            {

                id:

                    this.#config.id

            }

        );



        return this;


    }

    




    /**
     * Reset form
     */
    reset() {


        if (!this.#element) {


            return this;


        }



        this.#element.reset();



        this.#errors = {};



        this.renderErrors();



        CMS.emit(

            "form.reset",

            {

                id:

                    this.#config.id

            }

        );



        return this;


    }





    /**
     * Return current values
     */
    values() {


        return this.getData();


    }





    /**
     * Set single field value
     */
    setFieldValue(name, value) {


        if (!this.#element) {


            return this;


        }



        const input =

            this.#element.querySelector(

                `[name="${name}"]`

            );



        if (input) {


            input.value = value;


        }



        return this;


    }





    /**
     * Get single field value
     */
    getFieldValue(name) {


        if (!this.#element) {


            return null;


        }



        const input =

            this.#element.querySelector(

                `[name="${name}"]`

            );



        return input

            ? input.value

            : null;


    }





    /**
     * Add validation rule dynamically
     */
    addRule(name, rule) {


        const field =

            this.#fields.get(name);



        if (!field) {


            throw new Error(

                `Field '${name}' tidak ditemukan.`

            );


        }



        field.rules.push(rule);



        return this;


    }





    /**
     * Enable form
     */
    enable() {


        if (!this.#element) {


            return this;


        }



        const elements =

            this.#element.querySelectorAll(

                "input,select,textarea,button"

            );



        elements.forEach(element => {


            element.disabled = false;


        });



        return this;


    }





    /**
     * Disable form
     */
    disable() {


        if (!this.#element) {


            return this;


        }



        const elements =

            this.#element.querySelectorAll(

                "input,select,textarea,button"

            );



        elements.forEach(element => {


            element.disabled = true;


        });



        return this;


    }





    /**
     * Return errors
     */
    errors() {


        return {

            ...this.#errors

        };


    }





    /**
     * Check mounted
     */
    isMounted() {


        return this.#mounted;


    }





    /**
     * Static factory
     */
    static create(config = {}) {


        return new FormBuilder(

            config

        );


    }


}





/**
 * Export
 */
export {

    FormBuilder

};



export default FormBuilder;
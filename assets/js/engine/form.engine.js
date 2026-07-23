/**
 * TopCare AI Platform V2.0.0
 * Form Engine
 * Path: assets/js/core/form.engine.js
 */
import Logger from '../core/logger.js';

const FormEngine = {
    validate(value, rules = {}) {
        if (rules.required && (!value || value.toString().trim() === '')) {
            return 'This field is required.';
        }
        if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return 'Invalid email address.';
        }
        if (rules.minLength && value.length < rules.minLength) {
            return `Minimum length is ${rules.minLength} characters.`;
        }
        return null;
    },

    serialize(formElement) {
        const formData = new FormData(formElement);
        const data = {};
        formData.forEach((value, key) => { data[key] = value; });
        return data;
    }
};

export default FormEngine;
/**
 * ==========================================================
 * TopCare AI
 * Validator Engine
 * ----------------------------------------------------------
 * Version : 1.0.0
 * Module  : CMS Core
 * License : Internal
 * ==========================================================
 */

"use strict";

/**
 * Validation Error
 */
export class ValidationError extends Error {

    constructor(message, field = null) {

        super(message);

        this.name = "ValidationError";

        this.field = field;

    }

}

/**
 * Validator Class
 */
export default class Validator {

    /**
     * Default messages
     */
    static messages = {

        required: "Field ini wajib diisi.",

        email: "Format email tidak valid.",

        phone: "Nomor telepon tidak valid.",

        url: "URL tidak valid.",

        numeric: "Harus berupa angka.",

        integer: "Harus berupa bilangan bulat.",

        float: "Harus berupa bilangan desimal.",

        boolean: "Harus bernilai true atau false.",

        string: "Harus berupa teks.",

        object: "Harus berupa object.",

        array: "Harus berupa array.",

        json: "Format JSON tidak valid.",

        min: "Nilai terlalu kecil.",

        max: "Nilai terlalu besar.",

        between: "Nilai di luar batas.",

        regex: "Format tidak sesuai.",

        slug: "Slug tidak valid.",

        password: "Password tidak memenuhi syarat.",

        image: "File harus berupa gambar.",

        file: "File tidak valid."

    };

    /**
     * Registered custom rules
     */
    static customRules = new Map();

    /**
     * Register custom rule
     */
    static extend(name, callback, message = "") {

        if (typeof callback !== "function") {

            throw new ValidationError(

                "Custom validator harus berupa function."

            );

        }

        this.customRules.set(

            name,

            {

                callback,

                message

            }

        );

    }

    /**
     * Validate schema
     */
    static async make(data = {}, rules = {}) {

        const errors = {};

        for (const field of Object.keys(rules)) {

            const value = data[field];

            const fieldRules = Array.isArray(rules[field])

                ? rules[field]

                : [rules[field]];

            for (const rule of fieldRules) {

                const result =

                    await this.validateRule(

                        field,

                        value,

                        rule,

                        data

                    );

                if (result !== true) {

                    if (!errors[field]) {

                        errors[field] = [];

                    }

                    errors[field].push(result);

                }

            }

        }

        return {

            valid:

                Object.keys(errors).length === 0,

            errors

        };

    }

    /**
     * Execute one rule
     */
    static async validateRule(

        field,

        value,

        rule,

        data

    ) {

        let name = rule;

        let parameter = null;

        if (
            typeof rule === "string" &&
            rule.includes(":")
        ) {

            const split = rule.split(":");

            name = split[0];

            parameter = split.slice(1).join(":");

        }

        if (this.customRules.has(name)) {

            const custom =

                this.customRules.get(name);

            const ok =

                await custom.callback(

                    value,

                    parameter,

                    data

                );

            return ok === true

                ? true

                : custom.message ||

                "Validasi gagal.";

        }

        const method =

            "rule" +

            name.charAt(0).toUpperCase() +

            name.slice(1);

        if (

            typeof this[method] !==

            "function"

        ) {

            throw new ValidationError(

                `Rule '${name}' belum tersedia.`

            );

        }

        return this[method](

            value,

            parameter,

            field,

            data

        );

    }

    /**
     * required
     */
    static ruleRequired(value) {

        if (

            value === undefined ||

            value === null ||

            value === ""

        ) {

            return this.messages.required;

        }

        return true;

    }

    /**
     * email
     */
    static ruleEmail(value) {

        if (

            value === undefined ||

            value === null ||

            value === ""

        ) {

            return true;

        }

        const regex =

            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(value)

            ? true

            : this.messages.email;

    }

    /**
     * phone
     */
    static rulePhone(value) {

        if (

            value === undefined ||

            value === ""

        ) {

            return true;

        }

        const regex =

            /^[0-9+\-() ]{8,20}$/;

        return regex.test(value)

            ? true

            : this.messages.phone;

    }

    /**
     * url
     */
    static ruleUrl(value) {

        if (

            value === undefined ||

            value === ""

        ) {

            return true;

        }

        try {

            new URL(value);

            return true;

        } catch {

            return this.messages.url;

        }

    }

    /**
 * numeric
 */
    static ruleNumeric(value) {

        if (value === undefined || value === null || value === "") {
            return true;
        }

        return !Number.isNaN(Number(value))
            ? true
            : this.messages.numeric;

    }

    /**
     * integer
     */
    static ruleInteger(value) {

        if (value === undefined || value === null || value === "") {
            return true;
        }

        return Number.isInteger(Number(value))
            ? true
            : this.messages.integer;

    }

    /**
     * float
     */
    static ruleFloat(value) {

        if (value === undefined || value === null || value === "") {
            return true;
        }

        const number = Number(value);

        return !Number.isNaN(number)
            ? true
            : this.messages.float;

    }

    /**
     * boolean
     */
    static ruleBoolean(value) {

        if (value === undefined || value === null || value === "") {
            return true;
        }

        if (
            typeof value === "boolean" ||
            value === 0 ||
            value === 1 ||
            value === "0" ||
            value === "1" ||
            value === "true" ||
            value === "false"
        ) {
            return true;
        }

        return this.messages.boolean;

    }

    /**
     * string
     */
    static ruleString(value) {

        if (value === undefined || value === null) {
            return true;
        }

        return typeof value === "string"
            ? true
            : this.messages.string;

    }

    /**
     * array
     */
    static ruleArray(value) {

        if (value === undefined || value === null) {
            return true;
        }

        return Array.isArray(value)
            ? true
            : this.messages.array;

    }

    /**
     * object
     */
    static ruleObject(value) {

        if (value === undefined || value === null) {
            return true;
        }

        if (
            typeof value === "object" &&
            !Array.isArray(value)
        ) {
            return true;
        }

        return this.messages.object;

    }

    /**
     * json
     */
    static ruleJson(value) {

        if (value === undefined || value === null || value === "") {
            return true;
        }

        try {

            JSON.parse(value);

            return true;

        } catch {

            return this.messages.json;

        }

    }

    /**
     * slug
     */
    static ruleSlug(value) {

        if (value === undefined || value === null || value === "") {
            return true;
        }

        const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

        return regex.test(value)
            ? true
            : this.messages.slug;

    }

    /**
     * regex
     */
    static ruleRegex(value, parameter) {

        if (value === undefined || value === null || value === "") {
            return true;
        }

        if (!parameter) {
            return true;
        }

        try {

            const regex = new RegExp(parameter);

            return regex.test(value)
                ? true
                : this.messages.regex;

        } catch {

            return "Regular expression tidak valid.";

        }

    }

    /**
     * min
     */
    static ruleMin(value, parameter) {

        if (value === undefined || value === null) {
            return true;
        }

        const limit = Number(parameter);

        if (typeof value === "number") {

            return value >= limit
                ? true
                : `Minimal ${limit}.`;

        }

        if (Array.isArray(value)) {

            return value.length >= limit
                ? true
                : `Minimal ${limit} item.`;

        }

        return String(value).length >= limit
            ? true
            : `Minimal ${limit} karakter.`;

    }

    /**
     * max
     */
    static ruleMax(value, parameter) {

        if (value === undefined || value === null) {
            return true;
        }

        const limit = Number(parameter);

        if (typeof value === "number") {

            return value <= limit
                ? true
                : `Maksimal ${limit}.`;

        }

        if (Array.isArray(value)) {

            return value.length <= limit
                ? true
                : `Maksimal ${limit} item.`;

        }

        return String(value).length <= limit
            ? true
            : `Maksimal ${limit} karakter.`;

    }

    /**
     * between
     */
    static ruleBetween(value, parameter) {

        if (value === undefined || value === null) {
            return true;
        }

        if (!parameter) {
            return true;
        }

        const [min, max] = parameter
            .split(",")
            .map(Number);

        const number = Number(value);

        if (Number.isNaN(number)) {
            return this.messages.numeric;
        }

        return number >= min && number <= max
            ? true
            : `Nilai harus di antara ${min} dan ${max}.`;

    }
    /**
 * password
 * Format:
 * - minimal 8 karakter
 * - minimal 1 huruf besar
 * - minimal 1 huruf kecil
 * - minimal 1 angka
 */
    static rulePassword(value) {

        if (value === undefined || value === null || value === "") {
            return true;
        }

        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        return regex.test(value)
            ? true
            : this.messages.password;

    }

    /**
     * confirmed
     *
     * rule:
     * confirmed:password_confirmation
     */
    static ruleConfirmed(value, parameter, field, data) {

        if (!parameter) {
            return true;
        }

        return value === data[parameter]
            ? true
            : "Konfirmasi tidak sesuai.";

    }

    /**
     * image
     */
    static ruleImage(value) {

        if (!value) {
            return true;
        }

        const allow = [

            "image/jpeg",

            "image/png",

            "image/webp",

            "image/gif",

            "image/svg+xml"

        ];

        if (typeof File !== "undefined" && value instanceof File) {

            return allow.includes(value.type)
                ? true
                : this.messages.image;

        }

        return true;

    }

    /**
     * file
     */
    static ruleFile(value) {

        if (!value) {
            return true;
        }

        if (typeof File === "undefined") {
            return true;
        }

        return value instanceof File
            ? true
            : this.messages.file;

    }

    /**
     * has error
     */
    static hasError(result, field) {

        return !!(
            result &&
            result.errors &&
            result.errors[field]
        );

    }

    /**
     * first error
     */
    static first(result, field) {

        if (!this.hasError(result, field)) {

            return null;

        }

        return result.errors[field][0];

    }

    /**
     * all errors
     */
    static all(result) {

        return result.errors || {};

    }

    /**
     * clear custom rules
     */
    static clearExtensions() {

        this.customRules.clear();

    }

    /**
     * set messages
     */
    static setMessages(messages = {}) {

        this.messages = {

            ...this.messages,

            ...messages

        };

    }

    /**
     * get messages
     */
    static getMessages() {

        return {

            ...this.messages

        };

    }

    /**
     * reset messages
     */
    static resetMessages() {

        this.messages = {

            required: "Field ini wajib diisi.",
            email: "Format email tidak valid.",
            phone: "Nomor telepon tidak valid.",
            url: "URL tidak valid.",
            numeric: "Harus berupa angka.",
            integer: "Harus berupa bilangan bulat.",
            float: "Harus berupa bilangan desimal.",
            boolean: "Harus bernilai true atau false.",
            string: "Harus berupa teks.",
            object: "Harus berupa object.",
            array: "Harus berupa array.",
            json: "Format JSON tidak valid.",
            min: "Nilai terlalu kecil.",
            max: "Nilai terlalu besar.",
            between: "Nilai di luar batas.",
            regex: "Format tidak sesuai.",
            slug: "Slug tidak valid.",
            password: "Password tidak memenuhi syarat.",
            image: "File harus berupa gambar.",
            file: "File tidak valid."

        };

    }

}
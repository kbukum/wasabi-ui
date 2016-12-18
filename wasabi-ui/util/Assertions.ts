import * as React from "react";
import Functions from "./Functions";
import Class from "../class/Class";
const toString = Object.prototype.toString;
/**
 * A singleton class which implements mostly used validation operations.
 */

export class Assertions extends Class {
    private checkerObject = {};
    private urlPattern;
    /**
     * url pattern explaining
     * "^(https?:\/\/)?"+ // protocol
     * "((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|"+ // domain name
     * "((\d{1,3}\.){3}\d{1,3}))"+ // OR ip (v4) address
     * "(\:\d+)?(\/[-a-z\d%_.~+]*)*"+ // port and path
     * "(\?[;&a-z\d%_.~+=-]*)?"+ // query string
     * "(\#[-a-z\d_]*)?$","i"); // fragment locater
     *
     * check if the string is url then
     * @type {RegExp}
     */
    constructor() {
        super();
        this.urlPattern = /^(([a-z]+:\/+)([^\/\s]*)([a-z0-9\-@\^=%&;\/~\+]*)[\?]?([^ #]*)#?([^ #]*))|((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))$/;
    }

    /**
     * Checks if the string is a valid URL.
     * @param {String} url string to check.
     * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
     * @returns {boolean} "true": is url , "false": is not url.
     * @throws exception if error is true and url provided is not valid.
     */
    isUrl(url: String, error: boolean): boolean {
        if (!this.urlPattern.test(url)) {
            if (error) {
                throw new Error(`Given url is not valid ! URL :${url}`);
            }
            return false;
        }
        return true;
    }

    /**
     * Checks is not undefined
     * @param {any} object to check
     * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
     * @returns {boolean} "true": is not undefined , "false": is undefined.
     * @throws exception if error is true and object provided is  undefined.
     */
    isNotUndefined(arg: any, error: boolean): boolean {
        if (arg === undefined) {
            if (error) {
                throw new Error("Given argument is undefined !");
            }
            return false;
        }
        return true;
    }

    /**
     * Checks is not undefined or null
     * @param {any} object to check
     * @param {boolean} error defines the return type of method. If it is true it will throw in case of error , else it will return false.
     * @returns {boolean} "true": is not undefined and null , "false": is undefined or null.
     * @throws exception if error is true and object provided is  undefined or null.
     */
    isNotUndefinedAndNull(arg: any, error: boolean): boolean {
        if (arg === undefined) {
            if (error) {
                throw new Error("Given argument is undefined !");
            }
            return false;
        }
        if (arg === null) {
            if (error) {
                throw new Error("Given argument is null !");
            }
            return false;
        }
        return true;
    }

    /**
     * Checks the func is Function
     * @param func
     * @param error
     * @returns {boolean}
     */
    isFunction(func: Function, error: boolean): boolean {
        if (this.isNotUndefined(func, error)) {
            let isFunc = this.checkerObject.toString.call(func) === "[object Function]";
            if (!isFunc) {
                if (error) {
                    throw new Error("Given argument is not a function !");
                }
                return false;
            }
            return true;
        }
        return false;
    }

    isNotEmpty(value: any, error: boolean): boolean {
        if(value && value !== "") {
            return true;
        }
        if (error) {
            throw new Error("Given argument is empty or null !");
        }
        return false;
    }
    /**
     * Checks func is not Anonymous function ( if function has no name then it is anonymous)
     * @param func
     * @param error
     * @returns {boolean}
     */
    isNotAnonymous(func: Function, error: boolean): boolean {
        if (this.isFunction(func, error)) {
            if (!this.isNotEmpty(Functions.getName(func), false)) {
                if (error) {
                    throw new Error("Given argument is a anonymous function !");
                }
                return false;
            }
            return true;
        }
        return false;
    }

    isString(value: string, error: boolean): boolean {
        if (typeof value === "string") {
            return true;
        }
        if (error) {
            throw new Error(`Given argument (${value}) is not a string !`)
        }
        return false;
    }

    /**
     * Checks is integer or not
     * @param n
     * @param error
     * @returns {boolean}
     */
    isInteger(n: number, error: boolean): boolean {
        /* eslint-disable eqeqeq */
        if (!(Number(n) == n && n % 1 === 0)) {
            if (error) {
                throw new Error("Given argument is not a integer !");
            }
            return false;
        }
        return true;
    }

    /**
     * Checks instance is React Component or not.
     * @param {Object} instance
     * @param {boolean} error
     * @returns {boolean}
     */
    isReactComponent(instance: any, error: boolean): boolean {
        /* disable-eslint no-underscore-dangle */
        if (!(instance && instance["$$typeof"])) {
            if (error) {
                throw new Error(`Given component is not a react component ! Component :${instance}`);
            }
            return false;
        }
        return true;
    }
    /**
     * Checks Class is extended from React.Component or not.
     * @param {Object} instance
     * @param {boolean} error
     * @returns {boolean}
     */
    isReactComponentClass(clazz: Function, error: boolean): boolean {
        if (!(this.checkerObject.isPrototypeOf.call(React.Component, clazz))) {
            if (error) {
                throw new Error(`Given component class is not a React.Component ! Class :${clazz}`);
            }
            return false;
        }
        return true;
    }

    /**
     * Checks given value type is Number, Boolean, Array, String, Date, RegExp, Null, Function, Undefined
     * @param obj
     * @param error
     * @returns {boolean}
     */
    isKnownType(obj: Object, error: boolean) {
        switch (toString.call(obj)) {
            case "[object Number]":
            case "[object Boolean]":
            case "[object Array]":
            case "[object String]":
            case "[object Date]":
            case "[object RegExp]":
            case "[object Null]":
            case "[object Function]":
            case "[object Undefined]":
                return true;
            default :
                if (error) {
                    throw new Error(`Given object is unknown ! Object:  ${obj}`);
                }
                return false;

        }
    }
}

export default new Assertions();

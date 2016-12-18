const toString = Object.prototype.toString;

const TYPE_PREFIX = "[object ";

const NATIVE_TYPES = {
    "[object Number]": Number,
    "[object Boolean]": Boolean,
    "[object Array]": Array,
    "[object String]": String,
    "[object Date]": Date,
    "[object RegExp]": RegExp,
    "[object Null]": "Null",
    "[object Function]": Function,
    "[object Undefined]": "Undefined",
    "[object FormData]": FormData,
    "[object File]": File
};


const TO_STRING = {
    Number: "[object Number]",
    Boolean: "[object Boolean]",
    Array: "[object Array]",
    String: "[object String]",
    Date: "[object Date]",
    RegExp: "[object RegExp]",
    Null: "[object Null]",
    Function: "[object Function]",
    Undefined: "[object Undefined]",
    FormData: "[object FormData]",
    File: "[object File]"
};

export default class Types {

    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isNumber(element: any): boolean {
        return toString.call(element) === TO_STRING.Number;
    }
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isBoolean(element: any): boolean {
        return toString.call(element) === TO_STRING.Boolean;
    }
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isArray(element: any): boolean {
        return toString.call(element) === TO_STRING.Array;
    }
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isString(element: any): boolean {
        return toString.call(element) === TO_STRING.String;
    }
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isDate(element: any): boolean {
        return toString.call(element) === TO_STRING.Date;
    }
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isRegExp(element: any): boolean {
        return toString.call(element) === TO_STRING.RegExp;
    }
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isNull(element: any): boolean {
        return toString.call(element) === TO_STRING.Null;
    }
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isFunction(element: any): boolean {
        return toString.call(element) === TO_STRING.Function;
    }
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isUndefined(element: any): boolean {
        return toString.call(element) === TO_STRING.Undefined;
    }
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isFormData(element: FormData): boolean {
        return toString.call(element) === TO_STRING.FormData;
    }
    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static isFile(element: File): boolean {
        return toString.call(element) === TO_STRING.File;
    }

}

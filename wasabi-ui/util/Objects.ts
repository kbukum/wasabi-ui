import Assertions from "./Assertions";
import Types from "./Types";
import Arrays, { ForEachCallback } from "./Arrays";

const hasOwnProperty = Object.prototype.hasOwnProperty;
const toString = Object.prototype.toString;

export interface ObjectForEachCallback {
    (item: Object, key: string, items: Object ): boolean | any;
};

/**
 * A singleton class which implements mostly used json object operations.
 *
 * @class Objects
 */
class Objects {

    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static getLength(item: any) {
        if(Types.isArray(item)) {
            return item.length;
        } else if(Types.isObject(item)) {
            let i = 0;
            for(let key in  item) {
                if(hasOwnProperty.call(item, key)) {
                   i++;
                }
            }
            return i;
        } else if(Types.isString(item)) {
            return (<string>item).length;
        }
        return null;
    }

    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static forEach(items: any, callback: (ForEachCallback | ObjectForEachCallback)) {
        if(Types.isArray(items)) {
            Arrays.forEach(items, <ForEachCallback>callback);
        } else if(items) {
            for(let key in  items) {
                if(hasOwnProperty.call(items, key)) {
                    let item = items[key];
                    if((<ObjectForEachCallback>callback)(item, key, items) === false) {
                        break;
                    }
                }
            }
        }
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     *
     * @description Checks equal the string value of the given source  and  the string value of the given destination object( dest )
     *
     * @param {any} src Source object to compare the equality
     * @param {any} dest Destination object to compare the equality
     * @returns : {boolean} if the string value of the given source equals the string value of the given destination then "true" else "false"
     */
    static equals(src: Object, dest: Object): boolean {
        return JSON.stringify(src) === JSON.stringify(dest);
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
     *
     * @description creates and returns clone of the given source object ( src )
     *
     * @param src the given source object
     * @returns the clonse of the given source object
     */
    static deepCopy(src: Object): Object {
        return JSON.parse(JSON.stringify(src));
    }

    /* Returns the approximate memory usage, in bytes, of the specified object. The
     * parameter is:
     * object - the object whose size should be determined
     */
    static sizeOf(object: Object): number {
        // initialise the list of objects and size
        let size = 0;
        // loop over the objects
        switch (typeof object) {
            // the object is a boolean
            case "boolean":
                size += 4;
                break;
            // the object is a number
            case "number":
                size += 8;
                break;
            // the object is a string
            case "string":
                size += 2 * (<string>object).length;
                break;
            // the object is a generic object
            case "object":
                // if the object is not an array, add the sizes of the keys
                if (toString.call(object) !== "[object Array]") {
                    for (let key in object) {
                        if (hasOwnProperty.call(object, key)) {
                            size += 2 * key.length;
                            size += Objects.sizeOf(object[key]);
                        }
                    }
                } else { // array objects
                    let obj = <Array<any>>object;
                    for (let i = 0; i < obj.length; i += 1) {
                        size += Objects.sizeOf(obj[i]);
                    }
                }
                break;
            default:
        }
        // return the calculated size
        return size;
    }

    /**
     *
     * @param object
     * @param key
     * @returns {boolean}
     */
    static getTypeName(object: Object) {
        return Types.getTypeName(object);
    }

    /**
     *
     * @param object
     * @param key
     * @returns {boolean}
     */
    static hasProperty(object: Object, key: string) {
        return hasOwnProperty.call(object, key);
    }

    /**
     *
     * @param src
     * @param dest
     * @param references
     * @param cloneNativeTypes
     * @returns {Object}
     */
    static mergeClone(src: any, dest: Object, references: Array<Function>, cloneNativeTypes: boolean): any {
        if (src == null) return dest;
        if (dest == null) return Objects.clone(src, references, cloneNativeTypes);
        for (let key in src) {
            if (Objects.hasProperty(src, key)) {
                let destProp = dest[key];
                destProp = destProp ?
                    Objects.mergeClone(src[key], destProp[key], references, cloneNativeTypes) :
                    Objects.clone(src[key], references, cloneNativeTypes);
                dest[key] = destProp;
            }
        }
        return dest;
    }

    /**
     *
     * @param array
     * @param references
     * @param cloneNativeTypes
     * @return {Array<any>}
     */
    static cloneArray(array: Array<any>, references: Array<Function>, cloneNativeTypes: boolean): Array<any> {
        let destination = [];
        for (let i = 0; i < array.length; i += 1) {
            /* eslint-disable no-underscore-dangle */
            destination[i] = Objects.__clone(array[i], references, cloneNativeTypes);
        }
        return destination;
    }

    /**
     *
     * @param object
     * @param references
     * @param cloneNativeTypes
     * @returns {*}
     */
    static cloneObject(object: any, references: Array<Function>, cloneNativeTypes: boolean): Object {
        // React Component then return
        if (Assertions.isReactComponent(object, false)) {
            return object;
        }
        // DOM Element
        if (object.nodeType && Objects.getTypeName(object.cloneNode) === "Function") {
            return object;
        }
        let destination = {};
        for (let key in object) {
            if (hasOwnProperty.call(object, key)) {
                destination[key] = Objects.__clone(object[key], references, cloneNativeTypes);
            }
        }
        return destination;
    }

    /**
     *
     * @param src
     * @param references
     * @param cloneNativeTypes
     * @returns {Object}
     */
    static clone(src: Object, references: Array<Function>, cloneNativeTypes: boolean): Object {
        /* eslint-disable no-underscore-dangle */
        return Objects.__clone(src, references, cloneNativeTypes);
    }

    /**
     * @param src
     * @param cloneNativeTypes
     * @param references
     * @returns {*}
     * @private
     */
    static __clone(src: Object, references: Array<Function>, cloneNativeTypes: boolean): Object {
        /* eslint-disable no-underscore-dangle */
        let objectType = Objects.getTypeName(src);

        let cloneFunction = Types.getCloneFunction(objectType);
        if (cloneFunction) { // its native type
            return cloneNativeTypes === true ? cloneFunction(src) : src;
        }

        if (references) {
            for (let i = 0; i < references.length; i += 1) {
                if (typeof references[i] === "function" && src instanceof references[i]) {
                    return src;
                }
            }
        }
        switch (objectType) {
            case "Array":
                return Objects.cloneArray(<Array<any>>src, references, cloneNativeTypes);
            case "Object":
                return Objects.cloneObject(src, references, cloneNativeTypes);
            default:
                return src;
        }
    }
}

export default Objects;

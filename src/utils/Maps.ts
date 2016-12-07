import Assertions from "./Assertions";
import Class from "../class/Class";

const hasOwnProperty = Object.prototype.hasOwnProperty;

class Maps extends Class {
    remove(source: Object, key: string): Object {
        if(source) {
            for(let sourceKey in source) {
                if(hasOwnProperty.call(source, sourceKey) && key === sourceKey) {
                    delete source[sourceKey];
                }
            }
        }
        return source;
    };

    removeAll(source: Object, keys: Array<string>) {
        if(source) {
            for(let sourceKey in source) {
                if(hasOwnProperty.call(source, sourceKey) && keys.indexOf(sourceKey) !== -1) {
                    delete source[sourceKey];
                }
            }
        }
        return source;
    }

    /**
     * mixin src to the destination and return
     * @param src
     * @param dest
     */
    merge(src : Object, dest : Object): Object {
        for (const key in src) {
            if (hasOwnProperty.call(src, key)) {
                dest[key] = src[key];
            }
        }
        return dest;
    }

    /**
     * merges source object to destination object as recursive.
     * merges all map object which is property in source or destination.
     * holds all objects which is defined in destination if not defined
     * @example <caption>Sample mergeDeep.</caption>
     * // returns 2
     * <pre>
     * let src = {
     *    a: {
     *            aa: "aa"
     *        }
     *    };
     * let dest = {
     *        a: {
     *            bb: "bb"
     *        }
     *    };
     * let dest = Maps.mergeDeep(src, dest);

     * // result: { a: { aa: "aa", bb: "bb" } }
     * </pre>
     * @param src
     * @param dest
     */
    mergeDeep(src : Object, dest : Object): Object {
        for (const key in src) {
            if (hasOwnProperty.call(src, key)) {
                let destValue = dest[key];
                let sourceValue = src[key];
                if (Assertions.isKnownType(destValue, false) || Assertions.isKnownType(sourceValue, false)) {
                    dest[key] = src[key];
                } else {
                    dest[key] = this.mergeDeep(src[key], dest[key]);
                }
            }
        }
        return dest;
    }
}

export default new Maps();
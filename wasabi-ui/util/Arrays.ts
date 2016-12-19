/**
 * callback method for loop in Array.
 */
export interface ForEachCallback {
    (item: any, index: Number, items: Array<any> ): boolean | any;
}

/**
 *
 * Provides mostly used operations on Array.
 */
export default class Arrays {

    /**
     * @param items
     * @param callback
     * @return {boolean}
     */
    public static forEach(items: Array<any>, callback: ForEachCallback): boolean {
        if(items) {
            for(let i = 0 ; i < items.length; i++) {
                let item = items[i];
                if(callback(item, i, items) === false) {
                    break;
                }
            }
            return true;
        }
        return false;
    }
}
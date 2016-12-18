
export interface ForEachCallback {
    (item: any, index: Number, items: Array<any> ): boolean | any;
};

export default class Arrays {

    /**
     *
     * @param element
     * @return {boolean}
     * @public
     */
    public static forEach(items: Array<any>, callback: ForEachCallback) {
        if(items) {
            for(let i = 0 ; i < items.length; i++) {
                let item = items[i];
                if(callback(item, i, items) === false) {
                    break;
                }
            }
        }
    }
}
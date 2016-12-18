/**
 * A class which  implements __bindAll which binds all methods to the instance.
 * Essential to use at all classes if you don't want to use fat-arrows or manuel bindings.
 * @export
 * @class Class
 */
export default class Class {
    constructor() {
        this.bindAll(this);
    }
    /**
     * Binds all methods to the instance.
     * @param {Object} instance to bind
     */
    public bindAll(instance: Object) {
        let names = Object.getOwnPropertyNames(Object.getPrototypeOf(instance));
        for (let i = 0; i < names.length; i++) {
            let name = names[i];
            if (name !== "constructor" && typeof instance[name] === "function") {
                instance[name] = instance[name].bind(instance);
            }
        }
    }
}

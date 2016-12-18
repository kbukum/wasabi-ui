import Types from "./Types";

export default class Functions {
    static is(fn: Function) {
        return Types.isFunction(fn);
    }
    static getName(fn: any) {
        return fn.name;
    }
}


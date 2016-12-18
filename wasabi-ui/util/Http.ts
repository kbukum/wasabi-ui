///<reference path="../../typings/index.d.ts"/>

import * as $ from "robe-ajax";

export default class Http {
    static call(options) {
        return {
            then: (resolve, reject) => {
                $.ajax(options).then(resolve, reject);
            }
        }
    }
}
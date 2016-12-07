import * as React from "react";
import { BaseInput, BaseInputProp }from "./BaseInput"

export interface MoneyInputProp extends BaseInputProp {
    value?: number
}

export default class MoneyInput  extends BaseInput<MoneyInputProp> {
    static defaultProps = {
        type: "text"
    };
}
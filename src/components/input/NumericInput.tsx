import * as React from "react";
import { BaseInput, BaseInputProp }from "./base/BaseInput"

export interface NumericInputProp extends BaseInputProp {
    value?: number
}

export default class NumericInput  extends BaseInput<NumericInputProp> {
    static defaultProps = {
        type: "text"
    };

    protected onChange(e): boolean {
        let value = e.target.value;
        if (!value || value === "" || !isNaN(value)) {
                return super.onChange(e);
        }
        return false;
     }
}

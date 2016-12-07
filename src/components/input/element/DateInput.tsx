import * as React from "react";
import { BaseInput, BaseInputProp }from "./BaseInput"

export interface DateInputProp extends BaseInputProp {
    value?: string
}

export default class DateInput  extends BaseInput<DateInputProp> {
    static defaultProps = {
        type: "text"
    };
}
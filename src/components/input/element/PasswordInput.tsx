import * as React from "react";
import { BaseInput, BaseInputProp }from "./BaseInput"

export interface PasswordInputProp extends BaseInputProp {
    value?: string
}

export default class PasswordInput  extends BaseInput<PasswordInputProp>{
    static defaultProps = {
        type: "password"
    };
}

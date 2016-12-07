import * as React from "react";
import { BaseInput, BaseInputProp}from "./base/BaseInput"

export interface TextInputProp extends BaseInputProp {
    value?: string
}

export default class TextInput  extends BaseInput<TextInputProp> {
    static defaultProps = {
        type: "text"
    };
}

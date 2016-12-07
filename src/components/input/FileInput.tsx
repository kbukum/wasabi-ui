import * as React from "react";
import { BaseInput, BaseInputProp }from "./base/BaseInput"

export interface FileInputProp extends BaseInputProp {
    value?: number,
    multiple?: boolean
}

export default class FileInput  extends BaseInput<FileInputProp> {
    static defaultProps = {
        type: "file"
    };
}

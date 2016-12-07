import * as React from "react";
import { BaseInput, BaseInputProp }from "./BaseInput"

export interface DecimalInputProp extends BaseInputProp {
    value?: number,
    decimalSeparator?: string,

}

export default class DecimalInput  extends BaseInput<DecimalInputProp> {
    static defaultProps = {
        type: "text",
        decimalSeperator: "."
    };

    /**
     * Internal onchange handler for filtering numerics.
     */
    public onChange(e): boolean {
        let value = e.target.value;
        if (this.__isFloat(value) || value === "") {
            e.target.parsedValue = value;
            return super.onChange(e);
        }
        super.stopPropagation(e);
        return false;
    }

    __isFloat = (input: string): boolean => {
        if (input === null || input === undefined) {
            return false;
        }
        let found = input.match(`^[0-9]{1,6}((\\${this.props.decimalSeparator})|(\\${this.props.decimalSeparator}\\d{1,2}))?$`);
        return found !== undefined && found !== null;
    }
}

import * as React from "react";
import { FormGroup, ControlLabel, FormControl, Radio } from "react-bootstrap";
import MapsClone from "../../../utils/MapsClone";
import { BaseListInput, BaseListInputProp } from "./BaseListInput";

export interface RadioInputProp extends BaseListInputProp {
    type?: string,
    value?: string,
}

const checked = {
    checked: true
};

export default class RadioInput extends BaseListInput<RadioInputProp, Array<any>> {
    static defaultProps = {
        type: "radio",
        valueField: "value",
        textField: "text",
        items: [],
        value: null
    };

    protected renderItem(item: any, props: any, name: string): Object {
        return (
            <Radio
                name={name}
                {...props}
                {...(this.isChecked(item) ? checked: undefined)}
                onChange={this.onChange}
                value={item[0]}
            >
                {item[1]}
            </Radio>
        );
    }

    public isChecked(item: any): boolean {
        return  this.state.value === item[0];
    }
    public getValue(): Array<any> {
        return this.state.value;
    }

    public onChange(e): boolean {
        e.target.parsedValue = e.target.value;
        return super.onSuperChange(e);
    }
}



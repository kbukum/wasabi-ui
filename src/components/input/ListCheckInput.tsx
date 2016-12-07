import * as React from "react";
import { FormGroup, ControlLabel, FormControl, Checkbox } from "react-bootstrap";
import MapsClone from "../../utils/MapsClone";
import { BaseListInput, BaseListInputProp } from "./base/BaseListInput";

export interface ListCheckInputProp extends BaseListInputProp {
    type?: string,
    value?: Array<any>,
}

const checked = {
    checked: true
};

export default class ListCheckInput extends BaseListInput<ListCheckInputProp, Array<any>> {
    static defaultProps = {
        type: "checkbox",
        valueField: "value",
        textField: "text",
        items: [],
        value: []
    };

    protected renderItem(item: any, props: any, name: string): Object {
        return (
            <Checkbox
                name={name}
                {...props}
                {...(this.isChecked(item) ? checked: undefined)}
                onChange={this.onChange}
                value={item[0]}
            >
                {item[1]}
            </Checkbox>
        );
    }

    public isChecked(item: any): boolean {
        return  this.state.value.indexOf(item[0]) !== -1;
    }
    public getValue(): Array<any> {
        return this.state.value.slice(0);
    }

    public onChange(e): boolean {
        let value = this.getValue();
        let index = value.indexOf(e.target.value);
        if(index !== -1) {
            value.splice(index, 1);
        } else {
            value.push(e.target.value);
        }
        e.target.parsedValue = value;
        return super.onSuperChange(e);
    }
}


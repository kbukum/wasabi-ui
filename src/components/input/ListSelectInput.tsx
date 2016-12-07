import * as React from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import MapsClone from "../../utils/MapsClone";
import { BaseListInput, BaseListInputProp } from "./base/BaseListInput";

export interface ListSelectInputProp extends BaseListInputProp {
    type?: string,
    value?: Array<any>,
    multiple? : boolean
}

const selected = {
    selected: "selected"
};

export default class ListSelectInput extends BaseListInput<ListSelectInputProp, Array<any>> {
    static defaultProps = {
        multiple: true,
        type: "select",
        valueField: "value",
        textField: "text",
        items: [],
        value: []
    };

    protected renderItems(items: Array<any>, props: any): Object {
        return (
            <FormControl {...props} value={this.state.value} onChange={this.onChange} componentClass="select">
                {super.renderItems(items, props)}
            </FormControl>
        );
    }

    protected renderItem(item: any, props: any, name: string): Object {
        return (
            <option
                key={this.props.name + "_" + item[0]}
                value={item[0]}
            >
                {item[1]}
            </option>
        );
    }


    public isChecked(item: any): boolean {
        return  this.state.value.indexOf(item[0]) !== -1;
    }
    public getValue(): Array<any> {
        return this.state.value.slice(0);
    }

    protected onChange(e): boolean {
        var options = e.target.options;
        var value;
        if (this.props.multiple) {
            value = [];
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
        } else {
            value = e.target.value;
        }
        e.target.parsedValue = value;
        return super.onSuperChange(e);
    }
}

import * as React from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import MapsClone from "../../../utils/MapsClone";
import { InputComponent, InputProp }from "../InputComponent"


export interface BaseListInputProp extends InputProp {
    type?: string,
    label: string,
    value?: any,
    valueField?: string,
    textField?: string,
    items?: Array<any>
}


const checked = {
    checked:true
};


export abstract class BaseListInput<P extends BaseListInputProp, V>  extends InputComponent<P> {
    static defaultProps = {
        valueField: "value",
        textField: "text",
        items: [],
        value: []
    };

    render(){
        let props: any = MapsClone.removeAll(this.props, ["label", "value","items", "onChange","valueField","textField"]);
        return (
            <FormGroup>
                <ControlLabel>{this.props.label}</ControlLabel>
                {this.renderItems(this.props.items, props)}
            </FormGroup>
        )
    }

    protected renderItems(items: Array<any>, props: any): any {
        let renderItems: Array<Object> = [];
        if(!items || items.length === 0) {
            return renderItems;
        }

        let getValueAndText = BaseListInput.getValueAndTextFunction(items, this.props);

        for(let i = 0 ; i < items.length; i++) {
            let item = getValueAndText(items[i]);
            props.key = `${this.props.name}[${i}]`;
            renderItems[i] = this.renderItem(item, props, this.props.name);
        }
        return renderItems;
    }

    protected abstract renderItem(item: any, props: any, name: string): Object;
    protected abstract isChecked(item: any): boolean ;
    protected abstract getValue(): V;
    protected abstract onChange(e): boolean;
    protected onSuperChange(e): boolean {
        return super.onChange(e);
    }
    static getValueAndTextFunction(items: Array<any>, props): Function {
        let getValueAndText: Function;
        if(typeof items[0] === "string") {
            getValueAndText = (item: string): Array<any> => {
                return [item, item];
            }
        } else {
            getValueAndText = (item: Object) => {
                return [item[props.valueField], item[props.textField]];
            }
        }
        return getValueAndText;
    }
}


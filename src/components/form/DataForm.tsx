import * as React from "react";
import { Form, Panel } from "react-bootstrap";
import Maps from "../../utils/Maps";
import { InputComponent, InputProp } from "../input/base/InputComponent";
import BaseComponent from "../base/BaseComponent";
import ComponentManager from "../../manager/ComponentManager";

export interface DataFormProp {
    header?: string,
    fields: Array<any>
}

export class DataForm  extends BaseComponent<DataFormProp, {}> {
    static defaultProps = {
        header: null
    };
    render() {
        let form = (
            <Form>
                {this.renderElements(this.props.fields)}
            </Form>
        );
        if(this.props.header) {
            return (
                <Panel header={this.props.header} >
                    {form}
                </Panel>
            );
        }
        return form;
    }

    renderElements(fields: Array<any>): Array <Object> {
        let elements = [];
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (!field.name) {
                throw new Error("Column name must define !");
            }
            field.key = `${field.name}[${i}]`;
            elements[i] = this.renderElement(field);
        }
        return elements;
    }

    renderElement(field: any): Object {
        return  React.createElement(ComponentManager.getInputClassByType(field.type), field);
    }
}

export default DataForm;
import * as React from "react";
import { ClassInstance } from "../../class";
import Component from "../Component";


export interface DataListItemProp {
    fields: Array<any>,
    item: any,
    orderNumber: number
}

export interface DataListItemState {
    value?: any,
}

export default class DataListItem extends Component<DataListItemProp, DataListItemState> {
    constructor(props) {
        super(props);
        ClassInstance.bindAll(this);
    }

    render(){
        let elements = [];
        let field;
        let fields = this.props.fields;
        let item = this.props.item;
        if (this.props.orderNumber !== -1) {
            elements[0] = <td>{this.props.orderNumber}</td>;
        }
        for(let i = 0 ; i< fields.length; i++) {
            field = fields[i];
            elements[elements.length] =  <td>{field.onItemCellRenderer(field.name, item)}</td>;
        }
        return (
                <tr key={field.name}>
                    {elements}
                </tr>
        );
    }
}

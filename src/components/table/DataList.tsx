import * as React from "react";
import { Panel, Table } from "react-bootstrap";
import { ClassInstance } from "../../class";
import Component from "../Component";
import DataListItem from "./DataListItem";

export interface DataListProp {
    header?: string,
    fields: Array<any>,
    items?: Array<any>,
    order?: {
        show?: boolean,
        header?: string
    }
}

export interface DataListState {
    value?: any,
}

export class DataList extends Component<DataListProp, DataListState> {
    static defaultProps = {
        header: null,
        fields: [],
        items: [],
        order: {
            show: true,
            header: "#"
        }
    };

    private columnLength: number;
    constructor(props) {
        super(props);
        ClassInstance.bindAll(this);
        this.columnLength = this.props.fields ? this.props.fields.length : 0;
        this.mergeFields(this.props.fields);
    }


    render(){
        let table = (
            <Table striped bordered condensed hover responsive>
                {this.renderHeader(this.props.fields)}
                {this.renderBody(this.props.fields, this.props.items)}
            </Table>
        );
        if (this.props.header) {
           return (
               <Panel header={this.props.header}>
                   {table}
               </Panel>
           )
        }
        return table;
    }

    renderHeader(fields: Array<any>){
        let headerElements = [];
        if (this.props.order.show) {
            headerElements[0] = <th>{this.props.order.header}</th>;
        }

        for(let i = 0 ; i< fields.length; i++) {
            let field = fields[i];
            if (!field.label) {
               throw new Error("Title is required in field ! " + field.name);
            }
            headerElements[headerElements.length] = <th>{field.label}</th>;
        }
        return (
            <thead>
                <tr>
                    {headerElements}
                </tr>
            </thead>
        );
    }

    renderBody(fields, items){
        let elements = [];
        for(let i = 0 ; i < items.length; i++) {
            elements[i] = (
                <DataListItem
                    key={i}
                    fields={fields}
                    item={items[i]}
                    orderNumber={i + 1}
                />
            );
        }

        return (
            <tbody>
                {elements}
            </tbody>
        )
    }
    onItemCellRenderer(fieldName, item) {
        return item[fieldName];
    }

    mergeFields(fields) {
        for(let i = 0 ; i< fields.length; i++) {
            let field = fields[i];
            if (!field.onItemCellRenderer) {
                field.onItemCellRenderer = this.onItemCellRenderer;
            }
        }
    }
}


export default DataList;
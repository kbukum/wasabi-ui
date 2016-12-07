import * as React from "react";
import { Panel, Table, ButtonToolbar, ButtonGroup, Button, Glyphicon } from "react-bootstrap";
import { ClassInstance } from "../../class";
import Maps from "../../utils/Maps";
import Component from "../Component";
import { DataList, DataListProp } from "./DataList";
import { DataFormModal } from "../form/DataFormModal";
import { LayoutPosition } from "../../enum/Position";
import PlaceReplacer from "../layouts/PlaceReplacer";

export interface DataGridProp {
    header?: string,
    formHeader?: string,
    fields: Array<any>,
    propsOfFields? : any,
    items?: Array<any>,
    modal?: {
        show: boolean
    },
    order?: {
        show?: boolean,
        header?: string
    }
}

export class DataGrid extends Component<DataGridProp, {}> {
    static defaultProps = {
        header: null,
        formHeader: null,
        fields: [],
        propsOfFields: {},
        items: [],
        modal: {
            show: true
        },
        order: {
            show: true,
            header: "#"
        }
    };

    static Element = PlaceReplacer;

    private columnLength;
    private fields;
    private items;

    constructor(props) {
        super(props);
        ClassInstance.bindAll(this);
        this.columnLength = this.props.fields ? this.props.fields.length : 0;
        this.fields = this.props.fields;
        this.items = this.props.items;
        this.mergeFields(this.fields, this.props.propsOfFields);
    }


    render(){
        let table = (
            <DataList
                fields={this.fields}
                items={this.items}
                order={this.props.order}
            />
        );
        let dataForm = (
            <DataFormModal
                {...this.props.modal}
                show={false}
                header={this.props.formHeader}
                fields={this.fields}
            />
        );
        return (
            <Panel header={this.props.header} >
                {table}
                {dataForm}
                {this.props.children}
            </Panel>
        );
    }

    mergeFields(fields, propsOfFields) {
        for(let i = 0 ; i< fields.length; i++) {
            let field = fields[i];
            let propsOfField = propsOfFields[field.name];
            if (propsOfField) {
                field = Maps.mergeDeep(propsOfField, field);
            }
        }
    }
}

export default DataGrid;
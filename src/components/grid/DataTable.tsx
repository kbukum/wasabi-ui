import * as React from "react";
import { Panel } from "react-bootstrap";
import BaseComponent from "../base/BaseComponent";
import ReactUtil from "../../utils/ReactUtil";
import Maps from "../../utils/Maps";
import DataForm from "../form/DataForm";
import DataFormModal from "../form/DataFormModal";
import DataList from "../table/DataList";

import DataTableList from "./DataTableList";
import DataTableForm from "./DataTableForm";
import DataTableFormModal from "./DataTableFormModal";


export interface DataTableProp{
    header?: string,
    fields?: Array<any>,
    propsOfFields?: any,
    items?: Array<any>
}

export class DataTable extends BaseComponent<DataTableProp, {}> {
    static defaultProps = {
        header: null,
        fields: [],
        propsOfFields: {},
        items: []
    };

    static List: any = DataTableList;
    static Form: any = DataTableForm;
    static FormModal: any = DataTableFormModal;

    constructor(props) {
        super(props);
        this.mergeFields(this.props.fields, this.props.propsOfFields);
    }

    render() {
        let nodes: Array<any> = ReactUtil.getChildrenAsArray(this.props.children);

        /*
        for(let i = 0 ; i < nodes.length; i++) {
            let node = nodes[i];
            if(node.type.name) {
                switch (node.type.name) {
                    case DataTable.List.name:
                        nodes[i] = this.getDataTableList(node);
                        break;
                    case DataTable.Form.name:
                        nodes[i] = this.getDataTableForm(node);
                        break;
                    case DataTable.FormModal.name:
                        nodes[i] = this.getModalDataTableModalForm(node);
                        break;
                }
            }

        }
        */
        return  (
            <Panel header={this.props.header} >
                {nodes}
            </Panel>
        );
    }

    getDataTableList(node){
        return (
            <DataList
                {...node.props}
                fields={this.props.fields}
                items={this.props.items}
            />
        );
    }

    getDataTableForm(node) {
        return (
            <DataForm
                {...node.props}
                fields={this.props.fields}
            />
        )
    }

    getModalDataTableModalForm(node) {
        return (
            <DataFormModal
                {...node.props}
                fields={this.props.fields}
            />
        )
    }

    mergeFields(fields, propsOfFields) {
        for(let i = 0 ; i< fields.length; i++) {
            let field = fields[i];
            let propsOfField = propsOfFields[field.name];
            if (propsOfField) {
                field = Maps.mergeDeep(field, propsOfField);
            }
            fields[i] = field;
        }
    }
}



export default DataTable;
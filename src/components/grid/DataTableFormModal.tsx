import * as React from "react";
import Component from "../Component";

export interface DataTableFormModalProp {
    show?: boolean
}

class DataTableFormModal extends Component<DataTableFormModalProp, {}> {
    static defaultProps = {
        show: false
    };

    render(){
        return null;
    }
}
export  default DataTableFormModal;
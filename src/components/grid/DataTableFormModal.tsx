import * as React from "react";
import BaseComponent from "../base/BaseComponent";

export interface DataTableFormModalProp {
    show?: boolean
}

class DataTableFormModal extends BaseComponent<DataTableFormModalProp, {}> {
    static defaultProps = {
        show: false
    };

    doRender(){
        return null;
    }
}
export  default DataTableFormModal;
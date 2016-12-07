import * as React from "react";
import { Modal, Button } from "react-bootstrap";
import BaseComponent from "../base/BaseComponent";
import { DataForm , DataFormProp } from "./DataForm";
import ComponentManager from "../../manager/ComponentManager";



export interface DataFormModalProp extends DataFormProp {
    show: boolean,
    onCancel?: React.EventHandler<any>,
    cancelButtonText?: string,
    onSubmit?: React.EventHandler<any>
    submitButtonText?: string
}

export interface  DataFormModalState {
    show: boolean
}

export class DataFormModal  extends BaseComponent<DataFormModalProp, DataFormModalState> {
    static defaultProps = {
        header: null,
        show: false
    };

    constructor(props) {
        super(props);
        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(props){
        this.state = {
            show: props.show
        }
    }
    render() {
        return (
            <Modal show={this.state.show} onHide={this.onHide}>
                <Modal.Header>
                    <Modal.Title>{this.props.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DataForm
                        fields={this.props.fields}
                    />
                </Modal.Body>
                {this.renderFooterButtons()}
            </Modal>
        )
    }

    renderElements(fields: Array<any>): Array <Object> {
        let elements = [];
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            if (!field.name) {
                throw new Error("Column name must define !");
            }
            elements[i] = this.renderElement(field);
        }
        return elements;
    }

    renderElement(field: any): Object {
        return  React.createElement(ComponentManager.getInputClassByType(field.type), field);
    }

    onHide(e) {
        console.log(e);
    }
    private renderFooterButtons(): any {
        let showCancelButton = ((this.props.cancelButtonText) ?
            <Button onClick={this.props.onCancel}>{this.props.cancelButtonText}</Button> : null);
        let showSaveButton = ((this.props.submitButtonText) ?
            <Button bsStyle="primary" onClick={this.onSubmit}>{this.props.submitButtonText}</Button> : null);

        return (
            <Modal.Footer>
                {showCancelButton}
                {showSaveButton}
            </Modal.Footer>
        );
    };

    onSubmit(e){
        if(this.props.onSubmit) {
            this.props.onSubmit(e);
        }
    }
}

export default DataFormModal;
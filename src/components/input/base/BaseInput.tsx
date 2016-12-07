import * as React from "react";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";
import { InputComponent , InputProp } from "./InputComponent";
import MapsClone from "../../../utils/MapsClone";

export interface BaseInputProp extends InputProp {
    name: string,
    label: string,
    type?: string,
    value?: any
}

export abstract class BaseInput<P extends BaseInputProp>  extends InputComponent<P> {
    protected elementProps: any;
    constructor(props) {
        super(props);
        this.elementProps = MapsClone.removeAll(this.props,["onChange", "decimalSeperator"]);
    }
    componentWillReceiveProps(props){
        this.elementProps = MapsClone.removeAll(this.props, ["onChange", "decimalSeperator"]);
        super.componentWillReceiveProps(props);
    }

    render(){
        return (
            <FormGroup>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl {...this.elementProps} value={this.state.value} onChange={this.onChange} />
            </FormGroup>
        )
    }
}

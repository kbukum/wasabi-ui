import * as React from "react";
import { ClassInstance } from "../../class";
import Component from "../Component";

export interface InputProp {
    name: string,
    value?: any,
    onChange?: Function
}

export interface InputState {
    value?: any,
}
export abstract class InputComponent<P extends InputProp>  extends Component<P, InputState>{
    constructor(props) {
        super(props);
        ClassInstance.bindAll(this);
        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(props){
        this.state = {
            value: this.props.value
        }
    }


    protected stopPropagation(e){
        if(e.preventDefault) {
            e.preventDefault();
            e.stopPropagation();
        }
        if(e.stopPropagation) {
            e.stopPropagation();
        }
    }
    protected onChange(e): boolean {
        e.oldValue = this.state.value;
        let isChanged = true;
        if (this.props.onChange) {
             isChanged = this.props.onChange(e) !== false;
        }
        if(isChanged) {
            this.setState({
                value: e.target.parsedValue ? e.target.parsedValue : e.target.value
            });
        } else {
            this.stopPropagation(e);
            return false;
        }
        return true;
    }
}
import * as React from "react";
import Component from "../Component";

interface InputComponentProps {
    [string: string]: any
}

abstract class InputComponentImpl<P extends InputComponentProps, S> extends Component<P, S> {

    private value;

    public constructor(props){
        super(props);
    }

    public getValue(){
        this.value;
    }
}

export { InputComponentProps, InputComponentImpl };
export default InputComponentImpl;
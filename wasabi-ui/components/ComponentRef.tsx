import * as React from "react";
import Component from "./Component";
import { load } from "../index";

export interface ComponentRefProps {
    [string: string]: any
    className: string,
    onLoad?: Function
}

export interface ComponentRefState {
    change: boolean,
    component: any
}


/**
 * Base component which wraps render function in a try catch structure
 * Any child components who extends from this component will get protection when
 * Exception thrown, so protect component life cycle.
 */
export default class ComponentRef <P extends ComponentRefProps> extends Component <P, ComponentRefState> {

    refs: {
        componentRef: any
    };

    public constructor(props: Object) {
        super(props);
        this.state = {
            change: false,
            component: null
        }
    }

    render(){
        if(!this.state.component) {
            return null;
        }
        let Component = this.state.component;
        return (
            <Component
                ref="componentRef"
                {...this.props}
            />
        )
    }

    change(data: any) {
        if(this.refs.componentRef.change) {
            this.refs.componentRef.change(data);
        }
     }


    public componentDidMount() {
        load(this.props.className, (component) => {
            this.setState({
                change: true,
                component
            })
        })
    }
}


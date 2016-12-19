import * as React from "react";
import * as ReactDOM from "react-dom";
import * as shallowCompare from "react-addons-shallow-compare";
import { ClassInstance } from "../class/index";
import Functions from "../util/Functions";

let compare = (shallowCompare as any);
if(compare.default) {
    compare = compare.default;
}

/**
 * Base component which wraps render function in a try catch structure
 * Any child components who extends from this component will get protection when
 * Exception thrown, so protect component life cycle.
 */

abstract class Component <P, S> extends React.Component <P, S> {
    /**
     *
     */
    refs: {
        [string: string]: any
    };
    /**
     * Creates an instance of BaseComponent.
     * @param {Object} props
     */
    public constructor(props: any) {
        super(props);
        ClassInstance.bindAll(this);
    }

    public render(): any {
         return this.props.children; 
    }

    /**
     * Returns class name of the component.
     * @return {string} name.
     */
    public getName (): string {
        return Functions.getName(this.constructor);
    }

    public getNode(element: any): any {
        return ReactDOM.findDOMNode(element);
    }

    /**
     * Decides ant update is necessary for re-rendering.
     * Compares old props and state objects with the newer ones without going deep.
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {boolean} "true" component shoud update ,"false" otherwise.
     */
    public shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
        return compare(this, nextProps, nextState);
    }
}

export default Component;


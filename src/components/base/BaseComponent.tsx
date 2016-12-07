import * as React from "react";
import * as shallowCompare from "react-addons-shallow-compare";
import Objects from "../../utils/Objects";
import { ClassInstance } from "../../class"

/**
 * Base component which wraps render function in a try catch structure
 * Any child components who extends from this component will get protection when
 * Exception thrown, so protect component life cycle.
 */
class BaseComponent<P, S> extends React.Component<P, S> {

    /**
     * Creates an instance of BaseComponent.
     * @param {Object} props
     */
    constructor(props: Object) {
        super(props);
        ClassInstance.bindAll(this);
    }

    /**
     * Renders component with its children tags.
     * @returns {string}
     */
    render(): any {
        return this.props.children;
    }

    /**
     * Returns class name of the component.
     * @return {string} name.
     */
    getName (): string {
        return this.constructor.name;
    }

    cloneState(): Object {
        return Objects.clone(this.state);
    }

    /**
     * Decides ant update is necessary for re-rendering.
     * Compares old props and state objects with the newer ones without going deep.
     * @param {Object} nextProps
     * @param {Object} nextState
     * @returns {boolean} "true" component shoud update ,"false" otherwise.
     */
    shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
        return shallowCompare(this, nextProps, nextState);
    }
}

export default BaseComponent;
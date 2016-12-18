import * as React from "react";
import Component from "./Component";
import { ClassInstance } from "../class/index";


export interface ActorProps {
    [string: string]: any
    parent: Actor<any, any>
}

/**
 * Base component which wraps render function in a try catch structure
 * Any child components who extends from this component will get protection when
 * Exception thrown, so protect component life cycle.
 */
export default class Actor <P extends ActorProps, S> extends Component <P, S> {
    static ACTOR_INSTANCES = 0 ;
    /**
     * Creates an instance of BaseComponent.
     * @param {Object} props
     */
    private actorId;
    private address;
    public constructor(props: any) {
        super(props);
        Actor.ACTOR_INSTANCES += 1;
        this.actorId = Actor.ACTOR_INSTANCES;
        if(this.props.parent) {
            this.address = this.props.parent.getAddress() + "/" + this.actorId;
        } else {
            this.address = "actor://" + this.actorId;
        }
    }

    public getAddress() {
        return this.address;
    }

    public componentDidMount() {

    }
}


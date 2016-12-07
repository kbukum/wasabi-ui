import * as React from "react";
import { ClassInstance } from "../../class";
import Component from "../Component";


export interface PlaceReplacerProp {
    name: string,

}

export default class PlaceReplacer extends Component<PlaceReplacerProp, {}> {
    constructor(props) {
        super(props);
        ClassInstance.bindAll(this);
    }

    render(){
        return null;
    }

    getProps() {
        return this.props
    }
}

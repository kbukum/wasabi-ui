import * as React from "react";
import { ClassInstance } from "../../class";
import BaseComponent from "../base/BaseComponent";


export interface PlaceReplacerProp {
    name: string,

}

export default class PlaceReplacer extends BaseComponent<PlaceReplacerProp, {}> {
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

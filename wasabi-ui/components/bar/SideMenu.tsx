import * as React from "react";
import {Accordion, Panel, ListGroup, ListGroupItem} from "react-bootstrap";
import Component from "../Component";
import "./SideMenu.scss";

export interface SideMenuItem {

}

export interface SideMenuProps {
    items?: Array<SideMenuItem>
    activeKey?: string
}

export interface SideMenuState {
    activeKey: string
}

export default class SideMenu extends Component <SideMenuProps, SideMenuState> {
    static defaultProps: SideMenuProps = {};

    public constructor(props) {
        super(props);
        this.state = {
            activeKey: props.activeKey
        }
    }

    render() {
        return (
           <div>MErhaba</div>
        );
    }

    public toggle() {

    }

    public search() {

        /// uncomment code for absolute positioning tweek see top comment in css
        //$('.absolute-wrapper').removeClass('slide-in');

    }

    public handleSelect(e) {

    }
}
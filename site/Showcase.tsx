import * as React from "react";
import { Grid, Row, Col, Jumbotron, Button, PageHeader} from "react-bootstrap";
import { Component, ComponentRef, NavMenu } from "./ComponentLinks";
import SearchBoxSample from "./input/SearchBoxSample";
const NAV_MENU = require("./menu/NavMenu.json");

export interface ShowCaseProps { }

export interface ShowCaseState { }


export default class ShowCase extends Component<ShowCaseProps, ShowCaseState>  {
    public constructor(props: any){
        super(props);
        NAV_MENU.search.onSearch = this.onSearch;
    }
    render() {
        return (
            <Grid>
                 <Row className="show-grid">
                 <Col>
                    <NavMenu
                        brand={NAV_MENU.brand}
                        leftItems={NAV_MENU.leftItems}
                        rightItems={NAV_MENU.rightItems}
                        search={NAV_MENU.search}
                    />
                 </Col>
                <Col xs={12} md={12}>
                    <SearchBoxSample />
                </Col>
                </Row>
                <Row className="show-grid">
                <Col xs={12} md={4}>
                </Col>
                <Col xs={12} md={8}>
                   <Jumbotron>
                        <h1>Hello, world!</h1>
                        <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                        <p><Button bsStyle="primary">Learn more</Button></p>
                    </Jumbotron>
                </Col>
            </Row>
        </Grid>
        );
    }

    private onSearch(e){
        console.log(e);
    }
}

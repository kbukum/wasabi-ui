import * as React from "react";
import { ListGroupItem, InputGroup, Glyphicon, FormGroup, FormControl, ButtonGroup, Button } from "react-bootstrap";
import InputComponent from "./InputComponent";
import Types from "../../util/Types";
import "./SearchBox.scss";

export interface Item {
    key: string,
    value: any
}

export interface SearchBoxProps {
    value?: Item,
    onSearch: Function,
    onClick?: Function
}

export default class AutoCompleteBox extends InputComponent<SearchBoxProps, any> {
    /**
     *
     * @type {{direction: string}}
     */
    public static defaultProps = {
        value: null
    };

    public constructor(props) {
        super(props);
        this.componentWillReceiveProps(props);
    }

    componentWillReceiveProps(nextProps) {
        let value = nextProps.value;
        this.state = {
            key: value,
            items: this.getItems(value)
        }
    }

    /**
     *
     * @return {any}
     */
    public render(){
        return (
            <ButtonGroup vertical className="dropdown-menu" style={{ padding: '0px', border:"0px" }}>
                <ListGroupItem>
                    <InputGroup>
                        <FormGroup>
                            <FormControl value={this.state.key} onChange={this.onSearch} type="text" className="search-query" placeholder="Search" />
                        </FormGroup>
                        <InputGroup.Button>
                            <Button><Glyphicon glyph="chevron-down" /></Button>
                            <Button><Glyphicon glyph="search" /></Button>
                        </InputGroup.Button>
                    </InputGroup>
                </ListGroupItem>
                {this.state.items}
            </ButtonGroup>
        )
    }


    public onSearch(e){
        this.setValue(e.target.value);
    }

    public onClick(value){
        let result = this.props.onClick? this.props.onClick(value): this.props.onSearch(value);
        this.setValue(value);
    }
    public setValue(value){
        value = (value && value.trim()) || "";
        this.setState({
            value: value,
            items: this.getItems(value)
        });
    }

    public getItems(value: string){
        let elements = [];
        let result = this.props.onSearch(value);
        if(Types.isArray(result)) {
            result.forEach((value: any, ) => {
                elements.push(<ListGroupItem onClick={this.onClick.bind(undefined, value)}>{value}</ListGroupItem>);
            });
        }
        return elements;
    }
}
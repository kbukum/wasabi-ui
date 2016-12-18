import * as React from "react";
import { ListGroupItem, InputGroup, Glyphicon, FormGroup, FormControl, ButtonGroup, Button } from "react-bootstrap";
import InputComponent from "./InputComponent";
import Types from "../../util/Types";
import "./SearchBox.scss";



export interface SearchBoxProps {
    value?: string,
    valueField?: string,
    template?: Function,
    onChange: Function,
    onSelect?: Function
}

export default class SearchBox extends InputComponent<SearchBoxProps, any> {
    /**
     *
     * @type {{direction: string}}
     */
    public static defaultProps = {
        value: ""
    };

    public constructor(props) {
        super(props);
        this.componentWillReceiveProps(props);
    }

    private templateRef;

    componentWillReceiveProps(nextProps) {
        let value = nextProps.value ? nextProps.value.trim(): "";
        this.state = {
            value: value,
            items: null
        };
        this.templateRef = this.props.template ? this.props.template: this.template;
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
                            <FormControl  value={this.state.value} onChange={this.onChange} type="text" className="search-query" placeholder="Search" />
                        </FormGroup>
                        <InputGroup.Button>
                            <Button><Glyphicon glyph="chevron-down" /></Button>
                            <Button><Glyphicon glyph="search" /></Button>
                        </InputGroup.Button>
                        </InputGroup>
                    </ListGroupItem>
                    { this.renderElements(this.state.items) }
            </ButtonGroup>
        )
    }

    public onChange(e){
        e.target.$self = this;
        this.props.onChange(this, e);
    }

    public change(state){
        this.setState(state);
    }

    public onSelect(value){
        let e = {
            $self: this,
            target: { value }
        };
        this.props.onSelect? this.props.onSelect(this, e): this.props.onChange(this, e);
    }

    public renderElements(items: Array<any>){
        let elements = [];
        if(Types.isArray(items)) {
            items.forEach((item: any) => {
                let element = this.renderElement(item);
                if(element) {
                    elements.push(element);
                }
            });
        }
        return elements;
    }

    public renderElement(item: any){
        let onSelectItem =  this.props.valueField ? item[this.props.valueField] : item;
        let onSelect = this.onSelect.bind(undefined, onSelectItem);
        return  <ListGroupItem onClick={onSelect}>{this.templateRef(onSelectItem)}</ListGroupItem>
    }

    public template(item: any): any {
        return item;
    }
}
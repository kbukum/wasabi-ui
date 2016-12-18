import * as React from "react";
import Component from "../Component";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, FormGroup, FormControl } from "react-bootstrap";


export interface Item {
    link?: string,
    text: string
}

export interface DropDown {
    title: string,
    items: Array<Item>
}

export interface Search {
    placeHolder: string,
    actionName?: string,
    direction: string,
    onSearch: Function
}

export interface NavMenuProps {
    // items: []
    brand?: Item,
    leftItems?: Array<DropDown | Item>,
    rightItems?: Array<any>
    direction?: string
    search?: Search
}

/**
 * NavMenu
 */
export default class NavMenu extends Component<NavMenuProps, any> {
    /**
     *
     * @type {{direction: string}}
     */
    public static defaultProps: NavMenuProps = {
        direction: "left"
    };
    /**
     *
     */
    refs: {
        searchInput: any;
    };
    /**
     * props: NavMenuProp
     */
    public constructor(props: NavMenuProps) {
        super(props); 
    }

    render(){
        let searchLeft = this.props.search && this.props.search.direction === "left";
        let searchRight = this.props.search && this.props.search.direction === "right";
        return (
            <Navbar collapseOnSelect>
                { this.props.direction === "left" ? NavMenu.createBrand(this.props.brand) : null}
                { searchLeft ? NavMenu.createSearch(this, this.props.search): null}
                <Nav>
                    { NavMenu.createItems(this.props.leftItems)}
                </Nav>
                <Nav pullRight>
                    { NavMenu.createItems(this.props.rightItems)}
                    { searchRight ? NavMenu.createSearch(this, this.props.search): null}
                </Nav>
                { this.props.direction === "right" ? NavMenu.createBrand(this.props.brand) : null}
            </Navbar>
        )
    }

    private static createBrand(brand: Item){
        if(!brand) return null;
        return (
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href={brand.link ? brand.link: "#"}>{brand.text}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
        )
    }

    private static createDropdown(dropdown: DropDown){
       return (
           <NavDropdown title={dropdown.title} id={dropdown.title}>
               { NavMenu.createItems(dropdown.items) }
           </NavDropdown>
       )
    }

    private static createItems(items: Array<any>){
        if(!items) return null;
        let elements = [];
        for(let i = 0 ; i < items.length; i+=1) {
            let item = items[i];
            if(item.title) {
                elements[elements.length] = NavMenu.createDropdown(item);
            } else {
                elements[elements.length] = NavMenu.createItem(item);
            }
        }
        return elements;
    }

    private static createDropDown(items: Array<Item>){
        let elements = [];
        for(let i = 0 ; i < items.length; i+=1) {
            elements[elements.length] = NavMenu.createItem(items[i]);
        }
        return elements;
    }

    private static createItem(item: Item){
        let element;
        if (item.text === "") {
            element = <MenuItem divider/>;
        } else if (item.link) {
            element =   <NavItem href={item.link}>{item.text}</NavItem>;
        }
        return element;
    }

    private static createSearch(me: NavMenu, search: Search){
        return (
                    <Navbar.Form className="navbar-nav">
                        <FormGroup>
                            <FormControl
                                ref="searchInput"
                                type="text"
                                placeholder={search.placeHolder}
                                onChange={!search.actionName ? me.onSearch: null}
                            />
                        </FormGroup>
                        {' '}
                        { search.actionName ?
                            <Button type="button" onClick={me.onSearch}>{search.actionName}</Button> :
                            null
                        }
                    </Navbar.Form>
        );
    }

    private onSearch(e) {
        let element = this.getNode(this.refs.searchInput);
        if(element.value != "") {
            this.props.search.onSearch({
                target: element
            });
        }
    }

}
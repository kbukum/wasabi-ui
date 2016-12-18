import * as React from "react";
import { Component, ComponentRef } from "../ComponentLinks";

export interface City {
    [string: string]: any,
    id: string,
    name: string
}

export default class SearchBoxSample extends Component<any, any> {

    render(){
       return (
           <ComponentRef className="./components/input/SearchBox" onChange={this.onChange}/>
       );
    }

    public onSelect($self, selectedItem: City ) {
        this.onChange($self, selectedItem.id);
    }
    public onChange($self: any, searchKey: string){
        console.log(searchKey);
    }
}
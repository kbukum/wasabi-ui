import * as React from "react";
import { Component, ComponentRef, Query, Filter, Operators, Http } from "../ComponentLinks";
import CityResource from "../resources/CityResource";


export interface City {
    [string: string]: any,
    id: string,
    name: string
}

const filter: Filter = {
    name: "name",
    operator: Operators.EQUALS,
    value: null
};

const filters: Array<Filter> = [
    filter
];

const query: Query = {
    filters
};

export default class SearchBoxSample extends Component<any, any> {

    render(){
       return (
           <ComponentRef className="./components/input/SearchBox" onChange={this.onChange} template={this.template}/>
       );
    }

    public onSelect($self, selectedItem: City ) {
        this.onChange($self, {
            target: {
                value: selectedItem.name
            }
        });
    }
    public onChange($self: any, searchKey: any){
        filter.value = searchKey.target.value;
        CityResource.getAll(
            query,
            (response) => {
                $self.change({
                    value: filter.value,
                    items: response
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    public template(item: any): any {
        console.log(item);
        return item.name;
    }
}
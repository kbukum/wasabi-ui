import * as React from "react";
import * as Input from "wasabi-ui/components/input";
import { Panel, Button } from "react-bootstrap";
import BaseComponent from "wasabi-ui/components/base/BaseComponent";
import DataForm from "wasabi-ui/components/form/DataForm";
import DataFormModal from "wasabi-ui/components/form/DataFormModal";
import DataList from "wasabi-ui/components/table/DataList";
import DataGrid from "wasabi-ui/components/table/DataGrid";
import DataTable from "wasabi-ui/components/grid/DataTable";

import { LayoutPosition } from "./enum/Position";

const fields = [
    {
        name: "username",
        label: "Name",
        type: "string"
    },
    {
        name: "password",
        label: "Şifre",
        type: "password"
    },
    {
        name: "birhtDay",
        label: "Birth Day",
        type: "date"
    },
    {
        name: "count",
        label: "Count",
        type: "decimal",

    },
    {
        name: "image",
        multiple: false,
        label: "Profile Photo",
        type: "file"
    },
    {
        name: "likes",
        label: "Sevdiğiniz filmler",
        type: "check"
    },
    {
        name: "theBestFilm",
        label: "En iyi film",
        type: "radio"
    },
    {
        name: "watches",
        label: "Izledikleriniz",
        type: "select"
    },
    {
        name: "price",
        label: "Ücret",
        type: "money"
    },
    {
        name: "count_films",
        label: "Film Sayısı",
        type: "number"
    }
];


let items = [
    {
        username: "Kamil",
        password: "123123",
        birthDay: "24/03/1985",
        count: 1,
        image: null,


    },
    {
        username: "Kamil",
        password: "123123",
        birthDay: "24/03/1985",
        count: 1,
        image: null,


    },
    {
        username: "Kamil",
        password: "123123",
        birthDay: "24/03/1985",
        count: 1,
        image: null,


    }
];


export interface ComponentsState {
    show: boolean
}
export class Components extends BaseComponent<{}, ComponentsState>  {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }
    doRender() {
        return (
            <Panel header="Form Input Components">
                <Input.DateInput
                    name="kamil"
                    label="DateInput"
                    value="10/09/2016"
                />
                <Input.DecimalInput
                    name="kamil"
                    label="DecimalInput"
                    value={0.0}
                />
                <Input.ListCheckInput
                    name="kamil"
                    label="CheckInput"
                    items={[ "element","element2"]}
                    value={["element2"]}
                />
                <Input.ListRadioInput
                    name="kamil"
                    label="RadioInput"
                    items={[ "element","element2"]}
                    value={"element2"}
                />
                <Input.ListSelectInput
                    multiple={true}
                    label="SelectInput"
                    name="kamil"
                    items={[
                            "kam",
                            "had",
                            "bakalim",
                            "nasil",
                            "olacak"
                        ]}
                    value={[
                            "had",
                            "bakalim"
                        ]}
                />
                <Input.MoneyInput
                    name="kamil"
                    label="MoneyInput"
                />
                <Input.NumericInput
                    name="kamil"
                    label="NumericInput"
                    value={0}
                />
                <Input.PasswordInput
                    name="kamil"
                    label="PasswordInput"
                    value="kamil"
                />
                <Input.TextInput
                    name="kamil"
                    label="TextInput"
                />
                <DataForm
                    header="Data Form"
                    fields={fields}
                />
                <DataList
                    header="Data Form"
                    fields={fields}
                    items={items}
                />
                <DataGrid
                    header="Data Grid"
                    formHeader="Data Form"
                    fields={fields}
                    items={items}
                >
                </DataGrid>
                <DataTable
                    header="Data Grid"
                    fields={fields}
                    items={items}
                >
                    <DataTable.List />
                    <DataTable.FormModal
                        show={this.state.show}
                        header="Data Form"
                        cancelButtonText="Iptal"
                        submitButtonText="Gönder"
                    />
                    <Button onClick={this.onShow}>Show Modal</Button>
                </DataTable>
            </Panel>
        );
    }
    onShow(){
        this.setState({
            show: !this.state.show
        })
    }
}
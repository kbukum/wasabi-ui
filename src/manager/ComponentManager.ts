import * as React from "react";
import { InputComponent, InputProp } from "../components/input/InputComponent";
import Assertions from "../utils/Assertions";
import Class from "../class/Class";
import * as Input from "../components/input";


/**
 *
 */
class ComponentManager extends Class {

    private componentFinderNames = [];
    private componentFinders = [];
    private static typeMap = {
        date: "DateInput",
        decimal: "DecimalInput",
        file: "FileInput",
        check: "CheckInput",
        radio: "RadioInput",
        select: "SelectInput",
        money: "MoneyInput",
        number: "NumericInput",
        password: "PasswordInput",
        string: "TextInput"
    };

    constructor(){
        super();
        this.componentFinderNames.push("__standart");
        this.componentFinders.push(this.getInputClassByType);
    }


    public getInputClassByType (componentType: string): React.ComponentClass<any> {
        let componentClass;
        if (ComponentManager.typeMap[componentType]) {
            componentType = ComponentManager.typeMap[componentType];
        }
        componentClass = Input[componentType];
        if (!componentClass) {
           throw new Error("Unknown Component Type ! Type : " + componentType);
        }
        return componentClass;
    }
}
export default new ComponentManager();

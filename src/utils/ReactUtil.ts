import Class from "../class/Class";
import { ReactNode } from "react";

class ReactUtil extends Class {

    getChildrenAsArray(children: ReactNode): Array<ReactNode> {
        let nodes;
        let nodeLength = this.getChildrenLength(children);
        switch (nodeLength) {
            case 0:
                nodes = [];
                break;
            case 1:
                nodes = [children];
            default:
                nodes = children;
        }
        return nodes;
    }
    getChildByIndex(children: ReactNode, index: number) {
        if (children) {
            if(Array.isArray(children)) {
                return children[index];
            }
            return children;
        }
        return null;
    }

    getChildrenLength(children: ReactNode){
        if (children) {
            if(Array.isArray(children)) {
                return children.length;
            }
            return 1;
        }
        return 0;
    }
}

export default new ReactUtil();
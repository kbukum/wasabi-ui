import Class from "../class/Class";

const hasOwnProperty = Object.prototype.hasOwnProperty;

class MapsClone extends Class {
    remove = (source: Object, key: string): Object => {
        let newSource = {};
        if(source) {
            for(let sourceKey in source) {
                if(hasOwnProperty.call(source, sourceKey) && sourceKey !== key) {
                    newSource[sourceKey] = source[sourceKey];
                }
            }
        }
        return newSource;
    }

    removeAll = (source: Object, keys: Array<string>) => {
        let newSource = {};
        if(source) {
            for(let sourceKey in source) {
                if(hasOwnProperty.call(source, sourceKey) && keys.indexOf(sourceKey) === -1) {
                    newSource[sourceKey] = source[sourceKey];
                }
            }
        }
        return newSource;
    }
}

export default new MapsClone();
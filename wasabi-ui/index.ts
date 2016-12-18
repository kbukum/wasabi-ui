export  * from "./class";
export  * from "./components";
export  * from "./util";

declare let require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

const load = function (path, onLoaded) {
    require.ensure([], function() {
        path = path.replace("wasabi-ui", ".");
        let _component: any = require(path);
        onLoaded(_component.default ? _component.default : _component);
    });
};

export { load };

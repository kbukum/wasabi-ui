import { Http } from "../util";
import Resource, { ResourceProps } from "./Resource";
import Query from "../query/Query";
import { Enum } from "../types";
import Objects from "../util/Objects";

export class RemoteMethodType extends Enum<string> {
    public static readonly GET = new Enum("GET");
    public static readonly POST = new Enum("POST");
    public static readonly PUT = new Enum("PUT");
    public static readonly DELETE = new Enum("DELETE");
    public static readonly PATCH = new Enum("PATCH");
    public static readonly OPTIONS = new Enum("OPTIONS");
    public static readonly HEAD = new Enum("HEAD");
}

export interface RemoteResourceProps extends ResourceProps {
    url: string,
    getAll?: JQueryAjaxSettings
}


abstract class RemoteResource <E, I> extends Resource <RemoteResourceProps, E, I> {
    public constructor(props: RemoteResourceProps){
        super(props);
    }
    public getAll(query: Query, onSuccess: Function, onError: Function) {
        let defaultOptions = {
            url: this.getProps().url,
            type: RemoteMethodType.GET.toString()
        };

        let props:JQueryAjaxSettings = Objects.mergeClone(this.getProps().getAll, defaultOptions, undefined, false);

        Http.query(props,query, onSuccess, onError);
    }
}
export {
    RemoteResource
};
export default RemoteResource;
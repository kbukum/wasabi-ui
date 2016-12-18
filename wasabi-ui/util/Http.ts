///<reference path="../../typings/index.d.ts"/>
import * as $ from "robe-ajax";
import Query, { QueryBuilder, Filter, Sort, SortType } from "../query/Query";
import QueryBuilderImplJsonServer from "../query/QueryBuilderImplJsonServer";
import Objects from "./Objects";

let builder : QueryBuilder<string> = QueryBuilderImplJsonServer;


export default class Http {
    public static call(options: JQueryAjaxSettings) {
        return {
            then: (resolve, reject) => {
                $.ajax(options).then(resolve, reject);
            }
        }
    }

    public static query(options: JQueryAjaxSettings, query: Query,  resolve: Function, reject: Function) : (Array<any> | void) {
        let queryString = Http.queryToString(query);
        if(queryString && queryString !== "") {
            options = Objects.clone(options, undefined, false);
            options.url = options.url + "?" + queryString;
        }
        return Http.call(options).then(resolve, reject);
    }

    static queryToString(query: Query) {
        let queryString = "";
        queryString += builder.fieldsToString(query.fields);
        queryString += builder.filtersToString(query.filters);
        queryString += builder.sortsToString(query.sorts);
        queryString += builder.offsetToString(query.offset);
        queryString += builder.limitToString(query.limit);
        return queryString;
    }
}

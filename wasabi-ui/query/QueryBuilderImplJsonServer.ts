import { QueryBuilder, Filter, Sort, SortType } from "./Query";
import Arrays from "../util/Arrays";

class QueryBuilderJsonServerImpl implements QueryBuilder<string> {
    fieldsToString(items: Array<string> ): string {
        if(items) {
            let fields = [];
            Arrays.forEach(items, (item: string, index: number, items: Array<string> ) => {
                fields.push(item);
                return true;
            });
            return "fields=" + fields.join(",");
        }
        return "";
    }

    filtersToString(items: Array<Filter>): string {
        if(items) {
            let filters = [];
            Arrays.forEach(items, (item: Filter, index: number, items: Array<Filter> ) => {
                filters.push(item.name + item.operator.toString() + item.value);
                return true;
            });
            return filters.join(",");
        }
        return "";
    }

    sortsToString(items: Array<Sort>): string {
        if(items) {
            let sorts = [];
            Arrays.forEach(items, (item: Sort, index: number, items: Array<Filter> ) => {
                sorts.push((item.type === SortType.DESC ? "-": "+") + item.name);
                return true;
            });
            return "sorts=" + sorts.join(",");
        }
        return "";
    }

    offsetToString(offset: number): string {
        if(offset || offset === 0) {
            return "offset=" + offset;
        }
        return "";
    }

    limitToString(limit: number): string {
        if(limit) {
            return "limit=" + limit;
        }
        return "";
    }
}

export default new QueryBuilderJsonServerImpl();
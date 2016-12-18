import { Enum } from "../types/Enum";

export interface QueryBuilder <T> {
    fieldsToString(items: Array<string> ): T;
    filtersToString(items: Array<Filter>): T;
    sortsToString(items: Array<Sort>): T;
    offsetToString(offset: number): T;
    limitToString(limit: number): T;
}

export interface Query {
    fields?: Array<string>,
    filters?: Array<Filter>,
    sorts?: Array<Sort>,
    offset?: number,
    limit?: number
}

export interface Sort {
    name: string,
    type: SortType
}


export interface Filter {
    name: string,
    operator: Operators,
    value: any
}

export enum SortType {
    ASC, DESC
}

export class Operators extends Enum<string> {
    /**
     * Holds unknown operators.
     */
    public static readonly UNKNOWN = new Enum("");
    /**
     * Holds "equals" operator ( = ) to operate on all types
     */
    public static readonly EQUALS = new Enum("=");
    /**
     * Holds "not equals" operator ( != ) to operate on {@link String} or {@link Number} types
     */
    public static readonly NOT_EQUALS = new Enum("!=");
    /**
     * Holds "less than operator" ( < )  to operate on {@link String} or {@link Number} types
     */
    public static readonly LESS_THAN = new Enum("<");
    /**
     * Holds "less than or equals operator" ( <= )  to operate on number types
     */
    public static readonly LESS_OR_EQUALS_THAN = new Enum("<=");
    /**
     * Holds "greater than operator" ( > ) to operate on number types
     */
    public static readonly GREATER_THAN = new Enum(">");
    /**
     * Holds "greater than or equals operator" ( >= )  to operate on {@link Number} types
     */
    public static readonly GREATER_OR_EQUALS_THAN = new Enum(">=");
    /**
     * Holds "contains" ( ~= ) to operate on {@link String} types. In SQL its LIKE command
     */
    public static readonly CONTAINS = new Enum("~=");
    /**
     * Holds "in" ( |= ) operator to operate on @{@link Array} types.
     */
    public static readonly IN = new Enum("|=");
}


export default Query;
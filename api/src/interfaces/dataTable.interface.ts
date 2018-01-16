import { QueryBuilder } from "./queryBuilder";

export interface DataTableSearchInterface {
    value: string;
    regex: boolean;
}

export interface DataTableColumnInterface {
    data: string;
    name: string;
    orderable: boolean;
    search: DataTableSearchInterface;
    searchable: boolean;
}

export interface DataTableOrderInterface {
    column: number;
    dir: 'asc' | 'desc';
}

export interface DataTableInterface {
    columns: DataTableColumnInterface[];
    draw: number;
    length: number;
    order: DataTableOrderInterface[];
    search: DataTableSearchInterface;
    start: number;
    rules: QueryBuilder;
}

export interface DataTableReturnInterface {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: any[];
}

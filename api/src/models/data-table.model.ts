import { QueryBuilderModel } from "./query-builder.model";

export interface DataTableSearchModel {
    value: string;
    regex: boolean;
}

export interface DataTableColumnModel {
    data: string;
    name: string;
    orderable: boolean;
    search: DataTableSearchModel;
    searchable: boolean;
}

export interface DataTableOrderModel {
    column: number;
    dir: "asc" | "desc";
}

export interface DataTableModel {
    columns: DataTableColumnModel[];
    draw: number;
    length: number;
    order: DataTableOrderModel[];
    search: DataTableSearchModel;
    start: number;
    rules: QueryBuilderModel;
}

export interface DataTableReturnModel {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: any[];
}

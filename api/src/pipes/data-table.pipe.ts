import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { DataTableColumnModel, DataTableModel, DataTableOrderModel, DataTableSearchModel } from "../models/data-table.model";
import { QBRule, QueryBuilderModel } from "../models/query-builder.model";

@Injectable()
export class DataTablePipe implements PipeTransform<any> {
    public transform(value: DataTableModel, metadata: ArgumentMetadata) {
        let data: Partial<DataTableModel> = {};

        data.columns = this.transformColumns(value.columns);
        data.draw = Number(value.draw);
        data.length = Number(value.length);
        data.order = this.transformOrders(value.order);
        data.search = this.transformSearch(value.search);
        data.start = Number(value.start);
        data.rules = <any>value.rules !== "" ? this.transformRules(value.rules) : null;

        return data;
    }

    private transformColumns(columns: DataTableColumnModel[]): DataTableColumnModel[] {
        let data: DataTableColumnModel[] = [];

        for (let column of columns) {
            data.push(this.transformColumn(column));
        }

        return data;
    }

    private transformColumn(column: DataTableColumnModel): DataTableColumnModel {
        return {
            data: column.data,
            name: column.name,
            orderable: <any>column.orderable === "true",
            search: this.transformSearch(column.search),
            searchable: <any>column.searchable === "true"
        };
    }

    private transformSearch(search: DataTableSearchModel): DataTableSearchModel {
        return {
            value: search.value,
            regex: <any>search.regex === "true"
        };
    }

    private transformOrders(orders: DataTableOrderModel[]): DataTableOrderModel[] {
        let data: DataTableOrderModel[] = [];

        for (let order of orders) {
            data.push(this.transformOrder(order));
        }

        return data;
    }

    private transformOrder(order: DataTableOrderModel): DataTableOrderModel {
        return {
            column: Number(order.column),
            dir: order.dir
        };
    }

    private transformRules(rules: QueryBuilderModel): QueryBuilderModel {
        return {
            not: <any>rules.not === "true",
            valid: <any>rules.valid === "true",
            condition: rules.condition,
            rules: this.transformQbRules(rules.rules)
        };
    }

    private transformQbRules(rules: QBRule[]): QBRule[] {
        let qbRules: QBRule[] = [];

        for (let rule of rules) {
            qbRules.push({
                id: rule.id,
                name: rule.name,
                type: rule.type,
                input: rule.input,
                operator: rule.operator,
                value: rule.value,
                condition: rule.condition,
                rules: rule.rules ? this.transformQbRules(rule.rules) : null,
                not: <any>rule.not === "true"
            });
        }

        return qbRules;
    }
}

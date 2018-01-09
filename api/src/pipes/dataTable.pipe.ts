import { PipeTransform, Pipe, ArgumentMetadata } from '@nestjs/common';
import {
    DataTableColumnInterface, DataTableInterface, DataTableOrderInterface,
    DataTableSearchInterface
} from "../interfaces/dataTable.interface";

@Pipe()
export class DataTablePipe implements PipeTransform<any> {
    public transform(value: DataTableInterface, metadata: ArgumentMetadata) {
        let data: Partial<DataTableInterface> = {};

        data.columns = this.transformColumns(value.columns);
        data.draw = Number(value.draw);
        data.length = Number(value.length);
        data.order = this.transformOrders(value.order);
        data.search = this.transformSearch(value.search);
        data.start = Number(value.start);

        return data;
    }

    private transformColumns(columns: DataTableColumnInterface[]): DataTableColumnInterface[] {
        let data: DataTableColumnInterface[] = [];

        for (let column of columns) {
            data.push(this.transformColumn(column));
        }

        return data;
    }

    private transformColumn(column: DataTableColumnInterface): DataTableColumnInterface {
        return {
            data: column.data,
            name: column.name,
            orderable: <any>column.orderable === 'true',
            search: this.transformSearch(column.search),
            searchable: <any>column.searchable === 'true'
        };
    }

    private transformSearch(search: DataTableSearchInterface): DataTableSearchInterface {
        return {
            value: search.value,
            regex: <any>search.regex === 'true'
        };
    }

    private transformOrders(orders: DataTableOrderInterface[]): DataTableOrderInterface[] {
        let data: DataTableOrderInterface[] = [];

        for (let order of orders) {
            data.push(this.transformOrder(order));
        }

        return data;
    }

    private transformOrder(order: DataTableOrderInterface): DataTableOrderInterface {
        return {
            column: Number(order.column),
            dir: order.dir
        };
    }
}

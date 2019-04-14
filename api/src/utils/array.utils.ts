import * as csv from "csv-stringify";
import { promisify } from "util";
import * as xlsx from "xlsx";
import { ObjectUtils } from "./object.utils";

export class ArrayUtils {
    public static arrayToXlsxBuffer(rows: Object[], name: string, header?: string[]): Buffer {
        const aoa: any[][] = rows.map((row: Object) => {
            ObjectUtils.forEachProperty(row, (value: any) => {
                return value ? value : "";
            });

            return ObjectUtils.objectToArrayOfProperties(row);
        });

        if (header) {
            aoa.unshift(header);
        }

        const sheet = {};
        sheet[name] = xlsx.utils.aoa_to_sheet(aoa);

        const xlsxContent: string = xlsx.write(
            {
                Sheets: sheet,
                SheetNames: [name]
            },
            {
                type: "binary"
            }
        );

        return Buffer.from(xlsxContent, "binary");
    }

    public static async arrayToCsvBuffer(rows: Object[], header?: string[]): Promise<Buffer> {
        // Convert to array of array.
        let aoa: any[][] = rows.map((row: Object) => {
            // Replace undefined values.
            ObjectUtils.forEachProperty(row, (value: any) => {
                return value ? value : "";
            });

            return ObjectUtils.objectToArrayOfProperties(row);
        });

        if (header) {
            aoa.unshift(header);
        }

        const csvAsPromise = promisify<any[][], string>(csv);
        return Buffer.from(await csvAsPromise(aoa));
    }
}

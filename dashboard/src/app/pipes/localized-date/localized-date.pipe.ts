import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DatePipe } from "@angular/common";

@Pipe({
    name: "localizedDate",
    pure: false
})
export class LocalizedDatePipe implements PipeTransform {
    constructor(private translateService: TranslateService) {}

    transform(value: any, pattern: string = "mediumDate"): any {
        const datePipe: DatePipe = new DatePipe(this.translateService.defaultLang);

        if (value && value !== "0000-00-00") {
            return datePipe.transform(value, pattern);
        } else {
            return "N/A";
        }
    }
}

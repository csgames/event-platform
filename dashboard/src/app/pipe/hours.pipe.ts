import { Pipe, PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

@Pipe({ name: "hours" })
export class HoursPipe implements PipeTransform {
    constructor(private translateService: TranslateService) { }

    transform(date: Date | string): string {
        return formatDate(date, "h:mm a", this.translateService.getDefaultLang());
    }
}

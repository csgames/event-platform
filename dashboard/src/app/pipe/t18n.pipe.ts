import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

/* Translate Description */
@Pipe({
    name: "t18n",
    pure: false
})
export class T18NPipe implements PipeTransform {
    constructor(private translateService: TranslateService) { }

    transform(value: { [lang: string]: string }): string {
        const lang = this.translateService.defaultLang;
        return value[lang];
    }
}

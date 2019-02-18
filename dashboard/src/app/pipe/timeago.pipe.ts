import { Pipe, PipeTransform } from "@angular/core";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import fr from "javascript-time-ago/locale/fr-CA";
import { TranslateService } from "@ngx-translate/core";

@Pipe({ name: "timeago" })
export class TimeAgoPipe implements PipeTransform {
    constructor(private translateService: TranslateService) {
        TimeAgo.addLocale(en);
        TimeAgo.addLocale(fr);
    }

    transform(date: string): string {
        const lang = this.translateService.getDefaultLang();
        const timeago = new TimeAgo(lang === "en" ? "en-CA" : "fr-CA");
        return timeago.format(new Date(date));
    }
}

import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Activity, CreateActivity } from "../api/models/activity";
import { Observable } from "rxjs";
import { formatDate } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ScheduleService {
    constructor(private apiService: ApiService,
                private translateService: TranslateService) { }

    public getActivitiesForEvent(): Observable<Activity[]> {
        return this.apiService.event.getActivitiesForEvent();
    }

    public getActivitiesPerDay(activities: Activity[]): { [date: string]: { [time: string]: Activity[] } } {
        const dates: { [date: string]: { [time: string]: Activity[] } } = {};
        for (const a of activities) {
            const date = new Date(a.beginDate);
            const day = formatDate(date, this.getDateFormat(), this.translateService.getDefaultLang(), "utc");
            const time = formatDate(date, "h:mm a", this.translateService.getDefaultLang(), "utc");
            if (!dates[day]) { dates[day] = {}; }
            if (!dates[day][time]) { dates[day][time] = []; }
            dates[day][time].push(a);
        }
        return dates;
    }

    private getDateFormat(): string {
        if (this.translateService.getDefaultLang() === "en") {
            return "MMMM d";
        }

        return "d MMMM";
    }

    public createActivity(activity: CreateActivity) {
        return this.apiService.event.createActivity(activity);
    }
}

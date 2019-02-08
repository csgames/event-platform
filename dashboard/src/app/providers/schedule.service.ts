import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Activity } from "../api/models/activity";
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
        let dates: { [date: string]: { [time: string]: Activity[] } } = {};
        for (const a of activities) {
            const date = new Date(a.beginDate);
            const day = formatDate(date, "MMMM d", this.translateService.getDefaultLang(), 'utc');
            const time = formatDate(date, "h:mm a", this.translateService.getDefaultLang(), 'utc');
            if (!dates[day]) dates[day] = {};
            if (!dates[day][time]) dates[day][time] = [];
            dates[day][time].push(a);
        }
        return dates
    }

    public getSortedKeysForDaySchedule(day: { [id: string]: Activity[] }): string[] {
        var list = Object.keys(day);
        list = list.sort((t1, t2) => {
            var activity1 = day[t1][0];
            var activity2 = day[t2][0];
            return activity1.beginDate < activity2.beginDate ? -1 : 1;
        });
        return list;
    }
}